import { useState } from 'react';
import { useAuthContext } from './userAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [users, setUsers] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (users, password) => {
        setIsLoading(true)
        setError(null)

        const fetchUser = async () => {
            const response = await fetch('/api/users')
            const json = await response.json()

            if (!response.ok) {
                setIsLoading(false)
                setError(json.error)
            }
            if (response.ok) {
                setUsers(json)

                dispatch({ type: 'LOGIN', payload: json })

                setIsLoading(false)
            }
        }

        fetchUser()
    }

    return { login, isLoading, error }
}
