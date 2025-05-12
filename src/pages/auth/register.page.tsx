import React from 'react';

import { Center } from '@chakra-ui/react';

import { AuthForm } from '@/features/authform';
import { rqClient } from '@/shared/api/instance';

const RegisterPage: React.FC = () => {
  const { mutate: register } = rqClient.useMutation('post', '/auth/register');

  return (
    <Center>
      <AuthForm onSubmit={(body) => register({ body })} />
    </Center>
  );
};

export const Component = RegisterPage;
