import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/auth.context';
import { loginSchema, type LoginInput } from '@/utils/validators';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    await login(data);
    navigate('/');
  };

  return (
    <div className='container max-w-lg py-8'>
      <h1 className='text-2xl font-bold mb-8'>Login to Scribble</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <Input type='email' placeholder='Email' {...register('email')} error={errors.email?.message} />
        </div>
        <div>
          <Input type='password' placeholder='Password' {...register('password')} error={errors.password?.message} />
        </div>
        <Button type='submit' className='w-full' loading={isSubmitting}>
          Login
        </Button>
      </form>
    </div>
  );
}
