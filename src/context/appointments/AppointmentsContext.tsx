import { createContext, ReactNode, useReducer } from 'react'

import { useAppointmentService } from '../../services/AppointmentService'

import reducer, { IInitialState } from './reducer'
import { ActionsTypes } from './actions'

const initialState: IInitialState = {
	allAppointments: [],
	activeAppointments: [],
	calendarDate: [null, null],
}

interface ProviderProps {
	children: ReactNode
}

interface AppointmetContextInitialValue extends IInitialState {
	getAppointments: () => Promise<void>
	getActiveAppointments: () => Promise<void>
	setDateAndFilter: (newDate: [Date, Date] | [null, null]) => void
	loadingStatus: string
}

export const AppointmentContext = createContext<AppointmetContextInitialValue>({
	allAppointments: initialState.allAppointments,
	activeAppointments: initialState.activeAppointments,
	calendarDate: initialState.calendarDate,
	loadingStatus: 'idle',
	getAppointments: async () => {},
	getActiveAppointments: async () => {},
	setDateAndFilter: (newDate: [Date, Date] | [null, null]) => {},
})

const AppointmentContextProvider = ({ children }: ProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const { loadingStatus, getAllAppointments, getAllAcitveAppointments } =
		useAppointmentService()

	const value: AppointmetContextInitialValue = {
		allAppointments: state.allAppointments,
		activeAppointments: state.activeAppointments,
		loadingStatus: loadingStatus,
		calendarDate: state.calendarDate,

		getAppointments: async () => {
			const data = await getAllAppointments()
			const filteredData = data.filter(item => {
				if (state.calendarDate[0] && state.calendarDate[1]) {
					if (
						new Date(item.date).getTime() >=
						new Date(state.calendarDate[0]).getTime() &&
						new Date(item.date).getTime() <=
							new Date(state.calendarDate[1]).getTime()
					) {
						return item
					}
				} else {
					return item
				}
			})
			dispatch({
				type: ActionsTypes.SET_ALL_APPOINTMENTS,
				payload: filteredData,
			})
		},
		getActiveAppointments: async () => {
			try {
				const data = await getAllAcitveAppointments()

				const filteredData = data.filter(item => {
					if (state.calendarDate[0] && state.calendarDate[1]) {
						if (
							new Date(item.date).getTime() >=
								new Date(state.calendarDate[0]).getTime() &&
							new Date(item.date).getTime() <=
								new Date(state.calendarDate[1]).getTime()
						) {
							return item
						}
					} else {
						return item
					}
				})

				dispatch({
					type: ActionsTypes.SET_ACTIVE_APPOINTMENTS,
					payload: filteredData,
				})
			} catch (err) {
				console.log('Ошибка в контексте')
			}
		},
		setDateAndFilter: (newDate: [Date, Date] | [null, null]) => {
			dispatch({ type: ActionsTypes.SET_CALENDAR_DATE, payload: newDate })
		},
	}

	return (
		<AppointmentContext.Provider value={value}>
			{children}
		</AppointmentContext.Provider>
	)
}

export default AppointmentContextProvider
