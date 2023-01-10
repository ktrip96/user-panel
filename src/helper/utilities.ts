import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { User } from '../@types/user'

export function toastRender(status: 'error' | 'success', message: string) {
  toast[status](message, {
    position: 'top-center',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  })
}

export function shallowEqual(object1: User, object2: User): boolean {
  return JSON.stringify(object1) === JSON.stringify(object2)
}

export function isObjectEmpty(object: User): boolean {
  return Object.keys(object).length === 0
}
