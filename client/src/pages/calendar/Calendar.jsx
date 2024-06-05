import {
  Backdrop,
  Box,
  CircularProgress,
  Dialog,
  MenuItem,
  Popover,
  TextField,
} from "@mui/material";
import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import "../../css/calendar.css";
import { useEffect, useState } from "react";
import EventForm from "../../components/form/EventForm";
import { UseEmployee } from "../../context/EmployeeContext";
import { getEventsByEmployee } from "../../api/Events.js";
import EventModal from "../../components/modal/EventModal";

export default function Calendar() {
  const localizer = dayjsLocalizer(dayjs);
  const [eventsState, setEventsState] = useState({ data: [], isLoading: true });
  const [showForm, setShowForm] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const { event, getEmployeesAsLabels } = UseEmployee();

  useEffect(() => {
    const Events = event.map((ev) => ({
      ...ev,
      start: dayjs(ev.start).toDate(),
      end: dayjs(ev.end).toDate(),
    }));
    setEventsState({
      data: Events,
      isLoading: false,
    });
  }, [event]);

  const handleSelectSlot = ({ start, end }) => {
    setSelectedSlot({ start, end });
    setShowForm(true);
  };

  const handleSelectEvent = (event, e) => {
    setSelectedEvent(event);
    setAnchorEl(e.currentTarget);
    setShowPopover(true);
  };

  const handleEmployeeId = (employeeId) => {
    setSelectedEmployee(employeeId);
    if (employeeId === "All Employee") {
      const formattedEvents = event.map((ev) => ({
        ...ev,
        start: dayjs(ev.start).toDate(),
        end: dayjs(ev.end).toDate(),
      }));
      setEventsState({
        data: formattedEvents,
        isLoading: false,
      });
    } else {
      if (employeeId !== "") {
        getEventsByEmployee(employeeId)
          .then((response) => {
            setEventsState({
              data: response.data.map((ev) => ({
                ...ev,
                start: dayjs(ev.start).toDate(),
                end: dayjs(ev.end).toDate(),
              })),
              isLoading: false,
            });
          })
          .catch((error) => {
            console.error("Error fetching events:", error);
          });
      }
    }
  };
  

  const components = {
    event: ({ event }) => (
      <Box display="flex" justifyContent="center">
        {event.title}
      </Box>
    ),
    week: {
      event: () => (
        <Box display="flex" alignItems="center" justifyContent="center" ml={2}>
          {""}
        </Box>
      ),
    },
  };

  return (
    <>
      <Box component={"main"} px={2} height="100vh">
        <TextField
          sx={{textAlign:"center"}}
          select
          label="Filter by Employee"
          variant="outlined"
          margin="normal"
          fullWidth
          value={selectedEmployee}
          onChange={(e) => handleEmployeeId(e.target.value)}
        >
          <MenuItem value={"All Employee"}>
            All Employees
          </MenuItem>
          {getEmployeesAsLabels.map((employee) => (
            <MenuItem key={employee.value} value={employee.value}>
              {employee.label}
            </MenuItem>
          ))}
        </TextField>
        <BigCalendar
          localizer={localizer}
          events={eventsState.data}
          views={["month", "week"]}
          components={components}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
        />
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={eventsState.isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog open={showForm} onClose={() => setShowForm(false)} maxWidth="md">
        <EventForm
          onClose={() => setShowForm(false)}
          time={selectedSlot || { start: new Date(), end: new Date() }}
        />
      </Dialog>
      <Popover
        open={showPopover}
        anchorEl={anchorEl}
        onClose={() => setShowPopover(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <EventModal
          onClose={() => setShowPopover(false)}
          event={selectedEvent}
        />
      </Popover>
    </>
  );
}
