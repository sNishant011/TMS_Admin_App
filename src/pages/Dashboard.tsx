import { Box, Divider, Paper, Text, Title } from '@mantine/core'
import { useBlog } from '../hooks/useBlog'
import { usePackage } from '../hooks/usePackage'
import { useUser } from '../hooks/useUsers'

const Dashboard = () => {
  const { allPackages } = usePackage()
  const { blogs } = useBlog()
  const { userCount } = useUser()
  return (
    <>
      <Title order={1}>Dashboard</Title>
      <Box style={{ display: 'flex', padding: `1rem`, gap: '1rem' }}>
        <Paper
          style={{
            width: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          shadow='sm'
          radius='md'
          p='lg'
          withBorder
        >
          <Text style={{ fontSize: `2rem` }} weight={`bolder`} color={`blue`}>
            {allPackages?.length}
          </Text>
          <Divider
            style={{ width: `100%` }}
            my={`sm`}
            label={`No. of Packages`}
            labelPosition={`center`}
          />
        </Paper>
        <Paper
          style={{
            width: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          shadow='sm'
          radius='md'
          p='lg'
          withBorder
        >
          <Text style={{ fontSize: `2rem` }} weight={`bolder`} color={`blue`}>
            {blogs?.length}
          </Text>
          <Divider
            style={{ width: `100%` }}
            my={`sm`}
            label={`No. of Blogs`}
            labelPosition={`center`}
          />
        </Paper>{' '}
        <Paper
          style={{
            width: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          shadow='sm'
          radius='md'
          p='lg'
          withBorder
        >
          <Text style={{ fontSize: `2rem` }} weight={`bolder`} color={`blue`}>
            {userCount}
          </Text>
          <Divider
            style={{ width: `100%` }}
            my={`sm`}
            label={`No. of Users`}
            labelPosition={`center`}
          />
        </Paper>
      </Box>
    </>
  )
}

export default Dashboard
