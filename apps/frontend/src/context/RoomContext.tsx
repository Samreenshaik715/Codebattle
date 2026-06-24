import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import * as roomApi from '@/lib/api/rooms';
import type { BattleRoom } from '@/types';

interface RoomContextValue {
  activeRoom: BattleRoom | null;
  isLoading: boolean;
  error: string | null;
  setActiveRoom: (room: BattleRoom | null) => void;
  fetchActiveRoom: () => Promise<void>;
  clearActiveRoom: () => void;
}

export const RoomContext = createContext<RoomContextValue | null>(null);

export function RoomProvider({ children }: { children: ReactNode }) {
  const [activeRoom, setActiveRoom] = useState<BattleRoom | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const fetchActiveRoom = useCallback(async () => {
    if (!isAuthenticated) {
      setActiveRoom(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const room = await roomApi.getActiveRoom();
      setActiveRoom(room?.status === 'IN_PROGRESS' ? room : null);
    } catch (err) {
      setActiveRoom(null);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const clearActiveRoom = useCallback(() => {
    setActiveRoom(null);
    setError(null);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      clearActiveRoom();
      setIsLoading(false);
      return;
    }

    if (sessionStorage.getItem('skipRoomRestore') === 'true') {
      sessionStorage.removeItem('skipRoomRestore');
      clearActiveRoom();
      setIsLoading(false);
      return;
    }

    fetchActiveRoom().finally(() => setIsLoading(false));
  }, [isAuthenticated, clearActiveRoom, fetchActiveRoom]);

  const value = useMemo(
    () => ({
      activeRoom,
      isLoading,
      error,
      setActiveRoom,
      fetchActiveRoom,
      clearActiveRoom,
    }),
    [activeRoom, isLoading, error, fetchActiveRoom, clearActiveRoom],
  );

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
}
