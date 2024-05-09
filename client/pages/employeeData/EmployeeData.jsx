import { useState } from "react";
import {
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  Dialog,
  Box,
  IconButton,
} from "@mui/material";
import DatasetIcon from '@mui/icons-material/Dataset';
import DataForm from "../../components/form/DataForm";
import DataFormEdit from "../../components/form/DatFormEdit";
import { FONT_FAMILY } from "../../assets/fonts/FontFamily";
import { FORM_ITEM } from "../../data/Items";
import { UseEmployee } from "../../context/EmployeeContext";
import Alert from "../../components/alerts/Alert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const rowsPerPage = 5;

function EmployeeData() {
  const [page, setPage] = useState(0);
  const [showDataForm, setShowDataForm] = useState(false);
  const [showDataFormEdit, setShowDataFormEdit] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState();
  const { Employees, setEmployees, deleteEmployee, getEmployee } = UseEmployee();

  const handleAddData = () => {
    setShowDataForm(true);
  };

  const handleEditData = async(employeeId) => {
    setShowDataFormEdit(true);
    setCurrentEmployee(await getEmployee(employeeId));
  };
  
  const handleDeleteData = (employeeId) => {
    setSelectedEmployeeId([employeeId]); 
    setShowAlert(true);
  };

  const handleConfirmDelete = async () => {
    await Promise.allSettled(selectedEmployeeId.map(deleteEmployee));
    setSelectedEmployeeId([]);
    setShowAlert(false);
  };

  const handleSaveData = (employee) => {
    if (selectedEmployeeId.length === 1) {
      const updatedData = Employees.map((item) => {
        if (item.id === selectedEmployeeId[0]) {
          return {
            ...item,
            ...employee,
          };
        }
        return item;
      });
      setEmployees(updatedData);
      setShowDataFormEdit(false);
    } else {
      const newData = {
        ...employee,
      };
      setEmployees([...Employees, newData]);
    }
    setShowDataForm(false);
    setSelectedEmployeeId([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSelectData = (EmployeeId) => {
    if (selectedEmployeeId.includes(EmployeeId)) {
      setSelectedEmployeeId(selectedEmployeeId.filter((id) => id !== EmployeeId));
    } else {
      setSelectedEmployeeId([...selectedEmployeeId, EmployeeId]);
    }
  };

  const handleCloseDataForm = () => {
    setShowDataForm(false);
    setSelectedEmployeeId([]);
  };

  const handleCloseDataFormEdit = () => {
    setShowDataFormEdit(false);
    setSelectedEmployeeId([]);
  };

  return (
    <Box pl={{ xl: 22, lg: 22, md: 1, xs: 1 }}>
      <Grid container spacing={4} >
        <Grid item xl={12} xs={12} mt={1} bgcolor={"#339194"}>
        <Typography
            variant="h2"
            ml={5}
            pb={1}
            fontFamily={FONT_FAMILY}
            color={"#FFFFFF"}
            fontWeight={"bold"}
            display={"flex"}
            alignItems={"center"}
          >
            <DatasetIcon sx={{ fontSize: "inherit" }} />
            Employee Data
          </Typography>
        </Grid>
        <Grid item xl={12} xs={12}>
          <Typography fontSize={22} ml={2} variant="body2" fontFamily={FONT_FAMILY}>
            Here you will place the employee information into the database.
          </Typography>
        </Grid>
        <Grid item xl={12}  xs={12}>
              <Button onClick={handleAddData}>
                Add New Employee
              </Button>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#339194" }}>
                      {FORM_ITEM.map((item) => (
                        <TableCell key={item.id} sx={{ textAlign: "center" }}>
                          <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: FONT_FAMILY, color: "#FFFFFF" }}>
                            {item.Title}
                          </Typography>
                        </TableCell>
                      ))}
                      <TableCell align="center">
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: FONT_FAMILY, color: "#FFFFFF" }}>
                          Active
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: FONT_FAMILY, color: "#FFFFFF" }}>
                          Actions
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? Employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : Employees
                    ).map((employee) => (
                      <TableRow key={employee.DNI} hover onClick={() => handleSelectData(employee._id)}>
                        {FORM_ITEM.map((item) => (
                          <TableCell key={item.id} sx={{ textAlign: "center" }}>
                            <Typography variant="body1" sx={{ fontFamily: FONT_FAMILY, fontWeight: "bold" }} >
                              {employee[item.Name]}
                            </Typography>
                          </TableCell>
                        ))}
                        <TableCell align="center" sx={{ textAlign: "-webkit-center" }} >
                          <Box sx={{ width: 15, height: 15, borderRadius: "50%", backgroundColor: employee.Active ? "green" : "red" }} />
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display:"flex", justifyContent: "center" }} >
                            <IconButton onClick={() => handleEditData(employee._id)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteData(employee._id)}>
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={Employees.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                />
        </Grid>
      </Grid>
      <Dialog open={showDataForm} onClose={handleCloseDataForm}>
        <DataForm onSave={handleSaveData} onClose={handleCloseDataForm} />
      </Dialog>
      <Dialog open={showDataFormEdit} onClose={handleCloseDataFormEdit}>
        <DataFormEdit onSave={handleSaveData} onClose={handleCloseDataFormEdit} employee={currentEmployee} />
      </Dialog>
      <Alert
        open={showAlert}
        onClose={() => setShowAlert(false)}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}

export default EmployeeData;
