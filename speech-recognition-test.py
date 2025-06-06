import gradio as gr
import whisper
from sentence_transformers import SentenceTransformer, util
import noisereduce as nr
from pydub import AudioSegment, effects
import librosa
import soundfile as sf
import numpy as np
import webrtcvad
import wave
import tempfile
import os
import difflib

# Load models (load once)spe
model = whisper.load_model("medium")
embedder = SentenceTransformer("all-MiniLM-L6-v2")

def preprocess_audio(input_path, output_path="cleaned.wav"):
    audio = AudioSegment.from_file(input_path)
    normalized_audio = effects.normalize(audio)
    normalized_audio.export(output_path, format="wav")
    y, sr = librosa.load(output_path, sr=None)
    reduced_noise = nr.reduce_noise(y=y, sr=sr)
    sf.write(output_path, reduced_noise, sr)
    return output_path

def apply_vad(input_wav_path, aggressiveness=1):
    audio = AudioSegment.from_file(input_wav_path)
    audio = audio.set_frame_rate(16000).set_channels(1).set_sample_width(2)
    temp_wav = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
    audio.export(temp_wav.name, format="wav")
    vad = webrtcvad.Vad(aggressiveness)
    with wave.open(temp_wav.name, "rb") as wf:
        sample_rate = wf.getframerate()
        frame_duration = 30  # ms
        frame_size = int(sample_rate * frame_duration / 1000) * 2
        voiced_audio = b""
        while True:
            frame = wf.readframes(int(sample_rate * frame_duration / 1000))
            if len(frame) < frame_size:
                break
            is_speech = vad.is_speech(frame, sample_rate)
            if is_speech:
                voiced_audio += frame
    vad_wav_path = tempfile.NamedTemporaryFile(delete=False, suffix=".wav").name
    with wave.open(vad_wav_path, "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(16000)
        wf.writeframes(voiced_audio)
    os.remove(temp_wav.name)
    return vad_wav_path

def wer(ref, hyp):
    ref_words = ref.lower().split()
    hyp_words = hyp.lower().split()
    d = [[0] * (len(hyp_words)+1) for _ in range(len(ref_words)+1)]
    for i in range(len(ref_words)+1):
        d[i][0] = i
    for j in range(len(hyp_words)+1):
        d[0][j] = j
    for i in range(1, len(ref_words)+1):
        for j in range(1, len(hyp_words)+1):
            if ref_words[i-1] == hyp_words[j-1]:
                cost = 0
            else:
                cost = 1
            d[i][j] = min(d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1]+cost)
    return d[-1][-1] / len(ref_words) if ref_words else 1.0

def cer(ref, hyp):
    ref_chars = list(ref.replace(" ", "").lower())
    hyp_chars = list(hyp.replace(" ", "").lower())
    d = [[0] * (len(hyp_chars)+1) for _ in range(len(ref_chars)+1)]
    for i in range(len(ref_chars)+1):
        d[i][0] = i
    for j in range(len(hyp_chars)+1):
        d[0][j] = j
    for i in range(1, len(ref_chars)+1):
        for j in range(1, len(hyp_chars)+1):
            if ref_chars[i-1] == hyp_chars[j-1]:
                cost = 0
            else:
                cost = 1
            d[i][j] = min(d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1]+cost)
    return d[-1][-1] / len(ref_chars) if ref_chars else 1.0

def word_diff(ref, hyp):
    ref_words = ref.strip().split()
    hyp_words = hyp.strip().split()
    diff = difflib.ndiff(ref_words, hyp_words)
    # Mark deletions as [word], insertions as (word), unchanged as word
    return " ".join([
        f"[{w[2:]}]" if w.startswith('- ') else
        f"({w[2:]})" if w.startswith('+ ') else
        w[2:] for w in diff if not w.startswith('? ')
    ])

def transcribe(audio, reference_text):
    if audio is None:
        return "No audio provided", 0.0, 0.0, 0.0, ""
    clean_audio = preprocess_audio(audio)
    vad_audio = apply_vad(clean_audio)
    result = model.transcribe(vad_audio, language="de", prompt=reference_text)  # Or "en", etc.
    transcribed_text = result["text"]
    wer_error = wer(reference_text, transcribed_text)
    cer_error = cer(reference_text, transcribed_text)
    similarity = max(0.0, 1.0 - wer_error) * 100
    cer_similarity = max(0.0, 1.0 - cer_error) * 100
    embeddings = embedder.encode([reference_text, transcribed_text], convert_to_tensor=True)
    semantic_score = util.pytorch_cos_sim(embeddings[0], embeddings[1]).item() * 100
    diff_result = word_diff(reference_text, transcribed_text)
    os.remove(vad_audio)
    return (
        f"Transcribed: {transcribed_text}",
        round(similarity, 2),
        round(semantic_score, 2),
        round(cer_similarity, 2),
        diff_result
    )

demo = gr.Interface(
    fn=transcribe,
    inputs=[
        gr.Audio(type="filepath"),
        gr.Textbox(label="Reference Sentence")
    ],
    outputs=[
        gr.Textbox(label="Transcription"),
        gr.Number(label="Similarity % (WER-based)"),
        gr.Number(label="Semantic Similarity %"),
        gr.Number(label="Similarity % (CER-based)"),
        gr.Textbox(label="Word Diff ([-] = missing, ( ) = extra)")
    ],
    title="Open Source Duolingo-Style Speech Comparison",
    description=(
        "Sprich einen Satz und vergleiche ihn mit dem Referenzsatz auf Wort-, Zeichen-, Bedeutungs- und Fehler-Ebene. "
        "Technologien: Whisper ASR, noisereduce, webrtcvad, sentence-transformers, difflib. "
        "Optional: add forced aligner for per-word timing/feedback."
    )
)

demo.launch()
