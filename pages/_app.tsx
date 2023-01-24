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
  Alert,
} from '@mantine/core';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import ColorSwitchIcon from '../components/ColorSwitchIcon';
import { NavigationProgress } from '@mantine/nprogress';
import { Logo } from '../components/Logo';
import contours from '../public/contours.svg';
import { IBM_Plex_Sans } from '@next/font/google';
import { IconAlertCircle } from '@tabler/icons';

const font = IBM_Plex_Sans({ weight: '700' });

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <Box
      className={font.className + ' app'}
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
            fontFamily: 'IBM Plex Sans',
            colorScheme,
            loader: 'dots',
            headings: { fontFamily: 'IBM Plex Sans' },
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
                  <Flex
                    sx={{ height: '100%', maxWidth: 1200, margin: '0 auto' }}
                    align='center'
                    px={20}
                    justify={'space-between'}
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
          <Alert
            icon={<IconAlertCircle size={16} />}
            title='Disclaimer'
            color='orange'
            radius={0}
            style={{ margin: '120px auto 0' }}
          >
            This page was intentionally designed to use the OpenAI API to generate an image out of a
            prompt. For now the form returns an image from the unsplash API based on the prompt.
          </Alert>
          <footer className={styles.footer}>
            <div>Made with {colorScheme === 'dark' ? '🧡' : '💙'} in Schwäbisch Hall</div>
          </footer>
        </MantineProvider>
      </ColorSchemeProvider>
    </Box>
  );
}
