import { useContext, useEffect, useState, useCallback } from 'react'

import AppointmentItem from '../appointmentItem.tsx/AppointmentItem'

import { AppointmentContext } from '../../context/appointments/AppointmentsContext'
import Spinner from '../spinner/Spinner'
import Error from '../error/Error'
import CancelModal from '../modal/CancelModal'

function AppointmentList() {
	const {
		activeAppointments,
		getActiveAppointments,
		loadingStatus,
		calendarDate,
	} = useContext(AppointmentContext)

	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [selectedId, setSelectedId] = useState(0)

	useEffect(() => {
		getActiveAppointments()
	}, [calendarDate])

	const openModal = useCallback((id: number) => {
		setIsOpen(true)
		setSelectedId(id)
	}, [])

	const closeModal = () => {
		setIsOpen(false)
	}

	return (
		<>
			{loadingStatus === 'loading' && <Spinner />}
			{loadingStatus === 'error' && (
				<>
					<Error />
					<button className='schedule_reload' onClick={getActiveAppointments}>
						Try to reload
					</button>
				</>
			)}
			{activeAppointments.length > 0 &&
				activeAppointments.map(appointment => (
					<AppointmentItem
						{...appointment}
						key={appointment.id}
						openModal={openModal}
						getActiveAppointments={getActiveAppointments}
					/>
				))}
			<CancelModal
				handleClose={closeModal}
				selectedId={selectedId}
				isOpen={isOpen}
			/>
		</>
	)
}

export default AppointmentList
