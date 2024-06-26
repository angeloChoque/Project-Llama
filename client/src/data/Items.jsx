import HomeIcon from "@mui/icons-material/Home";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import DatasetIcon from "@mui/icons-material/Dataset";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
export const ITEM = [
  {
    Title: "Home",
    SubTitle: "Home",
    content: "Here the employee's information is added",
    Icon: <HomeIcon />,
    Path: "/",
  },
  {
    Title: "Data",
    SubTitle: "Employee Data",
    content: "Add the employee's information here",
    Icon: <DatasetIcon />,
    Path: "/employees",
  },
  {
    Title: "Tasks",
    SubTitle: "Table Task",
    content: "Add the tasks to the employee here.",
    Icon: <PlaylistAddCheckIcon />,
    Path: "/tasks",
  },
  {
    Title: "Calendar",
    SubTitle: "Calendar",
    content: "Here you will find the employees' birthdays and events.",
    Icon: <CalendarMonthIcon />,
    Path: "/calendar",
  },
  {
    Title: "About",
    SubTitle: "About",
    content: "Here you will find information about how the page was made.",
    Icon: <AccountBoxIcon />,
    Path: "/about",
  },
];

export const FORM_ITEM = [
  {
    id: 1,
    Title: "DNI",
    Name: "DNI",
    grid: 4,
  },
  {
    id: 2,
    Title: "Name",
    Name: "Name",
    grid: 4,
  },
  {
    id: 3,
    Title: "Last Name",
    Name: "LastName",
    grid: 4,
  },
  {
    id: 4,
    Title: "Date of Birth",
    Name: "DateOfBirth",
    grid: 4,
    Type: "Date",
  },
  {
    id: 5,
    Title: "Salary",
    Name: "Salary",
    grid: 4,
    Type: "Number",
  },
  {
    id: 6,
    Title: "Phone",
    Name: "Phone",
    grid: 4,
  },
  {
    id: 7,
    Title: "Email",
    Name: "Email",
    grid: 7,
  },
  {
    id: 8,
    Title: "Position",
    Name: "Position",
    grid: 5,
  },
];

export const TABLE_CELL = [
  {
    id: 1,
    Title: "DNI",
    Name: "DNI",
    grid: 4,
  },
  {
    id: 2,
    Title: "Name",
    Name: "Name",
    grid: 4,
  },
  {
    id: 3,
    Title: "Last Name",
    Name: "LastName",
    grid: 4,
  },
  {
    id: 4,
    Title: "Phone",
    Name: "Phone",
    grid: 4,
  },
  {
    id: 5,
    Title: "Position",
    Name: "Position",
    grid: 5,
  },
];
