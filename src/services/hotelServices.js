export const fetchHotels = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/hotels`)
        return response
    } catch (error) {
        console.log(error)
        return null
    }
}

export const fetchHotel = async (id) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/hotel/${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}

export const deleteHotel = async (id) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/hotel/${id}`, {
            method: 'DELETE'
        })
        return response

    } catch (error) {
        console.log(error)
        return null
    }
}
export const addHotel = async (data) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/hotel/add`, {
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

export const uppdateHotel = async (id, data) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/hotel/update/${id}`, {
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