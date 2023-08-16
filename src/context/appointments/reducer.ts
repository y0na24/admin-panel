import { ActionsTypes, IAppointmentAction } from './actions'

import {
	IAppointment,
	TypeActiveAppointment,
} from '../../shared/interfaces/appointment.interface'


export interface IInitialState {
	allAppointments: IAppointment[] | []
	activeAppointments: TypeActiveAppointment[] | []
	calendarDate: [null, null] | [Date, Date]
}

const reducer = (state: IInitialState, action: IAppointmentAction) => {
	switch (action.type) {
		case ActionsTypes.SET_ALL_APPOINTMENTS:
			return { ...state, allAppointments: action.payload }

		case ActionsTypes.SET_ACTIVE_APPOINTMENTS:
			return { ...state, activeAppointments: action.payload }

		case ActionsTypes.SET_CALENDAR_DATE:
			return { ...state, calendarDate: action.payload }

		default:
			return state
	}
}

export default reducer
