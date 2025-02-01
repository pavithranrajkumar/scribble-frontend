import { Link } from 'react-router-dom';
import { useAuth } from '@/context/auth.context';

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className='bg-background border-b'>
      <div className='container flex items-center justify-between h-16'>
        <div className='flex items-center gap-6'>
          <Link to='/' className='text-xl font-semibold'>
            Scribble{' '}
          </Link>
          {isAuthenticated && (
            <Link to='/my-posts' className='text-muted-foreground hover:text-foreground'>
              My Posts
            </Link>
          )}
        </div>

        <div className='flex items-center gap-4'>
          {isAuthenticated ? (
            <>
              <span className='text-muted-foreground'>Welcome, {user?.username}</span>
              <Link to='/create' className='text-primary hover:underline'>
                Create Post
              </Link>
              <button onClick={logout} className='text-destructive hover:underline'>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to='/login' className='text-primary hover:underline'>
                Login
              </Link>
              <Link to='/register' className='text-primary hover:underline'>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
