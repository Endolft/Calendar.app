import { Fab } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore";
import { addHours } from "date-fns";
export const FabAddEvent = () => {
  const { selecEvent } = useCalendarStore();
  const { openDateModal } = useUiStore();
  const addNewEvent = () => {
    selecEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#9ca669",
      user: {
        _id: "123",
        name: "marcos",
      },
    });
    openDateModal({});
  };
  return (
    <Fab
      variant="extended"
      color="primary"
      aria-label="add"
      sx={{ bottom: "25px", position: "fixed", right: "25px" }}
      onClick={addNewEvent}
    >
      <EventIcon />
      Nuevo evento
    </Fab>
  );
};
