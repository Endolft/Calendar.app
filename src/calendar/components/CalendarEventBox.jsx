import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

export const CalendarEventBox = ({ event }) => {
  const { title, user } = event;
  return (
    <Grid container sx={{ heigth: "100%", flexDirection: "column" }}>
      <Typography color="initial">{title}</Typography>
      <Divider sx={{ color: "white" }} />

      <Typography>{user?.name}</Typography>
    </Grid>
  );
};
