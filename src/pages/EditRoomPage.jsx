import React, { Suspense } from 'react'
import { fetchRoom } from '../services/roomServices'
import { Await, defer, useLoaderData } from 'react-router-dom'
import FormEditRoom from '../components/editRoom/FormEditRoom'

const EditRoomPage = () => {
    const { room } = useLoaderData()
    return (
        <React.Fragment>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={room}>
                    {(roomLoader) => <FormEditRoom room={roomLoader} />}
                </Await>
            </Suspense>
        </React.Fragment>
    )
}
const roomLoader = (id) => {
    const data = fetchRoom(id)
    return data
}

export const loaderEditRoom = function ({ request, params }) {
    const { roomId } = params
    return defer({
        room: roomLoader(roomId),
    })
}

export default EditRoomPage
