export interface User {
  id: string
  photo: string
  name: string
  company: string
  email: string
  phone: string
  address: string
}

export interface UserContextType {
  selectedUser?: User
  setSelectedUser: React.Dispatch<React.SetStateAction<User | undefined>>
}
