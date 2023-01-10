import React, { useContext, useEffect, useState } from 'react'
import { User } from '../@types/user'
import UserContext from '../context/UserContext'
import { updateData } from '../helper/axios'
import FormButtons from './FormButtons'
import FormInputs from './FormInputs'


const FormContainer = () => {
    const { selectedUser, setSelectedUser, setUsers } = useContext(UserContext)
    const [userData, setUserData] = useState<User>(selectedUser)
    const [isEdited, setIsEdited] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setUserData(selectedUser)
    }, [selectedUser])


    useEffect(() => {
        if (shallowEqual(selectedUser, userData) === true) {
            setIsEdited(false)
        }
    }, [userData, selectedUser])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUserData(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
        if (!isEdited) {
            setIsEdited(true)
        }
    }

    const handleSave = (event: React.SyntheticEvent): void => {
        event.preventDefault()
        setIsLoading(true)
        updateData("https://my-json-server.typicode.com/tsevdos/epignosis-users/users/" + userData.id, userData)
            .then(() => {
                setSelectedUser(userData)
                setUsers(prev => {
                    const updatedUsers = prev.map(user => user.id === userData.id ? userData : user)
                    return [
                        ...updatedUsers
                    ]
                })
                setIsLoading(false)
            })
    }

    const handleCancel = (): void => {
        setUserData(selectedUser)
    }


    return (
        <div className={`w-full md:w-1/2 p-5 pb-20 relative`}>
            <form onSubmit={handleSave} className='p-5 h-full overflow-y-auto'>
                {!isObjectEmpty(selectedUser) && <FormInputs handleInputChange={handleInputChange} userData={userData} />}
                {!isObjectEmpty(selectedUser) && <FormButtons handleCancel={handleCancel} handleSave={handleSave} isDisabled={shallowEqual(selectedUser, userData) === true} isEdited={isEdited} isLoading={isLoading} />}
            </form>
        </div>
    )
}

function shallowEqual(object1: User, object2: User): boolean {
    return JSON.stringify(object1) === JSON.stringify(object2)
}

function isObjectEmpty(object: User): boolean {
    return Object.keys(object).length === 0
}

export default FormContainer