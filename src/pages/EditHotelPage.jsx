import React, { Suspense } from 'react'
import { fetchHotel } from '../services/hotelServices'
import { Await, defer, useLoaderData } from 'react-router-dom'
import FormEditHotel from '../components/editHotel/FormEditHotel'
import { fetchRooms } from '../services/roomServices'

const EditHotelPage = () => {
    const { data } = useLoaderData()
    return (
        <React.Fragment>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await
                    resolve={data}
                >
                    {(dataloader) => <FormEditHotel hotel={dataloader[0]} rooms={dataloader[1]} />}
                </Await>
            </Suspense>
        </React.Fragment>
    )
}
const fetchHoteAndRoomsloader = (id) => {
    const hotelData = fetchHotel(id)
    const roomData = fetchRooms()
    return Promise.all([
        hotelData,
        roomData
    ])
}


export const loaderEditHotel = async function ({ request, params }) {
    const { hotelId } = params
    return defer({
        data: fetchHoteAndRoomsloader(hotelId)
    })
}
export default EditHotelPage
