import { Fab } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore";
import { useMemo } from "react";
export const FabDelete = () => {
  const { activeEvent, startDeleteEvent } = useCalendarStore();

  const disabledButton = useMemo(() => activeEvent === null, [activeEvent]);
  const onDelete = () => {
    startDeleteEvent(activeEvent);
  };

  return (
    <Fab
      color="error"
      aria-label="add"
      sx={{ bottom: "25px", position: "fixed", left: "25px" }}
      onClick={onDelete}
      disabled={disabledButton}
    >
      <DeleteForeverIcon />
    </Fab>
  );
};
