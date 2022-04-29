import { ActionIcon, Box, Checkbox, Table, Text, Title } from '@mantine/core'
import { useModals } from '@mantine/modals'
import React from 'react'
import { Pencil, Trash } from 'tabler-icons-react'
import { usePackage } from '../hooks/usePackage'

const AllPackages = () => {
  const { allPackages } = usePackage()
  const deletePackageModal = useModals()

  const handlePackageDelete = () => {
    deletePackageModal.openConfirmModal({
      title: 'Delete a package',
      centered: true,
      children: (
        <Text size='sm'>Are you sure you want to delete a package?</Text>
      ),
      labels: { confirm: 'Delete Package', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => console.log('Confirmed'),
    })
  }

  console.log(allPackages)
  return (
    <>
      <Title order={1}>All Packages</Title>
      <Table style={{ marginTop: `2rem` }}>
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Title</th>
            <th>Slug</th>
            <th>No. of Days</th>
            <th>Price</th>
            <th>Status</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allPackages?.map((packageItem, index) => (
            <tr key={packageItem.id}>
              <td>{index + 1}</td>
              <td>{packageItem.title}</td>
              <td>{packageItem.slug}</td>
              <td>{packageItem.no_of_days}</td>
              <td>{packageItem.price}</td>
              <td>
                <Checkbox checked={packageItem.is_active} readOnly />
              </td>
              <td>
                <Checkbox checked={packageItem.is_featured} readOnly />
              </td>
              <td>
                <Box style={{ display: 'flex', gap: '0.5rem' }}>
                  <ActionIcon variant='filled' color={`blue`}>
                    <Pencil />
                  </ActionIcon>
                  <ActionIcon
                    onClick={() => handlePackageDelete()}
                    variant='filled'
                    color={`red`}
                  >
                    <Trash />
                  </ActionIcon>
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default AllPackages
