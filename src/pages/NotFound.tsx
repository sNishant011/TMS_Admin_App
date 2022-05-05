import React, { ReactPropTypes, useEffect } from 'react'
import {
  createStyles,
  Container,
  Title,
  Text,
  Button,
  Group,
} from '@mantine/core'
import { Illustration } from '../components/Illustration'
import { BrowserRouter, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  inner: {
    position: 'relative',
  },

  image: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 0,
    opacity: 0.75,
  },

  content: {
    paddingTop: 220,
    position: 'relative',
    zIndex: 1,

    [theme.fn.smallerThan('sm')]: {
      paddingTop: 120,
    },
  },

  description: {
    maxWidth: 540,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}))

const NotFound = (props: any) => {
  const { classes } = useStyles()
  const { authToken } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    if (location.pathname === '/login') {
      navigate('/')
    }
  }, [authToken, navigate, location])
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title style={{ textAlign: 'center' }}>Nothing to see here</Title>
          <Text
            color='dimmed'
            size='lg'
            align='center'
            style={{
              fontSize: '1.2rem',
            }}
          >
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Group position='center' style={{ marginTop: '1rem' }}>
            <Link to='/'>
              <Button size='lg'>Go to Home</Button>
            </Link>
          </Group>
        </div>
      </div>
    </Container>
  )
}
export default NotFound
