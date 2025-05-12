import React from 'react';

import { Center } from '@chakra-ui/react';

import { AuthForm } from '@/features/authform';
import { rqClient } from '@/shared/api/instance';

const LoginPage: React.FC = () => {
  const { mutate: login } = rqClient.useMutation('post', '/auth/login');

  return (
    <Center>
      <AuthForm onSubmit={(body) => login({ body })} />
    </Center>
  );
};

export const Component = LoginPage;
