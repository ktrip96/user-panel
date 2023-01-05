import { useEffect, useState } from 'react'
import { getData } from './helper/axios'

type Props = {}

type User = {
    id: string
    photo: string
    name: string
    company: string
    email: string
    phone: string
    address: string
}

const UserList = (props: Props) => {

    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        getData("https://my-json-server.typicode.com/tsevdos/epignosis-users/users")
            .then((res: User[]) => setUsers(res))
    }, [])

    return (
        <div className="border border-green-500 w-fit overflow-y-scroll h-full">
            {users.map((user: User) =>
                <div key={user.id}>
                    <img src={user.photo} className="w-16 h-16" alt={user.name} />
                    <p>{user.name}</p>
                </div>)}
        </div>
    )
}

export default UserList