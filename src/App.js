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
import UserFeedbackPage from './pages/UserFeedback';
import UserRoutes from './pages/Protected/UserRoutes';
import ProviderHome from './pages/Provider/ProviderHome';
import Profile from './pages/Profile';
import Favourites from './pages/Favourites';
import Requests from './pages/Requests';
import UpdateProfile from './pages/UpdateProfile';
import About_us from './pages/About_us';
import NotificationPage from './pages/NotificationPage';
import FaqPage from './pages/Faq';
import ProviderProfile from './pages/Provider/ProviderProfile';
import UpdateProviderProfile from './pages/Provider/UpdateProviderProfile';
import AdminPage from './pages/Admin/AdminPage';
import AdminRoutes from './pages/Protected/AdminRoutes';
import ProviderRoutes from './pages/Protected/ProviderRoutes';

function App() {
  return (
    <Router>
      <ToastContainer/>
      <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/provider' element={<ServiceProvider/>}/>

      <Route element={<UserRoutes/>}>
        <Route path='/home' element={<Home/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/notification' element={<NotificationPage/>}/>
        <Route path='/faq' element={<FaqPage/>}/>
        <Route path='/user/userFeedback/:id' element={<UserFeedbackPage/>}/>
        <Route path='/favourites' element={<Favourites/>}/>
        <Route path='/requests' element={<Requests/>}/>
        <Route path='/updateProfile' element={<UpdateProfile/>}/>
        <Route path='/about' element={<About_us/>}/>


      </Route>
      <Route element={<ProviderRoutes/>}>
      <Route path='/providerHome' element={<ProviderHome/>}/>
      <Route path='/providerProfile' element={<ProviderProfile/>}/>
      <Route path='/updateProviderProfile' element={<UpdateProviderProfile/>}/>
      

      </Route>

     
      <Route element={<AdminRoutes/>}>
        <Route path='/admin' element={<AdminPage/>}/>


      </Route>

      

      </Routes>
    </Router>
  );
}

export default App;
