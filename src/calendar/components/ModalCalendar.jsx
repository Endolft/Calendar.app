import {
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  TextField,
  Backdrop,
  Divider,
} from "@mui/material";

import { useEffect, useState } from "react";
import es from "date-fns/locale/es";

import DatePicker, { registerLocale } from "react-datepicker";
import SaveIcon from "@mui/icons-material/Save";
import "react-datepicker/dist/react-datepicker.css";
import { useValidation } from "../hooks/useValidation";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { addHours } from "date-fns";

registerLocale("es", es);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  background: "#e8f5e9",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ModalCalendar = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();

  const { activeEvent, startSavingEvent } = useCalendarStore();

  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });
  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const { titleError, noteError, onSubmit, onDateChanged, onInputChanged } =
    useValidation(formValues, setFormValues, startSavingEvent, closeDateModal);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isDateModalOpen}
        onClose={closeDateModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isDateModalOpen}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h3">
              Nuevo evento
            </Typography>
            <br />

            <Typography id="transition-modal-title" variant="h7">
              Fecha de inicio:
            </Typography>
            <DatePicker
              selected={formValues.start}
              onChange={(event) => onDateChanged(event, "start")}
              dateFormat="Pp"
              className="dataPicker"
              showTimeSelect
              locale={"es"}
              timeCaption="Hora"
            />

            <Typography id="transition-modal-title" variant="h7">
              Fecha de fin:
            </Typography>
            <DatePicker
              selected={formValues.end}
              onChange={(event) => onDateChanged(event, "end")}
              dateFormat="Pp"
              className="dataPicker"
              showTimeSelect
              locale={"es"}
              timeCaption="Hora"
            />

            <Divider variant="middle" sx={{ mt: 2 }} />
            <br />
            <TextField
              style={{ width: "100%", margin: "5px" }}
              type="text"
              label="Titulo y notas"
              variant="outlined"
              value={formValues.title}
              name="title"
              error={titleError}
              onChange={onInputChanged}
            />
            <br />
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              style={{ width: "100%", margin: "5px" }}
              type="text"
              label="Descripcion del evento"
              value={formValues.notes}
              name="notes"
              onChange={onInputChanged}
              error={noteError}
            />

            <Button
              onClick={onSubmit}
              variant="outlined"
              sx={{ margin: "7px 0px 0px 4px" }}
              startIcon={<SaveIcon />}
            >
              Guardar
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
