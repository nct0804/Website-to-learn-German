import React, { useState, useEffect } from "react";
import { Volume2, Play, Loader2, AlertCircle } from "lucide-react";

interface Sound {
  id: number;
  symbol: string;
  exampleWord: string;
  audioSrc: string;
  type: string;
  createdAt: string;
}

interface SoundGroup {
  id: number;
  soundId: number;
  groupId: number;
  sound: Sound;
}

interface VocabularyGroup {
  id: number;
  name: string;
  order: number;
  createdAt: string;
  sounds: SoundGroup[];
}

interface ApiResponse {
  success: boolean;
  data: VocabularyGroup[];
}

const vowelColors: Record<string, string> = {
  "a": "from-red-400 to-red-600",
  "ä": "from-pink-400 to-pink-600", 
  "e": "from-orange-400 to-orange-600",
  "i": "from-yellow-400 to-yellow-600",
  "o": "from-green-400 to-green-600",
  "ö": "from-teal-400 to-teal-600",
  "u": "from-blue-400 to-blue-600",
  "ü": "from-indigo-400 to-indigo-600",
  "y": "from-purple-400 to-purple-600",
};

export default function Pronunciation() {
  const [activeVowel, setActiveVowel] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [vowels, setVowels] = useState<Sound[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVowels = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/vocabulary/groups', {
          headers: {
            'Cookie': 'refreshToken=4c693e4b-4c1a-495a-a4b2-55fcd1d563d1'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        
        if (data.success && data.data.length > 0) {
          const germanVowelsGroup = data.data.find(group => 
            group.name.toLowerCase().includes('vowel')
          );
          
          if (germanVowelsGroup) {
            const extractedVowels = germanVowelsGroup.sounds.map(item => item.sound);
            setVowels(extractedVowels.sort((a, b) => a.symbol.localeCompare(b.symbol)));
          } else {
            throw new Error('German Vowels group not found');
          }
        } else {
          throw new Error('No data received from API');
        }
      } catch (err) {
        console.error('Error fetching vowels:', err);
        setError(err instanceof Error ? err.message : 'Failed to load vowels');
      } finally {
        setLoading(false);
      }
    };

    fetchVowels();
  }, []);

  const playAudio = async (vowel: Sound): Promise<void> => {
    if (isPlaying) return;

    setActiveVowel(vowel.symbol);
    setIsPlaying(true);
    
    try {
      const audioUrl = `http://localhost:3000${vowel.audioSrc}`;
      const audio = new Audio(audioUrl);
      
      await new Promise((resolve, reject) => {
        audio.oncanplaythrough = resolve;
        audio.onerror = reject;
        audio.load();
      });

      await audio.play();
      
      await new Promise<void>((resolve) => {
        const cleanup = () => {
          setActiveVowel(null);
          setIsPlaying(false);
          resolve();
        };

        audio.onended = cleanup;
        setTimeout(cleanup, 5000);
      });

    } catch (error) {
      console.error("Audio playback error:", error);
      setTimeout(() => {
        setActiveVowel(null);
        setIsPlaying(false);
      }, 500); // Giảm thời gian hiển thị lỗi xuống 0.5s
    }
  };

  if (loading) {
    return (
      <div className="bg-white py-6 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500 mr-3" />
            <span className="text-gray-600">Loading German vowels...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white py-6 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <AlertCircle className="w-8 h-8 text-red-500 mr-3" />
            <div className="text-center">
              <p className="text-red-600 font-semibold">Failed to load vowels</p>
              <p className="text-gray-500 text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-6 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-3">
            <Volume2 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            German Vowel Pronunciation
          </h1>
          <p className="text-sm text-gray-600 max-w-lg mx-auto">
            Master German pronunciation by learning the sounds of each vowel. 
            Click on any vowel below to hear its pronunciation.
          </p>
        </div>

        {/* Vowels Grid với hiệu ứng nhanh hơn */}
        <div className="grid grid-cols-5 gap-3 mb-4">
          {vowels.map((vowel) => {
            const color = vowelColors[vowel.symbol] || "from-gray-400 to-gray-600";
            const isActive = activeVowel === vowel.symbol;
            
            return (
              <button
                key={vowel.id}
                onClick={() => playAudio(vowel)}
                disabled={isPlaying}
                className={`
                  group relative overflow-hidden
                  bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer
                  transform transition-all duration-200 hover:scale-105
                  border border-gray-100 hover:border-gray-200
                  p-3 text-center
                  ${isActive ? 'ring-2 ring-blue-300 scale-105 shadow-md' : ''}
                  ${isPlaying && !isActive ? 'opacity-50' : ''}
                `}
                style={{ minHeight: '120px' }}
              >
                {/* Gradient Background - Tăng tốc độ */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br ${color} 
                  transition-opacity duration-300
                  ${isActive ? 'opacity-10' : 'opacity-0 group-hover:opacity-5'}
                `} />
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className={`
                    text-2xl font-bold mb-1 bg-gradient-to-r ${color} bg-clip-text text-transparent
                    transition-transform duration-200
                    ${isActive ? 'scale-105' : ''}
                  `}>
                    {vowel.symbol}
                  </div>
                  
                  <div className="mb-2 flex-1 flex flex-col justify-center">
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Example</div>
                    <div className="text-xs font-semibold text-gray-700">
                      {vowel.exampleWord}
                    </div>
                  </div>
                  
                  <div className={`
                    inline-flex items-center justify-center w-6 h-6 mx-auto
                    rounded-full transition-all duration-200
                    ${isActive 
                      ? `bg-gradient-to-r ${color} text-white shadow-md scale-105` 
                      : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:scale-105'
                    }
                  `}>
                    <Play className={`
                      w-2.5 h-2.5 transition-transform duration-200
                      ${isActive ? 'animate-pulse scale-105' : ''}
                    `} />
                  </div>
                </div>

                {isActive && (
                  <div className="absolute inset-0 rounded-lg pointer-events-none">
                    <div className={`
                      absolute inset-0 rounded-lg bg-gradient-to-r ${color} 
                      opacity-20 animate-ping
                    `} 
                    style={{ 
                      animationDuration: '1000ms',
                      animationTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)'
                    }} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="bg-gray-50 rounded-lg border border-gray-100 p-3 text-center">
          <p className="text-xs text-gray-600">
            💡 <strong>Tip:</strong> Listen carefully to each vowel sound and try to repeat it. 
            German vowels have distinct sounds that differ from English!
          </p>
        </div>

        <div className="text-center mt-3">
          <p className="text-xs text-gray-500">
            Loaded {vowels.length} vowels from Database
          </p>
        </div>
      </div>
    </div>
  );
}