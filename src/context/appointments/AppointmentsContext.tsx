import { createContext, ReactNode, useReducer } from 'react'

import { useAppointmentService } from '../../services/AppointmentService'

import reducer, { IInitialState } from './reducer'
import { ActionsTypes } from './actions'

const initialState: IInitialState = {
	allAppointments: [],
	activeAppointments: [],
	
}

interface ProviderProps {
	children: ReactNode
}

interface AppointmetContextInitialValue extends IInitialState {
	getAppointments: () => Promise<void>
	getActiveAppointments: () => Promise<void>,
	loadingStatus: string
}

export const AppointmentContext = createContext<AppointmetContextInitialValue>({
	allAppointments: initialState.allAppointments,
	activeAppointments: initialState.activeAppointments,
	getAppointments: async () => {},
	getActiveAppointments: async () => {},
	loadingStatus: 'idle'
})

const AppointmentContextProvider = ({ children }: ProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const { loadingStatus, getAllAppointments, getAllAcitveAppointments } = useAppointmentService()

	const value: AppointmetContextInitialValue = {
		allAppointments: state.allAppointments,
		activeAppointments: state.activeAppointments,
		loadingStatus: loadingStatus,
		getAppointments: async () => {
			const data = await getAllAppointments()
			dispatch({ type: ActionsTypes.SET_ALL_APPOINTMENTS, payload: data })
		},
		getActiveAppointments: async () => {
			const data = await getAllAcitveAppointments()
			dispatch({ type: ActionsTypes.SET_ACTIVE_APPOINTMENTS, payload: data })
		},
	}

	return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>
}

export default AppointmentContextProvider
