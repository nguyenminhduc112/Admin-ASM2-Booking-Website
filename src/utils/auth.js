export const getIsAuthentication = () => {
    return Boolean(localStorage.getItem('isAuthentication'))
}

export const getIsAdmin = () => {
    return Boolean(localStorage.getItem('isAdmin'))
}

export const setIsAdmin = () => {
    localStorage.setItem('isAdmin', true)
}

export const setIsAuthentication = () => {
    localStorage.setItem('isAuthentication', true)
}
export const removeIsAdmin = () => {
    localStorage.removeItem('isAdmin')
}

export const removeIsAuthentication = () => {
    localStorage.removeItem('isAuthentication')
}


export const checkAuth = () => {
    const isAuthentication = getIsAuthentication()
    const isAdmin = getIsAdmin()

    if (isAuthentication && isAdmin) {
        return true
    }

    return false
}