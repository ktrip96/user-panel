import axios from 'axios'
import { User } from '../@types/user'

export const getData = async (url: string): Promise<any> => {
  try {
    const { data } = await axios.get(url)
    return data
  } catch (error) {
    console.log('error message: ', error)
    return error
  }
}

export const updateData = async (url: string, body: User): Promise<any> => {
  try {
    const { data } = await axios.put(url, body)
    return data
  } catch (error) {
    console.log('error message: ', error)
    return error
  }
}
