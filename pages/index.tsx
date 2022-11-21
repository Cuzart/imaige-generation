import {
  Anchor,
  Blockquote,
  Button,
  Image,
  LoadingOverlay,
  Skeleton,
  Stack,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { completeNavigationProgress } from '@mantine/nprogress';
import type { NextPage } from 'next';
import { useState } from 'react';
import { createImage } from '../hooks/createImage';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const theme = useMantineTheme();
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.container}>
      <Stack>
        <Title
          order={1}
          weight={900}
          variant='gradient'
          gradient={{ from: 'orange', to: 'yellow', deg: 130 }}
        >
          Generate an image of your imagination
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
          color={'orange'}
          radius='md'
          variant='light'
          loading={isLoading}
          onClick={() => {
            setIsLoading(true);
            createImage(prompt).then((url) => {
              setImageUrl(url!);
              completeNavigationProgress();
              setIsLoading(false);
            });
          }}
          disabled={prompt.length < 1}
        >
          Generate
        </Button>
        {imageUrl && (
          <>
            <Blockquote
              cite='– You'
              mb={'lg'}
              sx={() => ({
                margin: '60px auto',
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
                <Image
                  src={imageUrl}
                  alt={prompt}
                  width={'500px'}
                  radius='md'
                  sx={{
                    transition: '200ms ease',
                    cursor: 'pointer',
                    '&:hover': { transform: 'scale(1.02)' },
                  }}
                />
              )}
            </Anchor>
          </>
        )}
      </Stack>
    </div>
  );
};

export default Home;
