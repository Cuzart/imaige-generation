import React from 'react';
import { Switch, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';

export default function ColorSwitchIcon() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <Switch
      size='md'
      color={theme.colorScheme === 'dark' ? 'gray.0' : 'dark'}
      onClick={() => toggleColorScheme()}
      checked={!(colorScheme === 'dark')}
      onLabel={<IconSun size={16} stroke={2.5} color={theme.colors.yellow[4]} />}
      offLabel={<IconMoonStars size={16} stroke={2.5} color={theme.colors.blue[6]} />}
    />
  );
}
