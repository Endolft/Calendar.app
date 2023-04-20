import { useDispatch, useSelector } from 'react-redux'
import { onCloseDateModa, onOpenDateModal } from '../store/ui/uiSlice'
import { onSetActiveEvent } from '../store/calendar/calendarSlice'

export const useUiStore = () => {
  const { isDateModalOpen } = useSelector((state) => state.ui)
  const dispatch = useDispatch()
  const openDateModal = () => {
    dispatch(onOpenDateModal())
  }
  const closeDateModal = () => {
    dispatch(onCloseDateModa())
    dispatch(onSetActiveEvent(null))
  }
  return {
    // propiedades
    isDateModalOpen,
    // Metodos
    openDateModal,
    closeDateModal
  }
}
