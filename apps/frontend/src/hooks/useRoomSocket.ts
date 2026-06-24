import { useEffect, useRef, useState } from 'react';
import { connectSocket, disconnectSocket } from '@/lib/socket/client';
import type { BattleRoom } from '@/types';
import type { ClientToServerEvents, LeaderboardEntry, ServerToClientEvents } from '@/types/socket';

interface UseRoomSocketOptions {
  roomId: string;
  onRoomClosed?: () => void;
  onBattleStarted?: (room: BattleRoom) => void;
  onBattleFinished?: (room: BattleRoom) => void;
  onProblemSelected?: (room: BattleRoom) => void;
  onPlayerJoined?: (player: { userId: string; username: string }) => void;
  onPlayerLeft?: (userId: string) => void;
  onPlayerTyping?: (payload: {
    userId: string;
    username: string;
    roomId: string;
    timestamp: string;
  }) => void;
  onCodeSubmitted?: (payload: {
    userId: string;
    username: string;
    roomId: string;
    codePreview: string;
    timestamp: string;
  }) => void;
  onLeaderboardUpdated?: (payload: { roomId: string; leaderboard: LeaderboardEntry[] }) => void;
}

export function useRoomSocket({
  roomId,
  onRoomClosed,
  onBattleStarted,
  onBattleFinished,
  onProblemSelected,
  onPlayerJoined,
  onPlayerLeft,
  onPlayerTyping,
  onCodeSubmitted,
  onLeaderboardUpdated,
}: UseRoomSocketOptions) {
  const [room, setRoom] = useState<BattleRoom | null>(null);
  const [serverTime, setServerTime] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const callbacksRef = useRef({
    onRoomClosed,
    onBattleStarted,
    onBattleFinished,
    onProblemSelected,
    onPlayerJoined,
    onPlayerLeft,
    onPlayerTyping,
    onCodeSubmitted,
    onLeaderboardUpdated,
  });

  callbacksRef.current = {
    onRoomClosed,
    onBattleStarted,
    onBattleFinished,
    onProblemSelected,
    onPlayerJoined,
    onPlayerLeft,
    onPlayerTyping,
    onCodeSubmitted,
    onLeaderboardUpdated,
  };

  useEffect(() => {
    const socket = connectSocket();

    const handleConnect = () => {
      setIsConnected(true);
      socket.emit('subscribe', { roomId }, (response) => {
        if (response.success && response.room) {
          setRoom(response.room);
          setServerTime(response.serverTime ?? null);
          setError(null);
        } else {
          setError(response.error ?? 'Failed to join room channel');
        }
      });
    };

    const handleDisconnect = () => setIsConnected(false);
    const handleRoomState = (data: { room: BattleRoom; serverTime: string }) => {
      setRoom(data.room);
      setServerTime(data.serverTime);
    };
    const handleRoomClosed = () => callbacksRef.current.onRoomClosed?.();
    const handleBattleStarted = (data: { room: BattleRoom; serverTime: string }) => {
      setRoom(data.room);
      setServerTime(data.serverTime);
      callbacksRef.current.onBattleStarted?.(data.room);
    };
    const handleProblemSelected = (data: { room: BattleRoom }) => {
      setRoom(data.room);
      callbacksRef.current.onProblemSelected?.(data.room);
    };
    const handleBattleFinished = (data: { room: BattleRoom; leaderboard: LeaderboardEntry[] }) => {
      setRoom(data.room);
      callbacksRef.current.onBattleFinished?.(data.room);
    };
    const handlePlayerJoined = (data: { player: { userId: string; username: string } }) => {
      callbacksRef.current.onPlayerJoined?.(data.player);
    };
    const handlePlayerLeft = (data: { userId: string }) => {
      callbacksRef.current.onPlayerLeft?.(data.userId);
    };
    const handlePlayerTyping = (data: {
      userId: string;
      username: string;
      roomId: string;
      timestamp: string;
    }) => {
      callbacksRef.current.onPlayerTyping?.(data);
    };
    const handleCodeSubmitted = (data: {
      userId: string;
      username: string;
      roomId: string;
      codePreview: string;
      timestamp: string;
    }) => {
      callbacksRef.current.onCodeSubmitted?.(data);
    };
    const handleLeaderboardUpdated = (data: {
      roomId: string;
      leaderboard: LeaderboardEntry[];
    }) => {
      callbacksRef.current.onLeaderboardUpdated?.(data);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('room_state', handleRoomState);
    socket.on('room_closed', handleRoomClosed);
    socket.on('battle_started', handleBattleStarted);
    socket.on('battle_finished', handleBattleFinished);
    socket.on('problem_selected', handleProblemSelected);
    socket.on('player_joined', handlePlayerJoined);
    socket.on('player_left', handlePlayerLeft);
    socket.on('player_typing', handlePlayerTyping);
    socket.on('code_submitted', handleCodeSubmitted);
    socket.on('leaderboard_updated', handleLeaderboardUpdated);

    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.emit('unsubscribe', { roomId });
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('room_state', handleRoomState);
      socket.off('room_closed', handleRoomClosed);
      socket.off('battle_started', handleBattleStarted);
      socket.off('battle_finished', handleBattleFinished);
      socket.off('problem_selected', handleProblemSelected);
      socket.off('player_joined', handlePlayerJoined);
      socket.off('player_left', handlePlayerLeft);
      socket.off('player_typing', handlePlayerTyping);
      socket.off('code_submitted', handleCodeSubmitted);
      socket.off('leaderboard_updated', handleLeaderboardUpdated);
      disconnectSocket();
    };
  }, [roomId]);

  return { room, serverTime, isConnected, error, setRoom };
}
