import './scss/style.scss';
// import { HashRouter as HashRouter, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/login';
import CampaignDashBorad from './pages/CampaignDashboard';
import IndividualCampaign from './pages/IndividualCampaign';


function App() {
  return (
    <>
    
    {/* <HashRouter>  */}
    <Router> 
      <Routes>
        <Route exact path='/' element={ <Login />} />
        <Route path='/dashboard' element={ <CampaignDashBorad />} />
        {/* Dynamic route to load campaign details based on campaign ID */}
        <Route path="/campaign/:id" element={<IndividualCampaign />} />        
      </Routes>
    </Router>
    {/* </HashRouter> */}
    </>
  );
}

export default App;
