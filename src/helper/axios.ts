import axios from 'axios'

export const getData: (url: string) => Promise<any> = async (url) => {
  try {
    const { data } = await axios.get(url)
    return data
  } catch (error) {
    console.log('error message: ', error)
    return error
  }
}
