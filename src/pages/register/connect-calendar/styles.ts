import { Box, styled, Text } from '@ignite-ui/react';

export const ConnectBox = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '$6',
});

export const ConnectItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: '1px solid $gray600',
  padding: '$4 $6',
  borderRadius: '$md',
  marginBottom: '$4',
});

export const AuthError = styled(Text, {
  color: '#F75A68',
  marginBottom: '$4',
});
