'use client';

import { ChakraProvider as ChProvider, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider, type ColorModeProviderProps } from '@/shared/chakra/color-mode';

export function ChakraProvider(props: ColorModeProviderProps) {
  return (
    <ChProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChProvider>
  );
}
