import './App.css';
import {
   BrowserRouter as Router,
   Route, 
   Routes
   } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceProvider from './pages/Register Admin';

function App() {
  return (
    <Router>
      <ToastContainer/>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/provider' element={<ServiceProvider/>}/>


        <Route path='/register' element={<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;
