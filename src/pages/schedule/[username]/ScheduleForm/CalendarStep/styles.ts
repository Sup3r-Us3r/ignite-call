import { Box, styled, Text } from '@ignite-ui/react';

export const Container = styled(Box, {
  display: 'grid',
  position: 'relative',
  maxWidth: '100%',
  margin: '$6 auto 0',
  padding: 0,

  variants: {
    isTimePickerOpen: {
      true: {
        gridTemplateColumns: '1fr 280px',

        '@media(max-width: 900px)': {
          gridTemplateColumns: '1fr',
        },
      },
      false: {
        gridTemplateColumns: '1fr',
        width: 540,
      },
    },
  },
});

export const TimePicker = styled('div', {
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  borderLeft: '1px solid $gray600',
  padding: '$6 $6 0',
  overflowY: 'scroll',
  width: 280,
});

export const TimePickerHeader = styled(Text, {
  fontWeight: '$medium',

  span: {
    color: '$gray200',
  },
});

export const TimePickerList = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$2',
  marginTop: '$3',

  '@media(max-width: 900px)': {
    gridTemplateColumns: '2fr',
  },
});

export const TimePickerItem = styled('button', {
  fontSize: '$sm',
  backgroundColor: '$gray600',
  color: '$gray100',
  border: 0,
  padding: '$2 0',
  cursor: 'pointer',
  borderRadius: '$sm',

  '&:last-child': {
    marginBottom: '$6',
  },

  '&:disabled': {
    background: 'none',
    cursor: 'default',
    opacity: 0.4,
  },

  '&:not(:disabled):hover': {
    backgroundColor: '$gray500',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },
});
