import React, { useState } from 'react'
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Group,
  Text,
  Box,
  Title,
} from '@mantine/core'
import {
  Icon as TablerIcon,
  Gauge,
  DeviceDesktopAnalytics,
  User,
  Logout,
  SwitchHorizontal,
  Bookmarks,
  Plus,
  Package,
} from 'tabler-icons-react'
import { useModals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { useAuth } from '../hooks/useAuth'
import { NavLink, useLocation, useNavigate, useRoutes } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color:
        theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
    },
  },
}))

interface NavbarLinkProps {
  icon: TablerIcon
  label: string
  href: string
  active?: boolean
  onClick?(): void
}

function NavbarLink({
  icon: Icon,
  label,
  active,
  href,
  onClick,
}: NavbarLinkProps) {
  const { classes, cx } = useStyles()
  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
      }}
    >
      <Tooltip label={label} position='right' withArrow transitionDuration={0}>
        <NavLink
          to={href}
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            gap: '1rem',
            textDecoration: 'none',
            color: 'black',
          }}
          onClick={onClick}
        >
          <UnstyledButton
            className={cx(classes.link, { [classes.active]: active })}
          >
            <Icon />
          </UnstyledButton>

          <Text
            style={{ color: active ? '#1c7ed6' : 'black', fontWeight: '400' }}
          >
            {label}
          </Text>
        </NavLink>
      </Tooltip>
    </Box>
  )
}

const mockdata = [
  { icon: Gauge, label: 'Dashboard', href: '/' },
  { icon: Package, label: 'All Packages', href: '/packages' },
  { icon: Plus, label: 'Add Packages', href: '/packages/add' },
  { icon: Bookmarks, label: 'Bookings', href: '/bookings' },
  { icon: User, label: 'Users', href: '/users' },
]

const NavbarMinimal = () => {
  // getting path name
  const location = useLocation()
  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={link.href === location.pathname}
    />
  ))
  const modals = useModals()
  const { setIsLoggedIn } = useAuth()
  const handleCancelLogout = () => {
    showNotification({
      title: 'Logout Cancelled',
      message: 'You canceled logout!',

      styles: (theme) => ({
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
      }),
    })
  }
  const navigate = useNavigate()
  const handleConfirmLogout = () => {
    localStorage.removeItem('isLoggedIn')
    navigate('/login')
    setIsLoggedIn(false)
    showNotification({
      title: 'Logout Successfull',
      message: 'Your session is now over!',
      styles: (theme) => ({
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
      }),
    })
  }

  const openLogoutModal = () =>
    modals.openConfirmModal({
      title: 'Confirm Logout',
      centered: true,
      children: <Text size='sm'>Are you sure you want to logout?</Text>,
      labels: { confirm: 'Logout', cancel: "Don't Logout" },
      confirmProps: { color: 'red' },
      overlayOpacity: 0.4,
      onCancel: () => handleCancelLogout(),
      onConfirm: () => handleConfirmLogout(),
    })

  return (
    <Navbar
      height={750}
      style={{
        width: '250px',
        height: '100%',
        maxHeight: '100%',
        padding: '0.5rem',
      }}
    >
      <Center>
        <Title order={1}>TMS</Title>
      </Center>
      <Navbar.Section grow mt={20}>
        <Group direction='column' align='center' spacing={0}>
          {links}
        </Group>
      </Navbar.Section>
      <Navbar.Section>
        <Group direction='column' align='center' spacing={0}>
          <NavbarLink
            href='#'
            icon={Logout}
            onClick={() => openLogoutModal()}
            label='Logout'
          />
        </Group>
      </Navbar.Section>
    </Navbar>
  )
}
export default NavbarMinimal
