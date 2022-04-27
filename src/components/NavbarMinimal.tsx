import React, { useState } from 'react'
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Group,
  Text,
} from '@mantine/core'
import {
  Icon as TablerIcon,
  Home2,
  Gauge,
  DeviceDesktopAnalytics,
  Fingerprint,
  CalendarStats,
  User,
  Settings,
  Logout,
  SwitchHorizontal,
} from 'tabler-icons-react'
import { useModals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { useAuth } from '../hooks/useAuth'

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
  active?: boolean
  onClick?(): void
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles()
  return (
    <Tooltip label={label} position='right' withArrow transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon />
      </UnstyledButton>
    </Tooltip>
  )
}

const mockdata = [
  { icon: Home2, label: 'Home' },
  { icon: Gauge, label: 'Dashboard' },
  { icon: DeviceDesktopAnalytics, label: 'Analytics' },
  { icon: CalendarStats, label: 'Releases' },
  { icon: User, label: 'Account' },
  { icon: Fingerprint, label: 'Security' },
  { icon: Settings, label: 'Settings' },
]

const NavbarMinimal = () => {
  const [active, setActive] = useState(0)

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
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

  const handleConfirmLogout = () => {
    localStorage.removeItem('isLoggedIn')
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
      onCancel: () => handleCancelLogout(),
      onConfirm: () => handleConfirmLogout(),
    })

  return (
    <Navbar height={750} width={{ base: 80 }} p='md'>
      <Center>TMS</Center>
      <Navbar.Section grow mt={50}>
        <Group direction='column' align='center' spacing={0}>
          {links}
        </Group>
      </Navbar.Section>
      <Navbar.Section>
        <Group direction='column' align='center' spacing={0}>
          <NavbarLink icon={SwitchHorizontal} label='Change account' />
          <NavbarLink
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
