import './App.css';
import {
   BrowserRouter as Router,
   Route, 
   Routes
   } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Services from './pages/Services';

function App() {
  return (
    <Router>
      <ToastContainer/>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/services' element={<Services/>}/>


        <Route path='/register' element={<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;
