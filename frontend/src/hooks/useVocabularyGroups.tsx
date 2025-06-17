import { useState, useEffect } from "react";

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

export function useVocabularyGroups(refreshToken: string) {
  const [groups, setGroups] = useState<VocabularyGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          'http://localhost:3000/api/vocabulary/groups',
          { headers: { Cookie: `refreshToken=${refreshToken}` } }
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data: ApiResponse = await res.json();
        if (data.success && data.data.length) {
          setGroups(data.data.sort((a, b) => a.order - b.order));
        } else {
          throw new Error('No data received');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load');
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, [refreshToken]);

  return { groups, loading, error };
}