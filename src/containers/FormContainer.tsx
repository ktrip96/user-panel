import React, { useContext, useEffect, useState, useRef } from 'react'
import { User } from '../@types/user'
import UserContext from '../context/UserContext'
import { updateData } from '../helper/axios'
import FormButtons from './FormButtons'
import FormInputs, { FormRefHandler } from './FormInputs'
import { isEmpty, isValidEmail } from '../helper/validators'
import { shallowEqual, isObjectEmpty, toastRender } from '../helper/utilities'

const FormContainer = () => {
	const { selectedUser, setSelectedUser, setUsers } = useContext(UserContext)
	const [userData, setUserData] = useState<User>(selectedUser)
	const [isEdited, setIsEdited] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const formInputRef = useRef<FormRefHandler>(null)

	useEffect(() => {
		setUserData(selectedUser)
	}, [selectedUser])

	// We need to compare the state data with the database data
	// in order to show/hide the Cancel button
	// and enable/disable the Save button

	useEffect(() => {
		if (shallowEqual(selectedUser, userData) === true) {
			setIsEdited(false)
		}
	}, [userData, selectedUser])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		// I am using state in order to store userData
		// because I want dynamic error handling
		setUserData((prev) => {
			return {
				...prev,
				[e.target.name]: e.target.value,
			}
		})

		if (!isEdited) {
			setIsEdited(true)
		}
	}

	const handleSave = (e: React.SyntheticEvent): void => {
		e.preventDefault()
		const name = formInputRef.current?.getNameValue()
		const phone = formInputRef.current?.getPhoneValue()
		const email = formInputRef.current?.getEmailValue()

		if (isInvalidForm(name, phone, email)) {
			toastRender('error', 'Error in the form')
			return
		}
		setIsLoading(true)
		const url = 'https://my-json-server.typicode.com/tsevdos/epignosis-users/users/'
		updateData(url + userData.id, userData).then(() => {
			setSelectedUser(userData)
			setUsers((prev) => {
				const updatedUsers = prev.map((user) => (user.id === userData.id ? userData : user))
				return [...updatedUsers]
			})
			setIsLoading(false)
			toastRender('success', 'User updated!')
		})
	}

	const handleCancel = (): void => {
		setUserData(selectedUser)
	}

	return (
		<div className={`w-full md:w-1/2 p-5 pb-20 relative`}>
			<span className='sr-only'>Input fields</span>
			{!isObjectEmpty(selectedUser) ? (
				<form onSubmit={handleSave} className='p-5 h-full overflow-y-auto'>
					<FormInputs ref={formInputRef} handleInputChange={handleInputChange} userData={userData} />
					<FormButtons
						handleCancel={handleCancel}
						handleSave={handleSave}
						isDisabled={shallowEqual(selectedUser, userData) === true}
						isEdited={isEdited}
						isLoading={isLoading}
					/>
				</form>
			) : (
				<span className='sr-only'>You have to select a user to edit his info</span>
			)}
		</div>
	)
}

type Input = string | undefined

function isInvalidForm(name: Input, phone: Input, email: Input): boolean {
	return isEmpty(name) || isEmpty(phone) || !isValidEmail(email)
}

export default FormContainer
