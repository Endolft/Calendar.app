import { useDispatch, useSelector } from 'react-redux';
import {
	onDeleteEVent,
	onSetActiveEvent,
	onUpdateEvent,
	onAddNewEvent,
	onLoadingEvents,
} from '../store/calendar/calendarSlice';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
	const { events, activeEvent } = useSelector((state) => state.calendar);
	const { user } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const startLoadingEvent = async () => {
		try {
			const { data } = await calendarApi.get('/events');

			const events = convertEventsToDateEvents(data.msg);

			dispatch(onLoadingEvents(events));
		} catch (error) {
			console.log(error);
		}
	};

	const selecEvent = (calendarEvent) => {
		dispatch(onSetActiveEvent(calendarEvent));
	};

	const startSavingEvent = async (calendarEvent) => {
		try {
			if (calendarEvent.id) {
				// actualizando una nota
				await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);

				dispatch(onUpdateEvent({ ...calendarEvent, user: user }));
				return;
			}
			// crear nota nueva

			const { data } = await calendarApi.post('/events', calendarEvent);

			dispatch(
				onAddNewEvent({ ...calendarEvent, _id: data.evento.id, user: user })
			);
		} catch (error) {
			console.log(error);
			Swal.fire('error al guardar', error.response.data.msg, 'error');
		}
	};
	const startDeleteEvent = async (calendarEvent) => {
		try {
			await calendarApi.delete(`/events/${calendarEvent.id}`);

			dispatch(onDeleteEVent(calendarEvent));
		} catch (error) {
			console.log(error);
			Swal.fire('error al borrar', error.response.data.msg, 'error');
		}
	};

	return {
		activeEvent,
		events,
		startDeleteEvent,
		selecEvent,
		startLoadingEvent,
		startSavingEvent,
		user,
	};
};
