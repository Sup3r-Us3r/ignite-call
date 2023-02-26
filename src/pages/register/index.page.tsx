import { useRouter } from 'next/router';
import { ArrowRight } from 'phosphor-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react';

import { Container, Form, FormError, Header } from './styles';

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário precisa ter apenas letras e hífen.',
    })
    .transform(username => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z]+)$/i, {
      message: 'O usuário precisa ter apenas letras.',
    })
    .transform(name => name.toLowerCase()),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

const RegisterPage = () => {
  const router = useRouter();
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  async function handleRegister(data: RegisterFormData) {
    console.log(data);
  }

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username));
    }
  }, [router.query?.username]);

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label htmlFor="">
          <Text size="sm">Nome de usuário</Text>

          <TextInput
            prefix="ignite.com/"
            placeholder="seu-usuário"
            {...register('username')}
          />

          {errors.username && (
            <FormError size="sm">{errors.username.message}</FormError>
          )}
        </label>

        <label htmlFor="">
          <Text size="sm">Nome completo</Text>

          <TextInput placeholder="Seu nome" {...register('name')} />

          {errors.name && (
            <FormError size="sm">{errors.name.message}</FormError>
          )}
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo <ArrowRight />
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
