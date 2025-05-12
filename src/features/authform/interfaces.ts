import type { RegisterOptions } from 'react-hook-form';

interface AuthFormFields {
  email: string;
  password: string;
}

interface AuthFormField {
  name: keyof AuthFormFields;
  options: RegisterOptions<AuthFormFields, keyof AuthFormFields>;
}

export type { AuthFormFields, AuthFormField };
