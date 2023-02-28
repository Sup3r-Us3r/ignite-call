import '../lib/dayjs';

import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

import { queryClient } from '@/lib/react-query';
import { globalStyles } from '@/styles/global';
import { QueryClientProvider } from '@tanstack/react-query';

globalStyles();

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default App;
