import { useEffect, useState } from 'react'
import UserBox from '../components/UserBox'
import { getData } from '../helper/axios'
import { User } from '../@types/user'

const UserList = () => {

    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        getData("https://my-json-server.typicode.com/tsevdos/epignosis-users/users")
            .then((res: User[]) => setUsers(res))
    }, [])

    return (
        <div className="border border-green-400 w-fit min-w-[100px] overflow-y-scroll h-full">
            {users.map((user: User) =>
                <UserBox key={user.id} user={user} />)
            }
        </div>
    )
}

export default UserList