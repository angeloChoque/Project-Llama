import DrawerHome from "../src/pages/home/DrawerHome";
import Home from "../src/pages/home/Home";
import {
  Box,
  Dialog,
  Fab,
  ListItemButton,
  ListItemIcon,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Header from "../src/components/header/Header";
import EmployeeData from "../src/pages/employeeData/EmployeeData";
import Calendar from "../src/pages/calendar/Calendar";
import { EmployeeContext } from "../src/context/EmployeeContext";
import InformationPage from "../src/pages/infoEmployee/InformationPage";
import TaskDragAndDrop from "../src/pages/task/TaskDragAndDrop";
import HelpIcon from "@mui/icons-material/Help";
import { useState } from "react";
import EmailDialog from "../src/components/alerts/EmailDialog";
import AboutPage from "./pages/aboutPage/AboutPage";

function App() {
  const [showPopover, setShowPopover] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const handlePopper = (e) => {
    setAnchorEl(e.currentTarget);
    setShowPopover((prev) => !prev);
  };

  return (
    <>
      <DrawerHome>
        <Stack sx={{ bgcolor: "rgb(255, 165, 0)" }}>
          <Typography
            textAlign={"center"}
            pb={0.5}
            fontSize={18}
            color={"white"}
          >
            Wait for the API response. This may take 2 to 3 minutes.{" "}
          </Typography>
        </Stack>
        <Header />
        <EmployeeContext>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employees" element={<EmployeeData />} />
            <Route path="/tasks" element={<TaskDragAndDrop />} />
            <Route path="/employees/:id" element={<InformationPage />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </EmployeeContext>
        <Fab
          color="primary"
          style={{ position: "absolute", bottom: 16, right: 35 }}
          onClick={handlePopper}
        >
          <HelpIcon />
        </Fab>
        <Popover
          sx={{ transform: "translate(-30px, -5px)" }}
          open={showPopover}
          anchorEl={anchorEl}
          onClose={() => setShowPopover(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Box width={"230px"}>
            <ListItemButton
              sx={{ py: 1.5 }}
              onClick={() => setShowDialog(true)}
            >
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              Contact
            </ListItemButton>
          </Box>
          <Dialog
            open={showDialog}
            onClose={() => setShowDialog(false)}
            maxWidth="xs"
          >
            <EmailDialog onclose={() => setShowDialog(false)} />
          </Dialog>
        </Popover>
      </DrawerHome>
    </>
  );
}

export default App;
