export const fetchInfoBoard = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/dashboard/infoBoard`)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}