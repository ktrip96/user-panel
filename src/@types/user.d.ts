export interface User {
  id: string
  photo: string
  name: string
  email: string
  phone: string
  address: string
  company: string
}

export interface UserContextType {
  selectedUser: User
  setSelectedUser: React.Dispatch<React.SetStateAction<User>>
}
