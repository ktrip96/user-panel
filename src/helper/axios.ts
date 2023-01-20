import axios from 'axios'
import { User } from '../@types/user'

export const getData = async (url: string): Promise<User[]> => {
	const { data } = await axios.get(url)
	return data
}

export const updateData = async (url: string, body: User): Promise<any> => {
	const { data } = await axios.put(url, body)
	return data
}
