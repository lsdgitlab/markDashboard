import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'boxicons';
import Logo from '../assets/images/logo.png';
import UserPicture from '../assets/images/user.png';
import { DateRange  } from 'react-date-range';
import { DateRangePicker  } from 'react-date-range';

import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';

export default function CampaignFilter() {
  const [campaignList, setcampaignList ] = useState([]); 
  const [campaignData, setcampaignData] = useState([]);
  const [allCampaignList, setAllCampaignList ] = useState([]);
  const [selectCountry, setSelectCountry] = useState("India");
  const [startDateNw, setStartDateNw] = useState(new Date()) 
  const [endDateNw, setEndtDateNw] = useState(new Date()) 
  

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      axios.get('api/data.json')
           .then((res)=>{
            // allCampaignList(res.data)
            setAllCampaignList(res.data)
        })
    
    };
    fetchData();
    const fetchCamapignListData = async ()=>{
      try {
        const response = await axios.get('api/campaignData.json');
        const data = response.data
        setcampaignData(data);
        const countries = Object.keys(data);
        console.log(countries);
        
      } catch (error) {
        console.error('Error fetching campaign data:', error);
      }        
    }
    fetchCamapignListData()
  }, []);

 
  // for(const country in campaignData){
  //   console.log(`Country : ${country}`);
  // }

  const handleDateInputClick = () => {
    setIsDatePickerOpen(!isDatePickerOpen);  // Toggle date picker visibility
  };
  const filterdData = (date)=>{
//     let filterd = allCampaignList.filter((campaign)=>{
//         let campaignDate = new Date(campaign["start_date"]);
//         return campaignDate >= date.selection.startDate &&
//                 campaignDate <= date.selection.endDate
//     })
//     setStartDateNw(date.selection.startDate);
//     setEndtDateNw(date.selection.endDate);
//     setcampaignList(filterd)
//     // return filterd

 }
   const handleSelect = (date)=>{    
    let filterd = allCampaignList.filter((campaign)=>{
        let campaignDate = new Date(campaign["start_date"]);
        return campaignDate >= date.selection.startDate &&
                campaignDate <= date.selection.endDate
    })
    setStartDateNw(date.selection.startDate);
    setEndtDateNw(date.selection.endDate);
    setcampaignList(filterd)

    // console.log(date);
 }
    
  const selectionRange = {
    startDate: startDateNw,
    endDate: endDateNw,
    key: 'selection',
  };

  return (
    <section className="dashboard-wrapper"> 
     <div className='container'>
        <div className='header-container'>
          <div className='header-logo'>
            <div className='logo-thumb'>
              <img src={Logo} alt="Logo" />
            </div>
            <span className='pageTitle'>Campaign Tracker</span>
          </div>
          <div className='U-profile'>
            <a href='javascript:void(0);' className='userAcc'>
              <img src={UserPicture} />
              <span>
                Hello! <span>Nishant Patil</span>
              </span>
            </a>
          </div>
        </div>
        <div className='search-container'>
          <h1>Search for Campaign</h1>
          <div className='flex'>
            <div className='flex-col flex-col-1'>
                     <label>Country</label>
{campaignData.length > 0 && ( 
<select className='select-bx' value={selectCountry} onChange={(e) => setSelectCountry(e.target.value)}>
   {Object.keys(campaignData.map((country, index)=>{
     <option key={index} value={country}>{country}</option>
   }))
    }
</select>
)}
            </div>
            <div className='flex-col flex-col-2'>
              <label>Brand</label>
 {/* <select className='select-bx' value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
  {data.map((item, index) => (
    <option key={index} value={item.product_name}>{item.product_name}</option>
  ))}
</select> */}
            </div>
            <div className='flex-col flex-col-3'>
              <label>Campaign</label>
              {/* <select className='select-bx' value={selectedCampaignType} onChange={(e) => setSelectedCampaignType(e.target.value)}>
                <option value="Digital">Digital</option>
                <option value="Both Digital & TV">Both Digital & TV</option>
                <option value="TV">TV</option>
              </select> */}
            </div>
            <div className='flex-col flex-col-5'>
              <label>Start Date</label>
              <input 
                type='text' 
                placeholder='Select the date Range' 
                // value={`${dateRange.startDate.toDateString()} - ${dateRange.endDate.toDateString()}`} 
                onClick={handleDateInputClick} 
                readOnly
              />
              <box-icon type="solid" name="calendar" color="white"></box-icon>
              {isDatePickerOpen && (
                <DateRange  
                  ranges={[selectionRange]} 
                  onChange={handleSelect} 
                />
              )}
            </div>
            <div className='flex-col flex-col-6'>
              <button className='btn-search' id='searchBtn' onClick={filterdData}>Search</button>
            </div>
          </div>
        </div>
        <div className="campaign-container">
          <div className="campaign-header">
            <div className="campaign-item">Campaign Name</div>
            <div className="campaign-item">Start Date</div>
            <div className="campaign-item">End Date</div>
            <div className="campaign-item">Platform</div>
            <div className="campaign-item">Spends</div>
            <div className="campaign-item">View Details</div>
          </div>
          {campaignList.map((mydata, index) => {
            let formatStartDate = new Date(mydata.start_date);
            let formatEndDate = new Date(mydata.end_date);
            return(
            
            <div className="campaign-row" key={index}>
              <div className="campaign-item">{mydata['campaign_name']}</div>
              <div className="campaign-item">{formatStartDate.toLocaleDateString()}</div>
              <div className="campaign-item">{formatEndDate.toLocaleDateString()}</div>
              <div className="campaign-item">Digital and TV</div>
              <div className="campaign-item">${mydata.spend.total_spend} Million</div>
              <div className="campaign-item view-details">
                <a href={mydata.viewDetailsLink} target="_blank" rel="noopener noreferrer">View Details</a>
              </div>
            </div>
          )})}
        </div>
      </div>
    </section>
  );
}
