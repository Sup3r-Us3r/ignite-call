import type { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

import { prisma } from '@/lib/prisma';
import { Avatar, Heading, Text } from '@ignite-ui/react';

import { ScheduleForm } from './ScheduleForm';
import { Container, UserHeader } from './styles';

interface IScheduleProps {
  user: {
    name: string;
    bio: string | null;
    avatarUrl: string | null;
  };
}

const SchedulePage = ({ user }: IScheduleProps) => {
  return (
    <>
      <NextSeo title={`Agendar com ${user.name} | Ignite Call`} />

      <Container>
        <UserHeader>
          <Avatar src={user.avatarUrl || 'https://github.com/Sup3r-Us3r.png'} />
          <Heading>{user.name}</Heading>
          <Text>{user.bio}</Text>
        </UserHeader>

        <ScheduleForm />
      </Container>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<IScheduleProps> = async ({
  params,
}) => {
  const username = String(params?.username);

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      },
    },
    revalidate: 60 * 60 * 24, // 1 day
  };
};

export default SchedulePage;
