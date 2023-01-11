import React, { useContext, useEffect, useState, useRef } from 'react'
import { User } from '../@types/user'
import UserContext from '../context/UserContext'
import { updateData } from '../helper/axios'
import FormButtons from './FormButtons'
import FormInputs from './FormInputs'
import { isEmpty, isValidEmail } from '../helper/validators'
import { shallowEqual, isObjectEmpty, toastRender } from '../helper/utilities'

const FormContainer = () => {
	const { selectedUser, setSelectedUser, setUsers } = useContext(UserContext)
	const [userData, setUserData] = useState<User>(selectedUser)
	const [isEdited, setIsEdited] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const nameRef = useRef<HTMLInputElement>(null)
	const phoneRef = useRef<HTMLInputElement>(null)
	const emailRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		setUserData(selectedUser)
	}, [selectedUser])

	useEffect(() => {
		if (shallowEqual(selectedUser, userData) === true) {
			setIsEdited(false)
		}
	}, [userData, selectedUser])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
		if (isInvalidForm(nameRef, phoneRef, emailRef)) {
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
					<FormInputs
						handleInputChange={handleInputChange}
						nameRef={nameRef}
						phoneRef={phoneRef}
						emailRef={emailRef}
						userData={userData}
					/>
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

function isInvalidForm(
	nameRef: React.RefObject<HTMLInputElement>,
	phoneRef: React.RefObject<HTMLInputElement>,
	emailRef: React.RefObject<HTMLInputElement>
): boolean {
	return (
		isEmpty(nameRef.current?.value) ||
		isEmpty(phoneRef.current?.value) ||
		!isValidEmail(emailRef.current?.value)
	)
}

export default FormContainer
