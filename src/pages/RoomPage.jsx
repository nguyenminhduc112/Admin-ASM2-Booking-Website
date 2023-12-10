import React, { Suspense } from 'react'
import { Await, defer, useLoaderData } from 'react-router-dom'
import { fetchRooms } from '../services/roomServices'
import TableRooms from '../components/room/TableRooms'

const RoomPage = () => {
    const { rooms } = useLoaderData()
    return (
        <React.Fragment>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={rooms}>
                    {(roomsLoader) => <TableRooms rooms={roomsLoader} />}
                </Await>
            </Suspense>
        </React.Fragment>
    )
}

const roomsLoader = () => {
    const data = fetchRooms()
    return data
}

export const loaderRoom = function () {
    return defer({
        rooms: roomsLoader(),
    })
}

export default RoomPage
