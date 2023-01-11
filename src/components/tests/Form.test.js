/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react'
import user from '@testing-library/user-event'
import FormContainer from '../../containers/FormContainer'

it('should ensure that data return to its initial state when Cancel is clicked', async () => {
	const view = render(<FormContainer />)
	const input = await view.findByLabelText('input-name')
	const initialValue = input.innerHTML
	user.type(input, 'Kostantinos Tripalitakis')
	const cancelButton = await view.findByLabelText('cancel-button')
	user.click(cancelButton)
	const inputAfterCancel = await view.findByLabelText('input-name')
	const valueAterCancel = inputAfterCancel.innerHTML
	expect(initialValue).toBe(valueAterCancel)`
	`
})
