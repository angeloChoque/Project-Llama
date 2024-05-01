import { Grid } from '@mui/material'
import DrawerHome from '../pages/home/DrawerHome'
import Home from '../pages/home/Home'
import { Route, Routes } from "react-router-dom";
import Task from '../pages/task/Task'
import OperatorData from '../pages/menuPage/OperatorData'
import Header from '../components/header/Header'

function App() {


  return (
    <Grid container >
      <DrawerHome/>
      <Header/> 
      <Routes>
        <Route
        path='/'
        element={<Home/>}
        />
        <Route
        path='/Data'
        element={<OperatorData/>}
        />
        <Route
        path='/task'
        element={<Task/>}
        />
      </Routes>
    </Grid>
  )
}

export default App
