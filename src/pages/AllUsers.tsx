import {
  ActionIcon,
  Box,
  Checkbox,
  Loader,
  Table,
  Text,
  Title,
} from '@mantine/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_API_ROUTE } from '../configs/constants'
import { UserType } from '../configs/customTypes'
import { useUser } from '../hooks/useUsers'

const AllUsers = () => {
  const { allUsers } = useUser()
  const [isLoading, setIsLoading] = useState(true)
  setTimeout(() => {
    setIsLoading(false)
  }, 6000)

  if (!allUsers) {
    return (
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        {isLoading ? <Loader /> : <Text>No users found</Text>}
      </Box>
    )
  }

  return (
    <>
      <Title order={1}>All Users</Title>
      <Table style={{ marginTop: `2rem` }}>
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>
                <Checkbox checked={user.active} readOnly />
              </td>
              <td>{user.id}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default AllUsers
