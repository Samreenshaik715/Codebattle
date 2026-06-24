import { z } from 'zod';

export const joinRoomSchema = z.object({
  roomCode: z
    .string()
    .min(6, 'Room code must be 6 characters')
    .max(6, 'Room code must be 6 characters')
    .transform((val) => val.toUpperCase().trim()),
});

export const roomIdParamSchema = z.object({
  roomId: z.string().cuid('Invalid room ID'),
});

export type JoinRoomInput = z.infer<typeof joinRoomSchema>;
