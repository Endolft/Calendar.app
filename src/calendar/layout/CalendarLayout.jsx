import { Box } from "@mui/material";

import { Navbar } from "../components/Navbar";


export const CalendarLayout = ({children}) => {
  return (
    <Box container='true' sx={{ display: "flex" , flexDirection: "column" , width:'100%', height:'100%'}}>
        <Navbar/>
        {children}
    </Box>
  )
}
