'use client';

import React, { PropsWithChildren, useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { ModalProvider } from '../../utils/context/modalContext';
import { LoginProvider } from '../../utils/context/loginContext';
import { ChatProvider } from '../../utils/context/chatContext';
import ToasterContext from '../../utils/context/toasterContext';

function Providers({ children }: PropsWithChildren) {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <ModalProvider>
        <LoginProvider>
          <ChatProvider>
            <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
            <ToasterContext />
            <ReactQueryDevtools initialIsOpen={false} />
          </ChatProvider>
        </LoginProvider>
      </ModalProvider>
    </QueryClientProvider>
  );
}

export default Providers;
