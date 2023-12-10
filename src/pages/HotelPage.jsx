import React, { Suspense } from 'react'
import { fetchHotels } from '../services/hotelServices'
import { Await, defer, useLoaderData } from 'react-router-dom'
import TableHotels from '../components/hotel/TableHotels'

const HotelPage = () => {
    const { hotels } = useLoaderData()
    return (
        <React.Fragment>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={hotels}>
                    {(hotelsLoader) => <TableHotels hotels={hotelsLoader} />}
                </Await>
            </Suspense>
        </React.Fragment>
    )
}
const hotelsLoader = async () => {
    const response = await fetchHotels()
    const data = await response.json()
    return data
}

export const loaderHotel = function () {
    return defer({
        hotels: hotelsLoader(),
    })
}
export default HotelPage
