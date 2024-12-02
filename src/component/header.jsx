import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'boxicons';
import UserPicture from '../assets/images/user.png';
import { addYears } from 'date-fns';
import { DateRange } from 'react-date-range';

import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';

export default function Header() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('Germany - DEU');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCampaignType, setSelectedCampaignType] = useState('Digital');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: addYears(new Date(), 1),
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('api/data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        const processData = jsonData.map(item => ({
          ...item,
          start_date: item.start_date.split('T')[0],
          end_date: item.end_date.split('T')[0],
        }));
        setData(jsonData);
        console.log("Fetched Data ==>:", jsonData); // Add this line
        setFilteredData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDateInputClick = () => {
    setIsDatePickerOpen(!isDatePickerOpen);  // Toggle date picker visibility
  };

  const handleSelect = (ranges) => {
    console.log(ranges);
    setDateRange({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    });
  };
 
  const filterCampaigns = () => {
    const filtered = data.filter(item => {
      const campaignStartDate = new Date(item.start_date);
      const campaignEndDate = new Date(item.end_date);
  
      // Platform Match Check
      let platformMatches = false;
      if (selectedCampaignType === 'Both Digital & TV') {
        platformMatches = item.platform_type.Digital && item.platform_type.TV;
      } else if (selectedCampaignType === 'Digital') {
        platformMatches = item.platform_type.Digital;
      } else if (selectedCampaignType === 'TV') {
        platformMatches = item.platform_type.TV;
      }
  
      // Country and Brand Match (Case-insensitive and trimmed)
      const countryMatches = item.country_name.trim().toLowerCase() === selectedCountry.trim().toLowerCase();
      const brandMatches = selectedBrand === '' || item.product_name.trim().toLowerCase() === selectedBrand.trim().toLowerCase();
  
      // Debugging Output
      console.log('Selected Country:', selectedCountry, 'Item Country:', item.country_name);
      console.log('Selected Brand:', selectedBrand, 'Item Brand:', item.product_name);
      console.log('Selected Campaign Type:', selectedCampaignType, 'Platform Matches:', platformMatches);
      console.log('Date Range:', dateRange.startDate, '-', dateRange.endDate, 'Campaign Dates:', campaignStartDate, '-', campaignEndDate);
  
      // Check if campaign falls within the selected date range
      const dateMatches = campaignStartDate >= dateRange.startDate && campaignEndDate <= dateRange.endDate;
  
      // Return true if all conditions are met
      return (
        countryMatches &&
        brandMatches &&
        platformMatches &&
        dateMatches
      );
    });
  
    console.log('Filtered Data===>:', filtered);
    setFilteredData(filtered);
  };
  
  
    
  const selectionRange = {
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
    key: 'selection',
  };

  return (
    <section className="dashboard-wrapper">    
      
      <div className='container'>
        <div className='header-container'>
          <div className='header-logo'>
            <div className='logo-thumb'>
            <img src="/img/logo.png" alt="Logo" />
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
              <select className='select-bx' value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
  {data.map((item, index) => (
    <option key={index} value={item.country_name}>{item.country_name}</option>
  ))}
</select>
            </div>
            <div className='flex-col flex-col-2'>
              <label>Brand</label>
              <select className='select-bx' value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
  {data.map((item, index) => (
    <option key={index} value={item.product_name}>{item.product_name}</option>
  ))}
</select>
            </div>
            <div className='flex-col flex-col-3'>
              <label>Campaign</label>
              <select className='select-bx' value={selectedCampaignType} onChange={(e) => setSelectedCampaignType(e.target.value)}>
                <option value="Digital">Digital</option>
                <option value="Both Digital & TV">Both Digital & TV</option>
                <option value="TV">TV</option>
              </select>
            </div>
            <div className='flex-col flex-col-5'>
              <label>Start Date</label>
              <input 
                type='text' 
                placeholder='Select the date Range' 
                value={`${dateRange.startDate.toDateString()} - ${dateRange.endDate.toDateString()}`} 
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
              <button className='btn-search' id='searchBtn' onClick={filterCampaigns}>Search</button>
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
          {filteredData.map((mydata, index) => {
            let formatStartDate = new Date(mydata.start_date);
            let formatEndDate = new Date(mydata.end_date);
            return(
            
            <div className="campaign-row" key={index}>
              <div className="campaign-item">{mydata.campaign_name}</div>
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
