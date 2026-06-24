type EnvKey = 'VITE_API_URL' | 'VITE_SOCKET_URL';

function getEnvVar(key: EnvKey): string {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  apiUrl: getEnvVar('VITE_API_URL'),
  socketUrl: getEnvVar('VITE_SOCKET_URL'),
} as const;
