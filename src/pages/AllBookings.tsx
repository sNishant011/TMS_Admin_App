import { Button, Group, Modal, Stack, Table, Text, Title } from '@mantine/core'
import React, { useState } from 'react'
import { BookingType } from '../configs/customTypes'
import { useBookings } from '../hooks/useBookings'

const AllBookings = () => {
	const {allBookings} = useBookings()
	console.log(allBookings)
	const [opened, setOpened] = useState(false);
	const [activeBooking, setActiveBooking] = useState<BookingType | null>(null)

	const handleViewDetail = (booking: BookingType) => {
		if (booking){
			setActiveBooking(booking)
			setOpened(true)
		}
	}
  return (
	 <>
      <Title order={1}>All Blogs</Title>
      <Table style={{ marginTop: `2rem` }}>
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Booked Package</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Phone Number</th>
            <th>Price</th>
            <th>Package Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allBookings?.map((booking, index) => <tr key={index}>
			  <td>
				  {index + 1}
			  </td>
			  <td>
				  {booking.booked_package.title}
			  </td>
			  <td>
				  {booking.booked_user.first_name}
			  </td>
			  <td>
				  {booking.booked_user.last_name}
			  </td>
			  <td>
				  {booking.booked_user.phone_number}
			  </td>
			  <td>
				  {booking.booked_package.price}
			  </td>
			  <td>
				  {booking.booked_package.is_active ? 'Active' : 'Inactive'}
			  </td>
			  <td>
				  <Button onClick={() => handleViewDetail(booking)}>
					  View Details
				  </Button>
			  </td>
		  </tr>)}
        </tbody>
      </Table>
	  <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={'Booking for ' + activeBooking?.booked_package.title}
      >
        <Stack>
			<Text>Firstname: {activeBooking?.booked_user.first_name}</Text>
			<Text>Lastname: {activeBooking?.booked_user.last_name}</Text>
			<Text>User Status: {activeBooking?.booked_user.active ? 'Active' : 'Inactive'}</Text>
			<Text>Package Title: {activeBooking?.booked_package.title}</Text>
			<Text>Package Status: {activeBooking?.booked_package.is_active ? 'Active' : 'Inactive'}</Text>
			<Text>Package Start date: {activeBooking?.booked_package.start_day}</Text>
			<Text>Package End date: {activeBooking?.booked_package.end_day}</Text>
			<Text>Price: Rs. {activeBooking?.booked_package.price}</Text>
		</Stack>
      </Modal>
    </>
  )
}

export default AllBookings