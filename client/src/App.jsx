import DrawerHome from '../pages/home/DrawerHome'
import Home from '../pages/home/Home'
import { Route, Routes } from "react-router-dom";
import Task from '../pages/task/Task'
import Header from '../components/header/Header'
import EmployeeData from '../pages/employeeData/EmployeeData';
import Calendar from '../pages/calendar/calendar'
import { EmployeeContext } from '../context/EmployeeContext'

function App() {

  return (
    <>
        <DrawerHome/>
        <Header/> 
        <EmployeeContext>
          <Routes>
            <Route
            path='/'
            element={<Home/>}
            />
            <Route
            path='/data'
            element={<EmployeeData/>}
            />
            <Route
            path='/task'
            element={<Task/>}
            />
            <Route
            path='/calendar'
            element={<Calendar/>}
            />
          </Routes>
        </EmployeeContext>
    </>
  )
}

export default App
