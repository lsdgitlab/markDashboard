import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'boxicons';
import SelectDateRange from './dateRangeSelector'
import Logo from '../assets/images/logo.png';
import UserPicture from '../assets/images/user.png';

export default function CampaignFilter() {
  const [campaignList, setcampaignList ] = useState([]); 
  const [campaignData, setcampaignData] = useState([])
  const [allCampaignList, setAllCampaignList ] = useState([]) 
  // const [startDateNw, setStartDateNw] = useState(new Date()) 
  // const [endDateNw, setEndtDateNw] = useState(new Date()) 
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCampaignType, setSelectedCampaignType] = useState('');
  const [filteredData, setFilterData] = useState([]);
  const [dateRange, setDateRange] = useState({ startDate: new Date(), endDate: new Date() });

  // const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      axios.get('api/data.json')
           .then((res)=>{
            setAllCampaignList(res.data)
        })
    
    };
    fetchData();
    const fetchCamapignListData = async ()=>{
      try {
        const response = await axios.get('api/campaignData.json');
        const campaignData = response.data
        setcampaignData(campaignData);
        // const countryName = Object.keys(campaignData);
      } catch (error) {
        console.error('Error fetching campaign data:', error);
      }        
    }
    fetchCamapignListData()
  }, []);

  useEffect(()=>{
    if(selectedCountry && campaignData[selectedCountry]){
      setFilterData(campaignData[selectedCountry]);
      setSelectedBrand('');
      setSelectedCampaignType('')
    }
  },[selectedCountry, campaignData]);

  useEffect(()=>{
    if(filteredData.length >0){
      const initailBrand = filteredData[0].product_name;
      setSelectedBrand(initailBrand);
      const initialCampaignType = getCampaignTypeForBrand(initailBrand)
      setSelectedCampaignType(initialCampaignType)
    }

  },[filteredData])

 const getCampaignType = (platFromType)=>{
  if(platFromType.Digital && platFromType.TV){
    return "Both Digital & TV"
  }else if(platFromType.Digital){
    return "Digital"
  }else if(platFromType.TV){
    return "TV"
  }
 }

 const getCampaignTypeForBrand = (brand)=>{
  const brandData = filteredData.find(item => item.product_name === brand);
  return brandData ? getCampaignType(brandData.platform_type) : '';
 }

 useEffect(()=>{
if(selectedBrand){
  const campaignType = getCampaignTypeForBrand(selectedBrand);
  setSelectedCampaignType(campaignType)
}
 },[selectedBrand]);


  const handleDateSelect = (date) => {
    if (date.startDate && date.endDate) {
      setDateRange({
        startDate: date.startDate,
        endDate: date.endDate,
      });
      console.log("Date Range in CampaignFilter:", date); // Confirm selected date range in parent
    } else {
      console.error("Date range received in CampaignFilter is undefined:", date);
    }
  };
  
  const filterdData1 = () => {
    // console.log("Date Range:", dateRange);
    const filtered = allCampaignList.filter((campaign) => {
      const campaignDate = new Date(campaign.start_date);
      return campaignDate >= dateRange.startDate && 
             campaignDate <= dateRange.endDate;
    });
    // console.log("Filtered Campaign List:", filtered);
    setcampaignList(filtered);
  };


//    const handleSelect = (date)=>{  

//     setStartDateNw(date.selection.startDate);
//     setEndtDateNw(date.selection.endDate);  
//     let filterd = allCampaignList.filter((campaign)=>{
//         let campaignDate = new Date(campaign.start_date);
//         return campaignDate >= date.selection.startDate &&
//                 campaignDate <= date.selection.endDate
//     })
    
//     setcampaignList(filterd)
//  }
  
  // const selectionRange = {
  //   startDate: startDateNw,
  //   endDate: endDateNw,
  //   key: 'selection',
  // };

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
            <a href='!#' className='userAcc'>
              <img src={UserPicture} alt='Name'/>
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
    { Object.keys(campaignData).length > 0 && (
      <select className='select-bx' value={selectedCountry} onChange={(e)=> setSelectedCountry(e.target.value)}> 
      {Object.keys(campaignData).map((country, idx) =>(
         <option key={idx} value={country}>{country}</option>         
        ))}
      </select>
    )}
   
      
  
  </div>
  <div className='flex-col flex-col-2'>
  <label>Brand</label>              
 <select className='select-bx' value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
  {filteredData.map((item, index) =>(
    <option key={index} value={item.product_name}>{item.product_name}</option>    
  ))}

</select>
            </div>
            <div className='flex-col flex-col-3'>
              <label>Campaign</label>
              <select className='select-bx' value={selectedCampaignType} onChange={(e) => setSelectedCampaignType(e.target.value)}>
                {selectedBrand && (
                  <>
                  <option value={getCampaignTypeForBrand(selectedBrand)}>
                    {getCampaignTypeForBrand(selectedBrand)}
                  </option>
                  </>
                )}

      </select>
            </div>
            <SelectDateRange onSelectDateRange={handleDateSelect}/>           
              <div className='flex-col flex-col-6'>
                <button className='btn-search' id='searchBtn' onClick={filterdData1}>Search</button>
              </div>
          </div>
        </div>
        <div className="campaign-container">
        {campaignList.length > 0 && (
          <>              

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
              <>
             
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
            </>
          )})}</>

        )}   
        </div>
      </div>
    </section>
  );
}
