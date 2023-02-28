import { Box, styled, Text } from '@ignite-ui/react';

export const ProfileBox = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  marginTop: '$6',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
});

export const FormAnnotation = styled(Text, {
  color: '$gray.200',
});
