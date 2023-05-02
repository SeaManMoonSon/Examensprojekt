import { useEffect, useState } from "react"



const UserStart = () => {
    const [users, setUsers] = useState(null)

    useEffect(() =>  {
        const fetchUser = async () => {
            const response = await fetch('/api/users')
            const json = await response.json()

            if (response.ok) {
                setUsers(json)
            }
        }

        fetchUser()
    }, [])


    // const [products, setProducts] = useState(null)

    // useEffect(() =>  {
    //     const fetchMenu = async () => {
    //         const response = await fetch('/api/products')
    //         const json = await response.json()

    //         if (response.ok) {
    //             setProducts(json)
    //         }
    //     }

    //     fetchMenu()
    // }, [])

    return (
        <div className="start">
                <h2>Glimcrub</h2>
                <h3>Component for login</h3>
            <div className="users">
                {users && users.map((user) => (
                    <p key={user._id}>{user.name}</p>
                ))}
            </div>
        </div>
    )
}

export default UserStart