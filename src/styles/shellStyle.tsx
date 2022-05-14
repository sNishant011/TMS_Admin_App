import { createStyles } from '@mantine/core'

export const shellStyles = createStyles((theme) => ({
  nav_wrapper: {
    display: 'block',
    width: '300px',
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      display: 'none',
    },
  },
  mobile_header: {
    display: 'none',
    padding: '0.5rem 1rem',
    backgroundColor: 'blue',
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
  brand_title: {
    color: 'white',
  },
  content_wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  menu_btn: {
    color: 'white',
  },
}))
