import React, { useState } from "react";
import { Volume2, Play, Loader2, AlertCircle } from "lucide-react";
import { useVocabularyGroups } from "../hooks/useVocabularyGroups";
import type { VocabularyGroup, SoundGroup, Sound } from "../hooks/useVocabularyGroups";

const vowelColors: Record<string, string> = {
  a: "from-red-400 to-red-600",
  ä: "from-pink-400 to-pink-600",
  e: "from-orange-400 to-orange-600",
  i: "from-yellow-400 to-yellow-600",
  o: "from-green-400 to-green-600",
  ö: "from-teal-400 to-teal-600",
  u: "from-blue-400 to-blue-600",
  ü: "from-indigo-400 to-indigo-600",
  y: "from-purple-400 to-purple-600",
  ß: "from-gray-500 to-gray-700",
};

export default function Pronunciation() {
  const refreshToken = sessionStorage.getItem("refreshToken") ?? "";
  const { groups, loading, error } = useVocabularyGroups(refreshToken);

  const [activeSymbol, setActiveSymbol] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const playAudio = async (sound: Sound) => {
    if (isPlaying) return;
    setActiveSymbol(sound.symbol);
    setIsPlaying(true);

    try {
      const audio = new Audio(`http://localhost:3000${sound.audioSrc}`);
      await new Promise((res, rej) => {
        audio.oncanplaythrough = res;
        audio.onerror = rej;
        audio.load();
      });
      await audio.play();
      await new Promise<void>((resolve) => {
        const cleanup = () => {
          setActiveSymbol(null);
          setIsPlaying(false);
          resolve();
        };
        audio.onended = cleanup;
        setTimeout(cleanup, 5000);
      });
    } catch {
      setTimeout(() => {
        setActiveSymbol(null);
        setIsPlaying(false);
      }, 500);
    }
  };

  if (loading) {
    return (
      <div className="bg-white py-6 px-4">
        <div className="max-w-3xl mx-auto flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mr-3" />
          <span className="text-gray-600">Loading groups...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white py-6 px-4">
        <div className="max-w-3xl mx-auto flex items-center justify-center py-12">
          <AlertCircle className="w-8 h-8 text-red-500 mr-3" />
          <div className="text-center">
            <p className="text-red-600 font-semibold">Failed to load</p>
            <p className="text-gray-500 text-sm mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-6 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-3">
            <Volume2 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            German Pronunciation Practice
          </h1>
          <p className="text-sm text-gray-600 max-w-lg mx-auto">
            Click any symbol below to hear its pronunciation.
          </p>
        </div>

        {groups.map((group: VocabularyGroup) => (
          <div key={group.id} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {group.name}
            </h2>
            <div className="grid grid-cols-5 gap-3">
              {group.sounds.map(({ sound }: SoundGroup) => {
                const isActive = activeSymbol === sound.symbol;
                const gradient = vowelColors[sound.symbol] || "from-gray-400 to-gray-600";

                return (
                  <button
                    key={sound.id}
                    onClick={() => playAudio(sound)}
                    disabled={isPlaying}
                    className="relative overflow-hidden bg-white rounded-lg shadow-sm transform transition-transform duration-200 ease-in-out active:scale-95 hover:scale-105 cursor-pointer border border-gray-100 hover:border-gray-200 p-3 text-center will-change-[transform,opacity]"
                    style={{ minHeight: "120px" }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-opacity duration-300 ease-in-out ${
                        isActive ? "opacity-10" : "opacity-0"
                      }`}
                    />
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div
                        className={`text-2xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r ${gradient} transition-transform duration-200 ease-in-out ${
                          isActive ? "scale-105" : ""
                        }`}
                      >
                        {sound.symbol}
                      </div>
                      <div className="mb-2 flex-1 flex flex-col justify-center">
                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                          Example
                        </div>
                        <div className="text-xs font-semibold text-gray-700">
                          {sound.exampleWord}
                        </div>
                      </div>
                      <div
                        className={`inline-flex items-center justify-center w-6 h-6 mx-auto rounded-full transition-transform duration-200 ease-in-out ${
                          isActive
                            ? `bg-gradient-to-r ${gradient} text-white shadow-md scale-105`
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <Play
                          className={`w-2.5 h-2.5 transition-transform duration-200 ease-in-out ${
                            isActive ? "animate-pulse scale-105" : ""
                          }`}
                        />
                      </div>
                    </div>
                    {isActive && (
                      <div className="absolute inset-0 rounded-lg pointer-events-none">
                        <div
                          className={`absolute inset-0 rounded-lg bg-gradient-to-r ${gradient} opacity-20 animate-ping`}
                          style={{
                            animationDuration: "1000ms",
                            animationTimingFunction: "cubic-bezier(0.4,0,0.6,1)",
                          }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="bg-gray-50 rounded-lg border border-gray-100 p-3 text-center">
          <p className="text-xs text-gray-600">
            💡 <strong>Tip:</strong> Repeat each sound after listening. Practice makes perfect!
          </p>
        </div>

        <div className="text-center mt-3">
          <p className="text-xs text-gray-500">
            Loaded {groups.reduce((sum, g) => sum + g.sounds.length, 0)} items across {groups.length} groups
          </p>
        </div>
      </div>
    </div>
  );
}
