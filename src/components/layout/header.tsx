import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth.context';

export function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className='border-b'>
      <div className='container flex items-center justify-between h-14'>
        <Link to='/' className='text-xl font-bold'>
          Scribble
        </Link>

        <nav>
          <ul className='flex items-center gap-4'>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to='/my-posts'>My Posts</Link>
                </li>
                <li>
                  <Link to='/create'>
                    <Button>Create Post</Button>
                  </Link>
                </li>
                <li>
                  <Button variant='ghost' onClick={logout}>
                    Logout
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
                <li>
                  <Link to='/register'>
                    <Button>Sign Up</Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
