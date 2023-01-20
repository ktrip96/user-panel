import { useEffect, useState } from 'react'
import UserBox from '../components/UserBox'
import { getData } from '../helper/axios'
import { User } from '../@types/user'
import useUserContext from '../context/UserContext'
import Loading from '../components/Loading'

const UserList = () => {
	const { users, setUsers } = useUserContext()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const cachedData = sessionStorage.getItem('users')
		if (cachedData) {
			const users = JSON.parse(cachedData)
			setUsers(users)
		} else {
			getData('https://my-json-server.typicode.com/tsevdos/epignosis-users/users')
				.then((res: User[]) => {
					setUsers(res)
					sessionStorage.setItem('users', JSON.stringify(res))
				})
				.catch((e) => console.error(e))
		}
		setIsLoading(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (isLoading)
		return (
			<div className='w-1/2 flex justify-center items-center'>
				<Loading width={'16'} height={'16'} />
			</div>
		)

	return (
		<ul className='w-fit min-w-[100px] overflow-y-auto h-full'>
			<span className='sr-only'>User list</span>
			{users.map((user: User) => (
				<UserBox key={user.id} user={user} />
			))}
		</ul>
	)
}

export default UserList
