export const fetchTransactionLast = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/transactionsLast`)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}

export const fetchTransactions = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/transactionsAll`)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}