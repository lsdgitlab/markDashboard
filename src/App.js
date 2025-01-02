import './scss/style.scss';
// import { HashRouter as HashRouter, Route, Routes } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/login';
import CampaignDashBorad from './pages/CampaignDashboard';
import IndividualCampaign from './pages/IndividualCampaign';
import Register from './pages/RegisterUser'



function App() {
  return (
    <>
    {/* <HashRouter>  */}
    <BrowserRouter> 
      <Routes>
        <Route exact path='/login' element={ <Login />} />
        <Route path='/dashboard' element={ <CampaignDashBorad />} />
        <Route path='/registeruser' element={ <Register />} />
        {/* Dynamic route to load campaign details based on campaign ID */}
        <Route path="/campaign/:id" element={<IndividualCampaign />} />        
      </Routes>
    </BrowserRouter>
    {/* </HashRouter> */}
    </>
  );
}

export default App;
