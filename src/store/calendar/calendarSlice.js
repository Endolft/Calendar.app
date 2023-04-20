import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState: {
		isLoadingEvents: true,
		events: [],
		activeEvent: null,
	},
	reducers: {
		onLoadingEvents: (state, { payload }) => {
			state.events = payload;
			state.isLoadingEvents = false;
		},
		onSetActiveEvent: (state, action) => {
			state.activeEvent = action.payload;
		},
		onAddNewEvent: (state, { payload }) => {
			state.events.push(payload);
			state.activeEvent = null;
		},
		onUpdateEvent: (state, { payload }) => {
			state.events = state.events.map((event) => {
				if (event.id === payload.id) {
					return payload;
				}
				return event;
			});
		},
		onDeleteEVent: (state, { payload }) => {
			state.events = state.events.filter((events) => events.id !== payload.id);
			state.activeEvent = null;
		},
		onLogoutCalendar: (state) => {
			state.isLoadingEvents = true;
			state.events = [];
			state.activeEvent = null;
		},
	},
});
export const {
	onSetActiveEvent,
	onAddNewEvent,
	onDeleteEVent,
	onLoadingEvents,
	onLogoutCalendar,
	onUpdateEvent,
} = calendarSlice.actions;
