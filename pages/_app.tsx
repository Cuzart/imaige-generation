import '../styles/globals.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import {
  MantineProvider,
  ColorSchemeProvider,
  useMantineTheme,
  Group,
  AppShell,
  Navbar,
  Header,
  ColorScheme,
  Flex,
} from '@mantine/core';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import ColorSwitchIcon from '../components/ColorSwitchIcon';
import { NavigationProgress } from '@mantine/nprogress';
import { Logo } from '../components/Logo';

import Image from 'next/image';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const theme = useMantineTheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            loader: 'dots',
          }}
        >
          <main>
            <NavigationProgress />
            <AppShell
              navbarOffsetBreakpoint='sm'
              asideOffsetBreakpoint='sm'
              header={
                <Header
                  height={{ base: 50, md: 70 }}
                  p='md'
                  sx={{ border: 'none', boxShadow: '1px 1px 10px #00000020' }}
                >
                  <Flex
                    sx={{ height: '100%' }}
                    align='center'
                    px={20}
                    justify={'space-between'}
                    style={{ color: theme.colorScheme === 'dark' ? 'white' : 'black' }}
                  >
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
    </>
  );
}
