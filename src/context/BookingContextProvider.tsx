import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { BookingType } from '../configs/customTypes'

type BookingContextType = {
	allBookings: BookingType[] | null
	setAllBookings: React.Dispatch<React.SetStateAction<BookingType[] | null>>
}

type BookingContextProviderType = {
	children: React.ReactNode
}

export const BookingContext = createContext<BookingContextType | null>(null)

const BookingContextProvider = ({children} : BookingContextProviderType) => {
 
	const [allBookings, setAllBookings] = useState<BookingType[] | null>(null)
	useEffect(() => {
		axios.get(`http://127.0.0.1:8000/api/bookings/`).then(res => setAllBookings(res.data))
	}, [])

	const context = {
		allBookings,
		setAllBookings,
	}
	return (
	<BookingContext.Provider value={context}>
	{children}
	</BookingContext.Provider>
  )
}

export default BookingContextProvider