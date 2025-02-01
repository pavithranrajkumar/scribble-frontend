import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/auth.context';
import { registerSchema, type RegisterInput } from '@/utils/validators';

export function Register() {
  const navigate = useNavigate();
  const { register: signup } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    await signup(data);
    navigate('/login');
  };

  return (
    <div className='container max-w-lg py-8'>
      <h1 className='text-2xl font-bold mb-8'>Join Scribble</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <Input placeholder='Username' {...register('username')} error={errors.username?.message} />
        </div>
        <div>
          <Input type='email' placeholder='Email' {...register('email')} error={errors.email?.message} />
        </div>
        <div>
          <Input type='password' placeholder='Password' {...register('password')} error={errors.password?.message} />
        </div>
        <Button type='submit' className='w-full' loading={isSubmitting}>
          Sign Up
        </Button>
      </form>
    </div>
  );
}
