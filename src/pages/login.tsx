import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLogin } from '@/hooks/use-auth';
import { loginSchema, type LoginInput } from '@/lib/validations/auth';

export default function Login() {
  const { login, loading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    login({
      variables: {
        input: data,
      },
    });
  };

  return (
    <div className='container max-w-lg py-8'>
      <div className='mb-8 text-center'>
        <h1 className='text-2xl font-bold'>Login</h1>
        <p className='text-muted-foreground'>Welcome back!</p>
      </div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField label='Email' error={errors.email?.message}>
          <Input type='email' {...register('email')} error={!!errors.email} />
        </FormField>

        <FormField label='Password' error={errors.password?.message}>
          <Input type='password' {...register('password')} error={!!errors.password} />
        </FormField>

        <Button type='submit' className='w-full' isLoading={loading}>
          Login
        </Button>
      </Form>

      <p className='mt-4 text-center text-sm text-muted-foreground'>
        Don't have an account?{' '}
        <Link to='/register' className='text-primary hover:underline'>
          Register
        </Link>
      </p>
    </div>
  );
}
