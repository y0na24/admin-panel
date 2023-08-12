import Portal from '../portal/Portal'
import { useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import './modal.scss'

interface IModalProps {
	handleClose: () => void
	selectedId: number
	isOpen: boolean
}

function CancelModal({ handleClose, selectedId, isOpen }: IModalProps) {
	const nodeRef = useRef<HTMLDivElement>(null)

	const closeOnEscapeKey = (e: KeyboardEvent): void => {
		if (e.key === 'Escape') {
			handleClose()
		}
	}

	useEffect(() => {
		document.body.addEventListener('keydown', closeOnEscapeKey)

		return () => {
			document.body.removeEventListener('keydown', closeOnEscapeKey)
		}
	}, [isOpen])

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
							<button className='modal__ok'>Ok</button>
							<button className='modal__close' onClick={handleClose}>
								Close
							</button>
						</div>
						<div className='modal__status'>Success</div>
					</div>
				</div>
			</CSSTransition>
		</Portal>
	)
}

export default CancelModal
