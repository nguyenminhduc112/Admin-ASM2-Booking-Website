import React, { Suspense } from 'react'
import FormAddHotel from '../components/newHotel/FormAddHotel'
import { Await, defer, useLoaderData } from 'react-router-dom'
import { fetchRooms } from '../services/roomServices'

const NewHotelPage = () => {
    const { rooms } = useLoaderData()
    return (
        <React.Fragment>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={rooms}>
                    {(roomsLoader) => <FormAddHotel rooms={roomsLoader} />}
                </Await>
            </Suspense>
        </React.Fragment>
    )
}
const fetchRoomsLoader = () => {
    const data = fetchRooms()
    return data
}

export const loaderNewHotel = function (request, params) {
    return defer({
        rooms: fetchRoomsLoader()
    })
}

export default NewHotelPage
