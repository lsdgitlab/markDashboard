import axios from "axios";
import { React, useEffect, useState } from "react";
import 'boxicons';

export default function DashBoard() {

  const [topGlobalCampaign, setTopGlobalCampaign] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("Digital")

  useEffect(()=>{
    const fetchTopGlobalCampaign = async () =>{
      try{
        const response = await axios.get('api/campaignData.json');
        const topGlobalCampaign = response.data;

        const countryNames = Object.keys(topGlobalCampaign);
        const AllCampaign = [];

        countryNames.forEach((country)=>{
          const campaigns = topGlobalCampaign[country];
          campaigns.forEach((campaign)=>{
            AllCampaign.push({
              country,
              id : campaign.id,
              product_name : campaign.product_name,
              campaign_name : campaign.campaign_name,
              total_spend : campaign.spend.total_spend,
              start_date :campaign.start_date,
              end_date: campaign.end_date,
              thumUrl : campaign.thumUrl,
              viewDetailsLink : campaign.viewDetailsLink,
              platform_type : Object.keys(campaign.platform_type).join(', ')

            })
          })
        });

        const filterCampaign = AllCampaign
        .filter((campaign) => campaign.platform_type.includes(selectedPlatform))
        .sort((a,b) => b.total_spend - a.total_spend)
        .slice(0, 3);
        
        setTopGlobalCampaign(filterCampaign)
        console.log("Filter Campaign =>",filterCampaign);
      }catch(error){
        console.error('Error fetching campaign data:', error);
      }
    }
    fetchTopGlobalCampaign()
  },[selectedPlatform])

  const handlePlatformChange = (e)=>{
    setSelectedPlatform(e.target.value)
  }

  return (
    <>
      <section className="dashboard-wrapper">
        <div className="container">
          <div
            className="flex items-center justify-between flex-wrap p-6 mt-3"
            style={{ background: "white" }}
          >
            <div className="w-full block flex-grow sm:flex sm:items-center sm:w-auto">
              <div className="text-sm sm:flex-grow">
                <p className="block mt-4 sm:inline-block sm:mt-0 mr-4">
                  Top 3 Global Campaign
                </p>
                <a
                  href="http://localhost:3000/"
                  className="block mt-4 sm:inline-block sm:mt-0 mr-4 border rounded hover:border-transparent hover:text-blue-500"
                >
                  View All
                </a>
              </div>
              <div className="">
              <div className="inline-block text-sm px-4 py-2 leading-none border rounded border-white hover:border-transparent hover:text-blue-500 mt-4 md:mt-0"><p className="">Filter</p></div>
                
               

<div className="filter-options inline-block text-sm px-4 py-2 leading-none border rounded border-white hover:border-transparent hover:text-blue-500 mt-4 md:mt-0">
            <label>
              <input
                type="radio"
                name="platform"
                value="Digital"
                checked={selectedPlatform === "Digital"}
                onChange={handlePlatformChange}
              />
              Digital
            </label>
            <label>
              <input
                type="radio"
                name="platform"
                value="TV"
                checked={selectedPlatform === "TV"}
                onChange={handlePlatformChange}
              />
              TV
            </label>
          </div>

              </div>
            </div>
          </div>
{topGlobalCampaign.map((topSpendCampaign, index)=>{
  const formatStartDate = new Date(topSpendCampaign.start_date)
  const formatEndDate = new Date(topSpendCampaign.end_date)
  
  return(
<div key={index} className="grid grid-rows-4 grid-flow-col gap-2 pb-5 pt-5 pr-4 pl-4 pb-4 text-sm" style={{ background: "white" }}>
    <>
      
  <div className="row-span-4 w-40">
  <img src={topSpendCampaign.thumUrl} alt="Thumb" />    
  </div>
  <div className="row-span-2 col-span-3  ...">
    
    <div className="flex flex-wrap">
    <div className="flex flex-col w-4/5">
      <div className="prd_name">
        {topSpendCampaign.product_name}
      </div>
      <div className="camp_name">
      {topSpendCampaign.campaign_name}
      
      </div>
      <div className="camp_name_duration">
        <div className="flex flex-wrap">
          <div className="flex-col location"><box-icon type='solid' name='map'></box-icon>{topSpendCampaign.country}</div>
          <div className="flex-col duration">2 Months</div>
        </div>
      </div>
    </div>
    <div className="w-1/5">
      <div className="flex-col spendAmout">${topSpendCampaign.total_spend} Million</div>
      <div className="flex-col location">Total Spend</div>
    </div>
    </div>
  </div>
  <div className="row-span-2 col-span-3 content-center">
  <div className="flex flex-row justify-between gap-5 max-w-full items-center">
    <div className="">
      <p>No Of Week</p>
      <p>8 Weeks</p>
    </div>
    <div className="">
      <p>Start Date</p>
      <p>{formatStartDate.toLocaleDateString()}</p>
    </div>
    <div className="">
      <p>End Date</p>
      <p>{formatEndDate.toLocaleDateString()}</p>
    </div>
    <div className="">
      <p>Platform</p>
      <p>{topSpendCampaign.platform_type}</p>
    </div>
    <div className="">
     <a href={`/campaign/${topSpendCampaign.id}`}>View Details Report</a>
    </div>
  </div>
  </div>
  </>
</div>
      )
   
})}
        </div>
      </section>
    </>
  );
}
