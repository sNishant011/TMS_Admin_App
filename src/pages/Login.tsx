import {
  Button,
  Center,
  Checkbox,
  createStyles,
  Group,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import {
  NotificationErrorTheme,
  NotificationSuccessTheme,
} from '../themes/NotificationThemes'

const useStyles = createStyles((theme) => ({
  heading: {
    fontSize: '2rem',
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      fontSize: '2rem',
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      fontSize: '1.8rem',
    },
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: '1.6rem',
    },
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      fontSize: '1.4rem',
    },
  },
  login_container: {
    minHeight: '60vh',
    width: '100%',
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      width: '100%',
      alignItems: 'flex-start',
      borderRadius: '0',
    },
  },
  form_wrapper: {
    flexDirection: 'column',
    width: '100%',
    maxWidth: '500px',
    padding: '2rem 3rem',
    boxShadow: '0px 0px 20px rgba(0,0,0,0.3)',
    borderRadius: '8px',

    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      width: '100%',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      boxShadow: 'none',
      borderRadius: '0',
      height: '100vh',
      padding: '1.5rem',
    },
  },
  form_style: {
    width: '100%',
    marginTop: '1.5rem',
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      marginTop: '0.5rem',
    },
  },
}))
type loginFormType = {
  email: string
  password: string
  rememberMe: boolean
}
const Login = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })
  const { login } = useAuth()
  const handleFormSubmit = (values: loginFormType) => {
    console.log(values)
    login(values.email, values.password, values.rememberMe)
  }

  const { classes } = useStyles()
  return (
    <Center className={classes.login_container}>
      <Center className={classes.form_wrapper}>
        <Title order={1} className={classes.heading}>
          Tour Management System
        </Title>
        <Text style={{ color: 'grayText' }} size='md'>
          Please enter your credentials.
        </Text>
        <form
          className={classes.form_style}
          onSubmit={form.onSubmit((values) => handleFormSubmit(values))}
        >
          <TextInput
            required
            label='Email'
            type='email'
            placeholder='your@email.com'
            {...form.getInputProps('email')}
          />
          <PasswordInput
            required
            style={{ marginTop: '1rem' }}
            label='Password'
            placeholder='Your password'
            {...form.getInputProps('password')}
          />

          <Checkbox
            mt='lg'
            label='Remember me'
            {...form.getInputProps('rememberMe', { type: 'checkbox' })}
          />

          <Group position='center' mt='xl'>
            <Button type='submit' style={{ width: '100%' }}>
              Login
            </Button>
          </Group>
        </form>
      </Center>
    </Center>
  )
}

export default Login
