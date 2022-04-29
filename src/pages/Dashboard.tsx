import { Box, Divider, Paper, Text, Title } from '@mantine/core'
import { usePackage } from '../hooks/usePackage'

const Dashboard = () => {
  const { allPackages } = usePackage()
  return (
    <>
      <Title order={1}>Dashboard</Title>
      <Box style={{ padding: `1rem` }}>
        <Paper
          style={{
            width: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
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
      </Box>
    </>
  )
}

export default Dashboard
