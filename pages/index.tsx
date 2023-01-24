import {
  Alert,
  Anchor,
  Blockquote,
  Box,
  Button,
  Image as MImage,
  Skeleton,
  Stack,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { completeNavigationProgress } from '@mantine/nprogress';
import { IconRepeat } from '@tabler/icons';
import type { NextPage } from 'next';
import { useState } from 'react';
import { createImage } from '../helpers/createImage';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import RockIllustration from '../public/rock.svg';
import RockIllustrationDark from '../public/rock-dark.svg';

const Home: NextPage = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const theme = useMantineTheme();
  return (
    <div className={styles.container}>
      <Stack>
        {/* {isLoading && (
          <Skeleton
            sx={{
              position: 'absolute',
              margin: '0 auto',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 0,
              opacity: 0.1,
              height: '100%',
              width: '100%',
            }}
            radius='md'
          />
        )} */}
        {!imageUrl ? (
          <>
            <Box sx={{ fill: 'white', margin: '0 auto' }} pr='xl'>
              <Image
                src={theme.colorScheme === 'dark' ? RockIllustrationDark : RockIllustration}
                alt='rocking hand'
                width={200}
              ></Image>
            </Box>
            <Title
              order={1}
              weight={900}
              variant='gradient'
              align='center'
              gradient={
                theme.colorScheme === 'dark'
                  ? { from: 'orange', to: 'yellow', deg: 130 }
                  : { from: 'blue', to: 'cyan', deg: 130 }
              }
              sx={{ zIndex: 3 }}
            >
              Generate an image out of your imagination
            </Title>

            <TextInput
              radius={'md'}
              placeholder='Your wildest fantasy'
              styles={() => ({
                input: {
                  border: 'none',
                  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.15)',
                },
              })}
              onChange={(event) => setPrompt(event.currentTarget.value)}
              autoFocus
            ></TextInput>
            <Button
              id='findme'
              sx={{ display: 'block', margin: '0 auto' }}
              color={theme.colorScheme === 'dark' ? 'orange' : 'blue'}
              radius='md'
              variant='light'
              loading={isLoading}
              onClick={() => {
                setIsLoading(true);
                createImage(prompt).then((url) => {
                  setImageUrl(url as string);
                  completeNavigationProgress();
                  setIsLoading(false);
                });
              }}
              disabled={prompt.length < 1}
            >
              Generate
            </Button>
          </>
        ) : (
          <>
            <Title
              order={1}
              fz={48}
              mt={60}
              weight={900}
              variant='gradient'
              align='center'
              gradient={
                theme.colorScheme === 'dark'
                  ? { from: 'orange', to: 'yellow', deg: 130 }
                  : { from: 'blue', to: 'cyan', deg: 130 }
              }
            >
              Your prompt
            </Title>
            <Blockquote
              cite='– You'
              mb={'lg'}
              sx={() => ({
                margin: '20px auto',
              })}
            >
              {prompt}
            </Blockquote>
            <Anchor
              href={imageUrl}
              download
              target='_blank'
              rel='noopener noreferrer'
              style={{ margin: '0 auto' }}
              my={'lg'}
            >
              {isLoading ? (
                <Skeleton height={500} width={500} radius='md' />
              ) : (
                <MImage
                  src={imageUrl}
                  alt={prompt}
                  width={'500px'}
                  radius='md'
                  sx={{
                    transition: '300ms ease',
                    cursor: 'pointer',
                    '&:hover': { transform: 'scale(1.01)' },
                  }}
                />
              )}
            </Anchor>

            <Button
              onClick={() => setImageUrl('')}
              color={theme.colorScheme === 'dark' ? 'yellow' : 'cyan'}
              variant='subtle'
              sx={{ display: 'block', margin: '1rem auto 5rem' }}
              leftIcon={<IconRepeat size={16} />}
            >
              Try again
            </Button>
          </>
        )}
      </Stack>
    </div>
  );
};

export default Home;
