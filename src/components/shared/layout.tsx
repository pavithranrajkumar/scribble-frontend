import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './navbar';

export function Layout() {
  return (
    <div>
      <Navbar />
      <main className='container py-8'>
        <Outlet />
      </main>
    </div>
  );
}
