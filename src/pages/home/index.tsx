import { NextSeo } from 'next-seo';
import Image from 'next/image';

import previewAppImage from '@/assets/app-preview.png';
import { Heading, Text } from '@ignite-ui/react';

import { ClaimUsernameForm } from './components/ClaimUsernameForm';
import { Container, Hero, Preview } from './styles';

const HomePage = () => {
  return (
    <>
      <NextSeo
        title="Descomplique sua agenda | Ignite Call"
        description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre."
      />

      <Container>
        <Hero>
          <Heading size="4xl">Agendamento descomplicado</Heading>
          <Text size="xl">
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre
          </Text>

          <ClaimUsernameForm />
        </Hero>

        <Preview>
          <Image
            src={previewAppImage}
            height={400}
            quality={100}
            priority
            alt="Calendário simbolizando a aplicação em funcionamento"
          />
        </Preview>
      </Container>
    </>
  );
};

export default HomePage;
