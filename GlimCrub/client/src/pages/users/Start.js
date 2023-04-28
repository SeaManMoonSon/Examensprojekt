import { useEffect, useState } from "react"

const Start = () => {
    // const [users, setUsers] = useState(null)

    // useEffect(async () =>  {
    //     const fetchUser = async () => {
    //         const response = await fetch('http://localhost:3000/api/users')
    //         const json = await response.json()

    //         if (response.ok) {
    //             setUsers(json)
    //         }
    //     }

    //     fetchUser()
    // }, [])

    return (
        <div className="start">
                <h2>Glimcrub</h2>
                <h3>Component for login</h3>
            {/* <div className="users">
                {users && users.map(() => (
                    <p key={users._id}>{users.name}</p>
                ))}
            </div> */}
        </div>
    )
}

export default Start