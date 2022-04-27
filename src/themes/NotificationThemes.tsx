import { MantineTheme } from '@mantine/core'

export const NotificationErrorTheme = (theme: MantineTheme) => {
  const config = {
    root: {
      backgroundColor: theme.colors.red[8],
      borderColor: theme.colors.red[8],

      '&::before': { backgroundColor: theme.white },
    },

    title: { color: theme.white },
    description: { color: theme.white },
    closeButton: {
      color: theme.white,
      '&:hover': { backgroundColor: theme.colors.red[8] },
    },
  }
  return config
}
export const NotificationSuccessTheme = (theme: MantineTheme) => {
  const config = {
    root: {
      backgroundColor: theme.colors.green[8],
      borderColor: theme.colors.green[8],

      '&::before': { backgroundColor: theme.white },
    },

    title: { color: theme.white },
    description: { color: theme.white },
    closeButton: {
      color: theme.white,
      '&:hover': { backgroundColor: theme.colors.green[8] },
    },
  }
  return config
}
