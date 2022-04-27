import {
  Button,
  Center,
  Checkbox,
  Container,
  Group,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/hooks'

const Login = () => {
  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })
  return (
    <Center style={{ minHeight: '60vh', width: '100%' }}>
      <Center style={{ flexDirection: 'column' }}>
        <Title order={1}>Login</Title>
        <Text size='md'>Please enter your credentials.</Text>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            required
            label='Email'
            placeholder='your@email.com'
            {...form.getInputProps('email')}
          />

          <Checkbox
            mt='md'
            label='I agree to sell my privacy'
            {...form.getInputProps('termsOfService', { type: 'checkbox' })}
          />

          <Group position='right' mt='md'>
            <Button type='submit'>Submit</Button>
          </Group>
        </form>
      </Center>
    </Center>
  )
}

export default Login
