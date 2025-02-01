import React from 'react';
import { Spinner } from './ui/spinner';

export function RouteLoading() {
  return (
    <div className='min-h-[400px] flex items-center justify-center'>
      <Spinner size='lg' />
    </div>
  );
}
