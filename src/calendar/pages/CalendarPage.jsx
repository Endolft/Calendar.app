import { useEffect, useState } from 'react';

import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Grid from '@mui/material/Grid';

import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { calendarLocalizer, getMessage } from '../../helpers';

import { CalendarLayout } from '../layout/CalendarLayout';
import {
	CalendarEventBox,
	FabAddEvent,
	ModalCalendar,
	FabDelete,
} from '../components';

export const CalendarPage = () => {
	const { localizer } = calendarLocalizer();

	const { openDateModal } = useUiStore();
	const { events, startLoadingEvent, selecEvent, user } = useCalendarStore();
	const [lastView, setlastView] = useState(
		localStorage.getItem('lastView') || 'week'
	);

	useEffect(() => {
		startLoadingEvent();
	}, [user]);

	const eventStylesGetter = (event, start, end, isSelected) => {
		let style = {
			borderRadius: '0px',
			opacity: 0.8,
			color: 'white',
			backgroundColor: '',
		};
		user.uid !== event.user._id
			? (style.backgroundColor = '#465660')
			: (style.backgroundColor = '#97e199');

		return { style };
	};

	const onDoubleClick = () => {
		openDateModal();
	};
	const onSelect = (event) => {
		selecEvent(event);
	};
	const onViewChanged = (event) => {
		localStorage.setItem('lastView', event);
		console.log(event);
	};

	return (
		<CalendarLayout>
			<Grid
				container
				sx={{
					height: '100%',
					alignItems: 'center',
					justifyContent: 'center',
					margin: '30px 0px 30px 0px',
					width: '100%',
				}}
			>
				<Calendar
					culture='es'
					localizer={localizer}
					events={events}
					defaultView={lastView}
					startAccessor='start'
					endAccessor='end'
					style={{ height: '100%', width: 'calc( 100% - 80px)' }}
					messages={getMessage()}
					eventPropGetter={eventStylesGetter}
					components={{ event: CalendarEventBox }}
					onDoubleClickEvent={onDoubleClick}
					onSelectEvent={onSelect}
					onView={onViewChanged}
				/>
				<ModalCalendar />
				<FabAddEvent />
				<FabDelete />
			</Grid>
		</CalendarLayout>
	);
};
