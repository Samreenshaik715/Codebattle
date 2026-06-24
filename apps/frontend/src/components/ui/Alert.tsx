interface AlertProps {
  type?: 'error' | 'success';
  message: string;
}

export function Alert({ type = 'error', message }: AlertProps) {
  const styles = {
    error: 'border-red-500/30 bg-red-500/10 text-red-300',
    success: 'border-green-500/30 bg-green-500/10 text-green-300',
  };

  return (
    <div className={`rounded-lg border px-4 py-3 text-sm ${styles[type]}`} role="alert">
      {message}
    </div>
  );
}
