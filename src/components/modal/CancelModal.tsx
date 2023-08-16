import { useContext, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

import Portal from '../portal/Portal'
import { AppointmentContext } from '../../context/appointments/AppointmentsContext'

import { useAppointmentService } from '../../services/AppointmentService'

import './modal.scss'

interface IModalProps {
	handleClose: () => void
	selectedId: number
	isOpen: boolean
}

function CancelModal({ handleClose, selectedId, isOpen }: IModalProps) {
	const { getActiveAppointments } = useContext(AppointmentContext)

	const { cancelOneAppointment } = useAppointmentService()

	const nodeRef = useRef<HTMLDivElement>(null)

	const [btnDisabled, setBtnDisabled] = useState<boolean>(false)
	const [cancelStatus, setCancelStatus] = useState<boolean | null>(null)

	const handleCancelAppointment = (id: number) => {
		setBtnDisabled(true)

		cancelOneAppointment(id)
			.then(() => {
				console.log('done')
				setCancelStatus(true)
			})
			.catch(() => {
				console.log('error')
				setCancelStatus(false)
				setBtnDisabled(false)
			})
	}

	const closeModal = () => {
		handleClose()

		if (cancelStatus) {
			getActiveAppointments()
			setCancelStatus(null)
		}
	}

	const closeOnEscapeKey = (e: KeyboardEvent): void => {
		if (e.key === 'Escape') {
			closeModal()
		}
	}

	useEffect(() => {
		document.body.addEventListener('keydown', closeOnEscapeKey)

		return () => {
			document.body.removeEventListener('keydown', closeOnEscapeKey)
		}
	}, [isOpen, cancelStatus])

	const modalRequestStatus =
		cancelStatus === null
			? ''
			: cancelStatus
			? 'Success'
			: 'Error, please, try again'

	return (
		<Portal>
			<CSSTransition
				in={isOpen}
				timeout={{ enter: 300, exit: 300 }}
				unmountOnExit
				classNames='modal'
				nodeRef={nodeRef}
			>
				<div className='modal' ref={nodeRef}>
					<div className='modal__body'>
						<span className='modal__title'>
							Are you sure you want to delete the appointment?
						</span>
						<div className='modal__btns'>
							<button
								className='modal__ok'
								disabled={btnDisabled}
								onClick={() => handleCancelAppointment(selectedId)}
							>
								Ok
							</button>
							<button className='modal__close' onClick={closeModal}>
								Close
							</button>
						</div>
						<div className='modal__status'>{modalRequestStatus}</div>
					</div>
				</div>
			</CSSTransition>
		</Portal>
	)
}

export default CancelModal
