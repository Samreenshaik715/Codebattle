import type { BattleRoom } from './room';

export interface LeaderboardEntry {
  userId: string;
  username: string;
  solvedCount: number;
  totalSolveTime: number;
  creditsEarned: number;
  lastAcceptedSubmissionTime?: string;
  rank: number;
}

export interface ServerToClientEvents {
  player_joined: (payload: { player: { userId: string; username: string } }) => void;
  player_left: (payload: { userId: string; roomId: string }) => void;
  battle_started: (payload: { room: BattleRoom; serverTime: string }) => void;
  problem_selected: (payload: { room: BattleRoom }) => void;
  battle_finished: (payload: { room: BattleRoom; leaderboard: LeaderboardEntry[] }) => void;
  player_typing: (payload: {
    userId: string;
    username: string;
    roomId: string;
    timestamp: string;
  }) => void;
  code_submitted: (payload: {
    userId: string;
    username: string;
    roomId: string;
    codePreview: string;
    timestamp: string;
  }) => void;
  leaderboard_updated: (payload: { roomId: string; leaderboard: LeaderboardEntry[] }) => void;
  room_state: (payload: { room: BattleRoom; serverTime: string }) => void;
  room_closed: (payload: { roomId: string }) => void;
}

export interface ClientToServerEvents {
  subscribe: (payload: { roomId: string }, callback: (response: SubscribeResult) => void) => void;
  unsubscribe: (payload: { roomId: string }) => void;
  player_typing: (payload: { roomId: string }, callback?: (result: ActionResult) => void) => void;
  code_submitted: (
    payload: { roomId: string; code: string },
    callback?: (result: ActionResult) => void,
  ) => void;
  finish_battle: (payload: { roomId: string }, callback?: (result: ActionResult) => void) => void;
}

export interface SubscribeResult {
  success: boolean;
  error?: string;
  room?: BattleRoom;
  serverTime?: string;
}

export interface ActionResult {
  success: boolean;
  error?: string;
}
