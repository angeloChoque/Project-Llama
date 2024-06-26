import {
  Box,
  Button,
  Dialog,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NotesIcon from "@mui/icons-material/Notes";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { UseEmployee } from "../../context/EmployeeContext";
import Alert from "../alerts/Alert";
import EventForm from "../form/EventForm";
import { EventTypeLabels } from "../../data/eventTypes";

const EventModal = ({ onClose, event }) => {
  const [employees, setEmployees] = useState([]);
  const { Employees, deleteEvent } = UseEmployee();
  const [showAlert, setShowAlert] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleConfirmDelete = () => {
    deleteEvent(event._id, () => {
      setShowAlert(false);
      onClose();
    });
  };

  const handleClosed = () => {
    setShowForm(false);
    onClose();
  };

  useEffect(() => {
    if (event.employeeIds && event.employeeIds.length > 0) {
      setEmployees(
        Employees.filter((employee) => event.employeeIds.includes(employee._id))
      );
    }
  }, [event.employeeIds, Employees]);

  return (
    <>
      <Box position="absolute" right={0} p={1}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box p={3} overflow={"hidden"}>
        <Typography pb={2} align="center" variant="h4">
          {event.title}
        </Typography>
        <Stack py={2} direction={"row"} gap={"0.65rem"} alignItems={"center"}>
          <AccessAlarmIcon />
          <Stack>
            <Typography>
              {dayjs(event.start).format("dddd, MMMM D, YYYY (h:mm A")} -{" "}
              {dayjs(event.end).format("h:mm A)")}
            </Typography>
          </Stack>
        </Stack>
        <Stack py={2} direction={"row"} gap={"0.65rem"} alignItems={"center"}>
          <GroupIcon />
          <Stack>
            <Typography style={{ whiteSpace: "pre-line" }}>
              {employees
                .map((employee, index) => {
                  const fullName = `${employee.Name.split(" ")[0]} ${
                    employee.LastName.split(" ")[0]
                  }`;
                  return index === 2 ? fullName + "\n" : fullName;
                })
                .join(", ")}
            </Typography>
          </Stack>
        </Stack>
        <Stack py={2} direction={"row"} gap={"0.65rem"} alignItems={"center"}>
          <CalendarMonthIcon />
          <Stack>
            <Typography>{EventTypeLabels[event.type]}</Typography>
          </Stack>
        </Stack>
        <Stack py={1} direction={"row"} gap={"0.65rem"} alignItems={"center"}>
          <LocationOnIcon />
          <Stack direction={"row"} gap={"4"} alignItems={"center"}>
            {event.location.length < 40 ? (
              <Typography
                component={Link}
                display="inline-block"
                href={event.locationUrl}
              >
                {event.location}
              </Typography>
            ) : (
              <Tooltip title={event.location} arrow>
                <Typography
                  component={Link}
                  display="inline-block"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  maxWidth={"40ch"}
                  href={event.locationUrl}
                >
                  {event.location}
                </Typography>
              </Tooltip>
            )}
          </Stack>
        </Stack>
        <Stack py={2} direction={"row"} gap={"0.65rem"} alignItems={"center"}>
          <NotesIcon />
          <Stack>
            <Typography>{event.description}</Typography>
          </Stack>
        </Stack>
        <Stack pt={2} spacing={2} direction="row" justifyContent="end">
          <Button
            variant="outlined"
            color="error"
            onClick={() => setShowAlert(true)}
          >
            Delete
          </Button>
          <Button variant="contained" onClick={() => setShowForm(true)}>
            Edit
          </Button>
        </Stack>
        <Alert
          dialog="Are you sure you want to delete this event?"
          open={showAlert}
          onClose={() => setShowAlert(false)}
          onConfirm={handleConfirmDelete}
        />
        <Dialog
          open={showForm}
          onClose={() => setShowForm(false)}
          maxWidth="md"
        >
          <EventForm
            onClose={handleClosed}
            time={{ start: new Date(), end: new Date() }}
            eventToEdit={event}
            closeForm={() => setShowForm(false)}
          />
        </Dialog>
      </Box>
    </>
  );
};

EventModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  event: PropTypes.object,
};

export default EventModal;

