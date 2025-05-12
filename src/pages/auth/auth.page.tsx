import React from 'react';

import { Center } from '@chakra-ui/react';

import { AuthForm } from '@/features/authform';

const AuthPage: React.FC = () => {
  return (
    <Center>
      <AuthForm />
    </Center>
  );
};

export const Component = AuthPage;
