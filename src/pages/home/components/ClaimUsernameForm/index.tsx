import { ArrowRight } from 'phosphor-react';

import { Button, TextInput } from '@ignite-ui/react';

import { Form } from './styles';

const ClaimUsernameForm = () => {
  return (
    <Form as="form">
      <TextInput size="sm" prefix="ignite.com/" placeholder="seu-usuário" />
      <Button size="sm" type="submit">
        <ArrowRight />
        Reservar
      </Button>
    </Form>
  );
};

export { ClaimUsernameForm };
