import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRegister } from '@/hooks/use-auth';
import { registerSchema, type RegisterInput } from '@/lib/validations/auth';

export default function Register() {
  const { register: registerMutation, loading } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterInput) => {
    registerMutation({
      variables: {
        input: data,
      },
    });
  };

  return (
    <div className='container max-w-lg py-8'>
      <div className='mb-8 text-center'>
        <h1 className='text-2xl font-bold'>Create an account</h1>
        <p className='text-muted-foreground'>Enter your details to get started</p>
      </div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField label='Username' error={errors.username?.message}>
          <Input {...register('username')} error={!!errors.username} />
        </FormField>

        <FormField label='Email' error={errors.email?.message}>
          <Input type='email' {...register('email')} error={!!errors.email} />
        </FormField>

        <FormField label='Password' error={errors.password?.message}>
          <Input type='password' {...register('password')} error={!!errors.password} />
        </FormField>

        <Button type='submit' className='w-full' isLoading={loading}>
          Register
        </Button>
      </Form>

      <p className='mt-4 text-center text-sm text-muted-foreground'>
        Already have an account?{' '}
        <Link to='/login' className='text-primary hover:underline'>
          Login
        </Link>
      </p>
    </div>
  );
}
