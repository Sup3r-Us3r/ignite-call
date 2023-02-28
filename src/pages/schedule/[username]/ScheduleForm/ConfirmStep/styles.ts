import { Box, styled, Text } from '@ignite-ui/react';

export const ConfirmForm = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  maxWidth: 540,
  margin: '$6 auto 0',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
});

export const FormHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
  paddingBottom: '$6',
  marginBottom: '$2',
  borderBottom: '1px solid $gray600',

  [`> ${Text}`]: {
    display: 'flex',
    alignItems: 'center',
    gap: '$2',

    svg: {
      color: '$gray200',
      width: '$5',
    },
  },
});

export const FormError = styled(Text, {
  color: '#F75A68',
});

export const FormActions = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '$2',
  marginTop: '$2',
});
