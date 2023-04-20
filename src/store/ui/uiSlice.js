import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDateModalOpen: false
  },
  reducers: {
    onOpenDateModal: (state) => {
      state.isDateModalOpen = true
    },
    onCloseDateModa: (state) => {
      state.isDateModalOpen = false
    }
  }
})
export const { onOpenDateModal, onCloseDateModa } = uiSlice.actions
