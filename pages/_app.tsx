import '../styles/globals.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import {
  MantineProvider,
  ColorSchemeProvider,
  AppShell,
  Header,
  ColorScheme,
  Flex,
  Box,
} from '@mantine/core';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import ColorSwitchIcon from '../components/ColorSwitchIcon';
import { NavigationProgress } from '@mantine/nprogress';
import { Logo } from '../components/Logo';
import contours from '../public/contours.svg';
import { Karla } from '@next/font/google';

const karla = Karla({ subsets: ['latin'] });

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <Box
      className={karla.className + ' app'}
      sx={{ '&::after': { backgroundImage: `url(${contours.src})` } }}
    >
      <Head>
        <title>Imaigen</title>
        <meta name='description' content='Generate images via AI' />
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            fontFamily: 'Karla',
            colorScheme,
            loader: 'dots',
            headings: { fontFamily: 'Karla' },
          }}
        >
          <main>
            <NavigationProgress />
            <AppShell
              navbarOffsetBreakpoint='sm'
              asideOffsetBreakpoint='sm'
              header={
                <Header
                  className='header'
                  height={{ base: 50, md: 70 }}
                  p='md'
                  sx={{ border: 'none', boxShadow: '1px 1px 10px #00000020' }}
                >
                  <Flex sx={{ height: '100%' }} align='center' px={20} justify={'space-between'}>
                    <Logo />
                    <ColorSwitchIcon />
                  </Flex>
                </Header>
              }
            >
              <Component {...pageProps} />
            </AppShell>
          </main>
          <footer className={styles.footer}>
            <div>Made with {colorScheme === 'dark' ? '🧡' : '💙'} in Schwäbisch Hall</div>
          </footer>
        </MantineProvider>
      </ColorSchemeProvider>
    </Box>
  );
}
