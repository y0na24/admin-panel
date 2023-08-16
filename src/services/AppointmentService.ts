import dayjs from 'dayjs'
import { useHttp } from '../hooks/http.hooks'
import hasRequiredFields from '../utils/hasRequiredFields'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import {
	IAppointment,
	TypeActiveAppointment,
} from '../shared/interfaces/appointment.interface'

dayjs.extend(customParseFormat)


const baseUrl = 'http://localhost:3005/appointments'

const requiredFields = ['id', 'date', 'name', 'service', 'phone', 'canceled']

export const useAppointmentService = () => {
	const { loadingStatus, request } = useHttp()

	const getAllAppointments = async (): Promise<IAppointment[]> => {
		const response = await request({ url: baseUrl })

		if (
			response.every((item: IAppointment) =>
				hasRequiredFields(item, requiredFields)
			)
		) {
			return response
		} else {
			throw new Error('Data does not have all the fields')
		}
	}

	const getAllAcitveAppointments = async (): Promise<
		TypeActiveAppointment[]
	> => {
		const appointments: IAppointment[] = await getAllAppointments()

		return appointments
			.filter(item => {
				return !item.canceled && dayjs(item.date).diff(undefined, 'minute') > 0
			})
			.map((appointment: TypeActiveAppointment) => ({
				id: appointment.id,
				date: appointment.date,
				name: appointment.name,
				service: appointment.service,
				phone: appointment.phone,
			}))
	}

	const cancelOneAppointment = async (id: number) => {
		return await request({
			url: `${baseUrl}/${id}`,
			method: 'PATCH',
			body: JSON.stringify({ canceled: true }),
		})
	}

	const createNewAppointment = async (body: IAppointment) => {
		const id = new Date().getTime()
		body['id'] = id
		body['date'] = dayjs(body.date, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DDTHH:mm')

		return await request({
			url: baseUrl,
			method: 'POST',
			body: JSON.stringify(body),
		})
	}

	return {
		loadingStatus,
		getAllAppointments,
		getAllAcitveAppointments,
		cancelOneAppointment,
		createNewAppointment,
	}
}
