import dayjs from 'dayjs'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'

import { useAppointmentService } from '../../services/AppointmentService'
import { IAppointment } from '../../shared/interfaces/appointment.interface'

import './caform.scss'
import { AppointmentContext } from '../../context/appointments/AppointmentsContext'

const initialFormValue: IAppointment = {
	name: '',
	service: '',
	phone: '',
	date: '',
	canceled: false,
	id: 1,
}

function CAForm() {
	const [formData, setFormData] = useState<IAppointment>(initialFormValue)
	const [creationStatus, setCreationStatus] = useState<boolean>(false)

	const { getActiveAppointments } = useContext(AppointmentContext)
	const { createNewAppointment } = useAppointmentService()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target

		setFormData(prevData => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setCreationStatus(true)

		// setFormData(prevData => ({
		// 	...prevData,
		// 	data: dayjs(prevData.date).format('YYYY--MM-DDTHH:mm'),
		// }))

		createNewAppointment(formData)
			.then(() => {
				setCreationStatus(false)
				setFormData(initialFormValue)
				getActiveAppointments()
			})
			.catch(() => {
				// setFormData(prevData => ({
				// 	...prevData,
				// 	date: dayjs(prevData.date).format('DD/MM/YYYY HH:mm'),
				// }))
				alert('Error')
			})
	}

	return (
		<form className='caform' onSubmit={handleSubmit}>
			<div className='caform__title'>Create new appointment</div>
			<label htmlFor='name'>
				Name<span>*</span>
			</label>
			<input
				type='text'
				name='name'
				id='name'
				placeholder='User name'
				required
				value={formData.name}
				onChange={handleChange}
			/>

			<label htmlFor='service'>
				Service<span>*</span>
			</label>
			<input
				type='text'
				name='service'
				id='service'
				placeholder='Service name'
				required
				value={formData.service}
				onChange={handleChange}
			/>

			<label htmlFor='phone'>
				Phone number<span>*</span>
			</label>
			<input
				type='tel'
				name='phone'
				id='phone'
				placeholder='+1 890 335 372'
				pattern='^\++[0-9]{1} [0-9]{3} [0-9]{3} [0-9]{3}'
				title='Format should be +1 804 944 567'
				required
				value={formData.phone}
				onChange={handleChange}
			/>

			<label htmlFor='date'>
				Date<span>*</span>
			</label>
			<input
				type='text'
				name='date'
				id='date'
				placeholder='DD/MM/YYYY HH:mm'
				pattern='^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$'
				title='Format should be DD/MM/YYYY HH:mm'
				required
				value={formData.date}
				onChange={handleChange}
			/>
			<button disabled={creationStatus}>Create</button>
		</form>
	)
}

export default CAForm
