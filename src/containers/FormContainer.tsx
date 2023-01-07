import React, { useContext, useEffect, useState } from 'react'
import { User } from '../@types/user'
import UserContext from '../context/UserContext'

type Props = {}


const FormContainer = (props: Props) => {
    const { selectedUser } = useContext(UserContext)
    const [userData, setUserData] = useState<User>(selectedUser)
    const userAttributes = Object.keys(selectedUser)

    useEffect(() => {
        setUserData(selectedUser)
    }, [selectedUser])

    const isEdited: () => boolean = () => {
        return true
    }


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUserData(prev => {

            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }


    return (
        <div className={`w-full md:w-1/2 p-5 pb-20 relative`}>
            <form className='p-5 h-full overflow-y-auto '>

                {/* input forms */}

                {userAttributes.map((item) => (
                    <div key={item} className='flex flex-col mb-2'>
                        <label className='lg:text-lg text-gray-500 py-2'> {configureLabel(item)} </label>
                        <input
                            onChange={handleInputChange}
                            name={item}
                            type="text"
                            placeholder={`Enter ${item}`}
                            defaultValue={(userData as any)[item]}
                            className="rounded w-full py-2 px-3 leading-tight text-lg lg:text-xl focus:outline-blue-500 focus:shadow " />
                    </div>
                ))}

                {/* buttons */}

                <div className='flex absolute lg:bottom-10 bottom-5 right-5  gap-2'>
                    <button type="submit" className={`${!isEdited() && "hidden"} py-3 px-4 bg-[var(--cancel-btn-bg)] min-w-[70px] rounded-md text-center text-lg lg:text-xl text-gray-600 hover:scale-105 hover:shadow-lg transition `}>
                        Cancel
                    </button>
                    <button type="submit" className={`${!isEdited() && "opacity-70"} py-3 px-4 bg-[var(--save-btn-bg)] rounded-md text-white text-lg lg:text-xl enabled:hover:scale-105 enabled:hover:shadow-lg transition`}>
                        {isEdited() ?
                            "Save" :
                            <div className='ml-3'>
                                <svg aria-hidden="true" className={`w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-400`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </div>
                        }
                    </button>
                </div>


            </form>

        </div>
    )
}


function configureLabel(str: string): string {
    let newString = str.charAt(0).toUpperCase() + str.slice(1)
    if (str === "email") newString += " address"
    return newString
}

export default FormContainer