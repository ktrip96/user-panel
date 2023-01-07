import { ReactNode, createContext, useState } from 'react'
import { User, UserContextType } from '../@types/user'


const UserContext = createContext<UserContextType>({} as UserContextType)

type Props = {
    children: ReactNode
}

const UserContextProvider = ({ children }: Props) => {

    const [selectedUser, setSelectedUser] = useState<User>({} as User)

    return (
        <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
export { UserContextProvider }
