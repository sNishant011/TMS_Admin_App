
import React, { useContext } from 'react'
import { BookingContext } from '../context/BookingContextProvider'

export const useBookings = () => {
	const context = useContext(BookingContext)
	if (!context){
		throw new Error("hook must be used inside the provider")
	}
  const {allBookings, setAllBookings} = context
  return {allBookings, setAllBookings}
}
