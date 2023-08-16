import {
	IAppointment,
	TypeActiveAppointment,
} from '../../shared/interfaces/appointment.interface'

export enum ActionsTypes {
	SET_ACTIVE_APPOINTMENTS = 'SET_ACTIVE_APPOINTMENTS',
	SET_ALL_APPOINTMENTS = 'SET_ALL_APPOINTMENTS',
	SET_CALENDAR_DATE = 'SET_CALENDAR_DATE',
}

export type IAppointmentAction =
	| {
			type: ActionsTypes.SET_ACTIVE_APPOINTMENTS
			payload: TypeActiveAppointment[]
	  }
	| {
			type: ActionsTypes.SET_ALL_APPOINTMENTS
			payload: IAppointment[]
	  }
	| {
			type: ActionsTypes.SET_CALENDAR_DATE
			payload: [Date, Date] | [null, null]
	  }
