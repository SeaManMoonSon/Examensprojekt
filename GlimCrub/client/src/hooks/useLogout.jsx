import { useAuthContext } from './userAuthContext'

export const useLogout = () => {

    const logout = () => {
        localStorage.remo('user')

        dispatchEvent({type: 'LOGOUT'})
    }

    return {logout}
}