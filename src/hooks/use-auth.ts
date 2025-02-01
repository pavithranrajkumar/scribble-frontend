import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { LOGIN, REGISTER, ME } from '@/lib/graphql/auth';
import { useAuth } from '@/context/auth.context';
import type { AuthPayload } from '@/types/graphql';

export function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loginMutation, { loading }] = useMutation(LOGIN, {
    onCompleted: (data: { login: AuthPayload }) => {
      login(data.login.token, data.login.user);
      navigate('/');
      toast.success('Logged in successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { login: loginMutation, loading };
}

export function useRegister() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [registerMutation, { loading }] = useMutation(REGISTER, {
    onCompleted: (data: { register: AuthPayload }) => {
      login(data.register.token, data.register.user);
      navigate('/');
      toast.success('Registered successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { register: registerMutation, loading };
}

export function useMe() {
  return useQuery(ME);
}
