import { ReactNode, createContext, useState, useContext } from 'react'
import { User, UserContextType } from '../@types/user'

const UserContext = createContext<UserContextType>({} as UserContextType)

type Props = {
	children: ReactNode
}

const UserContextProvider = ({ children }: Props) => {
	const [selectedUser, setSelectedUser] = useState<User>({} as User)
	const [users, setUsers] = useState<User[]>([])

	return (
		<UserContext.Provider value={{ selectedUser, setSelectedUser, users, setUsers }}>
			{children}
		</UserContext.Provider>
	)
}

const useUserContext = () => useContext(UserContext)

export default useUserContext
export { UserContextProvider }
