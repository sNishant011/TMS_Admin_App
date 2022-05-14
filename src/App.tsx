import {
  Box,
  Drawer,
  Loader,
  Title,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Menu } from 'tabler-icons-react'
import NavbarMinimal from './components/NavbarMinimal'
import { useAuth } from './hooks/useAuth'
import AddBlog from './pages/AddBlog'
import AddPackage from './pages/AddPackage'
import AllBlogs from './pages/AllBlogs'
import AllBookings from './pages/AllBookings'
import AllPackages from './pages/AllPackages'
import AllUsers from './pages/AllUsers'
import Dashboard from './pages/Dashboard'
import EditBlog from './pages/EditBlog'
import EditPackage from './pages/EditPackage'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import { shellStyles } from './styles/shellStyle'

function App() {
  const { authToken } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const { classes } = shellStyles()
  const [opened, setOpened] = useState(false)
  const theme = useMantineTheme()
  setTimeout(() => {
    setIsLoading(false)
  }, 1000)
  if (isLoading) {
    return (
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Loader />
      </Box>
    )
  }
  if (!authToken) {
    return (
      <Routes>
        <Route path='/*' element={<Login />} />
      </Routes>
    )
  }

  return (
    <Box
      style={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        margin: '0 auto',
      }}
    >
      <Box className={classes.nav_wrapper}>
        <NavbarMinimal />
      </Box>
      <Box className={classes.content_wrapper}>
        <Box className={classes.mobile_header}>
          <Title order={1} className={classes.brand_title}>
            TMS
          </Title>
          <UnstyledButton
            onClick={() => setOpened(true)}
            className={classes.menu_btn}
          >
            <Menu size={`32`} />
          </UnstyledButton>
        </Box>
        <Box style={{ padding: '1rem', width: '100%' }}>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/packages' element={<AllPackages />} />
            <Route
              path='/packages/edit-package/:packageSlug'
              element={<EditPackage />}
            />

            <Route path='/packages/add-package' element={<AddPackage />} />
            <Route path='/blogs' element={<AllBlogs />} />

            <Route path='/blogs/add-blog' element={<AddBlog />} />
            <Route path='/blogs/edit-blog/:blogSlug' element={<EditBlog />} />
            <Route path='/users' element={<AllUsers />} />

            <Route path='/bookings' element={<AllBookings />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Box>
      </Box>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        padding='md'
        position='right'
        overlayColor={'black'}
        overlayOpacity={0.55}
        size='md'
      >
        <NavbarMinimal />
      </Drawer>
    </Box>
  )
}

export default App
