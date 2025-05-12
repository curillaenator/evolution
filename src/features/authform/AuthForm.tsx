import React from 'react';
import { useForm } from 'react-hook-form';

import { VStack, Input, Field, HStack, Button, Text } from '@chakra-ui/react';

import type { AuthFormField, AuthFormFields, AuthFormProps } from './interfaces';

const FORM_FILEDS: AuthFormField[] = [
  {
    name: 'email',
    options: { required: 'required field' },
  },
  {
    name: 'password',
    options: { required: 'required field', minLength: { value: 8, message: 'Please use at least 8 chars' } },
  },
];

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormFields>();

  return (
    <VStack as='form' gap={6} w='768px' onSubmit={handleSubmit(onSubmit)}>
      {FORM_FILEDS.map(({ name, options }) => (
        <Field.Root key={name} invalid={!!errors[name]} w='full'>
          <Field.Label>
            <Field.RequiredIndicator />
            <Text color='fg.subtle'>Email</Text>
          </Field.Label>

          <Input type={name} placeholder='Email' autoComplete='off' {...register(name, options)} />

          <Field.ErrorText>{errors[name]?.message}</Field.ErrorText>
        </Field.Root>
      ))}

      <HStack>
        <Button colorPalette='blue' type='submit'>
          Submit
        </Button>
      </HStack>
    </VStack>
  );
};

export { AuthForm };
