export const fetchRooms = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/rooms/all`)
        const data = await response.json()
        return data
    } catch (error) {
        return null
    }
}

export const fetchRoom = async (id) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/room/${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        return null
    }
}

export const addRoom = async (data) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/room/add`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        return response

    } catch (error) {
        console.log(error)
        return null
    }
}

export const updateRoom = async (id, data) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/room/update/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        return response

    } catch (error) {
        console.log(error)
        return null
    }
}

export const deleteRoom = async (id) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/room/delete/${id}`, {
            method: 'DELETE'
        })
        return response

    } catch (error) {
        console.log(error)
        return null
    }
}