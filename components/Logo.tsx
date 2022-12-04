import { useMantineTheme } from '@mantine/core';
import React from 'react';
import Image from 'next/image';
import LogoLight from '../public/logo.svg';
import LogoDark from '../public/logo-dark.svg';
import Link from 'next/link';

export const Logo = () => {
  const theme = useMantineTheme();

  return (
    <>
      <Link href='/'>
        <Image
          color='white'
          src={theme.colorScheme === 'dark' ? LogoDark : LogoLight}
          alt='imaigen'
          width={80}
          height={20}
        />
      </Link>
    </>
  );
};
