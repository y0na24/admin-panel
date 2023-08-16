import { useContext } from 'react'
import LibCalendar from 'react-calendar'

import { AppointmentContext } from '../../context/appointments/AppointmentsContext'

import 'react-calendar/dist/Calendar.css'
import './calendar.scss'

function Calendar() {
	const { calendarDate, setDateAndFilter } = useContext(AppointmentContext)

	return (
		<div className='calendar'>
			<LibCalendar
				value={calendarDate}
				onChange={value => {
					setDateAndFilter(value as [Date, Date])
				}}
				selectRange
			/>
		</div>
	)
}

export default Calendar
