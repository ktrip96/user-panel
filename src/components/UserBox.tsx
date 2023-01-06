import { useContext } from 'react'
import { User } from '../@types/user'
import UserContext from '../context/UserContext'

type Props = {
    user: User
}

const UserBox = ({ user }: Props) => {

    const { selectedUser, setSelectedUser } = useContext(UserContext)
    const { name, photo, id, email } = user

    return (
        <div onClick={() => setSelectedUser(user)} className={`flex gap-5 p-4  items-center cursor-pointer ${id === selectedUser?.id && "bg-[var(--user-bg)] hover:bg-[var(--user-bg)]"} hover:bg-[var(--user-hover-bg)]`}>
            <img src={photo} className="w-16 h-16 lg:w-20 lg:h-20 rounded-full" alt={name} />
            <div className='hidden md:block w-[25vw] max-w-[550px]'>
                <h1 className={`font-semibold text-lg lg:text-xl ${id === selectedUser?.id && "text-white"}`}>{name}</h1>
                <p className={`lg:text-lg text-gray-500 ${id === selectedUser?.id && "text-gray-300"}`}>{email}</p>
            </div>
        </div>
    )
}

export default UserBox