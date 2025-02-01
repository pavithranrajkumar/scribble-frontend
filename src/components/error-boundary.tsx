import { useRouteError } from 'react-router-dom';
import { Button } from './ui/button';

export function ErrorBoundary() {
  const error = useRouteError() as Error;

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-4'>
      <div className='text-center space-y-4'>
        <h1 className='text-4xl font-bold text-destructive'>Oops!</h1>
        <p className='text-xl text-muted-foreground'>Something went wrong</p>
        {error?.message && <p className='text-sm text-muted-foreground max-w-md mx-auto'>{error.message}</p>}
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    </div>
  );
}
