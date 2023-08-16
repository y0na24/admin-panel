import { useContext, useEffect, useState, useCallback } from 'react'

import AppointmentItem from '../appointmentItem.tsx/AppointmentItem'

import { AppointmentContext } from '../../context/appointments/AppointmentsContext'
import Spinner from '../spinner/Spinner'
import Error from '../error/Error'
import CancelModal from '../modal/CancelModal'

function HistoryList() {
	const { allAppointments, getAppointments, loadingStatus, calendarDate } =
		useContext(AppointmentContext)

	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [selectedId, setSelectedId] = useState(0)

	useEffect(() => {
		getAppointments()
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
			<>
				{loadingStatus === 'loading' && <Spinner />}
				{loadingStatus === 'error' && (
					<>
						<Error />
						<button className='schedule_reload' onClick={getAppointments}>
							Try to reload
						</button>
					</>
				)}
				{allAppointments.length > 0 &&
					allAppointments.map(appointment => (
						<AppointmentItem
							{...appointment}
							key={appointment.id}
							
						/>
					))}
				<CancelModal
					handleClose={closeModal}
					selectedId={selectedId}
					isOpen={isOpen}
				/>
			</>
		</>
	)
}

export default HistoryList
