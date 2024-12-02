import axios from 'axios'
import {React, useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import 'boxicons';
import ActualSpendVsProjectedSpendsChart from '../charts/actualSpendsVsProjectedSpens'
import BusinessTrendVsPreviousYear from '../charts/BusinessTrendVsPreviousYear'


// export default function IndividualCampaign(){
//   const {id} = useParams()
//   const [viewCampaignDetails, setViewCapmaignDetails] = useState([])
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const fetchChartData = async () => {
//       try {
//         const res = await axios.get('/api/campaignData.json');
//         const data = res.data;
  
//         // Find the campaign by ID in each region's array
//         let campaignDetails = null;
//         for (const region in data) {
//           campaignDetails = data[region].find(campaign => campaign.id === id);
//           if (campaignDetails) break;
//         }
  
//         if (campaignDetails) {
//           setViewCapmaignDetails([campaignDetails]); // Set the campaign details
//         } else {
//           console.error('Campaign Data Not Found');
//         }
  
//       } catch (error) {
//         console.error('Error fetching campaign data:', error);
//       }
//     };
//     fetchChartData();
//   }, [id]);

// if(error){
//   return <p>{error}</p>
// }
// if(!viewCampaignDetails){
//   return <p>Loading...</p>
// }

// // {viewCapmaignDetails.map((campaignDetails, index)=>{
//   const formatStartDate = new Date(viewCapmaignDetails.start_date)
//   const formatEndDate = new Date(viewCapmaignDetails.end_date)
  
//   return(
// <div className="grid grid-rows-4 grid-flow-col gap-2 pb-5 pt-5 pr-4 pl-4 pb-4 text-sm" style={{ background: "white" }}>
//     <>
      
//   <div className="row-span-4 w-40">
//   <img src={viewCapmaignDetails.thumUrl} alt="Thumb" />    
//   </div>
//   <div className="row-span-2 col-span-3  ...">
    
//     <div className="flex flex-wrap">
//     <div className="flex flex-col w-4/5">
//       <div className="prd_name">
//         {viewCapmaignDetails.product_name}
//       </div>
//       <div className="camp_name">
//       {viewCapmaignDetails.campaign_name}
      
//       </div>
//       <div className="camp_name_duration">
//         <div className="flex flex-wrap">
//           <div className="flex-col location"><box-icon type='solid' name='map'></box-icon>{viewCapmaignDetails.country}</div>
//           <div className="flex-col duration">2 Months</div>
//         </div>
//       </div>
//     </div>
//     <div className="w-1/5">
//       <div className="flex-col spendAmout">${viewCapmaignDetails.total_spend} Million</div>
//       <div className="flex-col location">Total Spend</div>
//     </div>
//     </div>
//   </div>
//   <div className="row-span-2 col-span-3 content-center">
//   <div className="flex flex-row justify-between gap-5 max-w-full items-center">
//     <div className="">
//       <p>No Of Week</p>
//       <p>8 Weeks</p>
//     </div>
//     <div className="">
//       <p>Start Date</p>
//       <p>{formatStartDate.toLocaleDateString()}</p>
//     </div>
//     <div className="">
//       <p>End Date</p>
//       <p>{formatEndDate.toLocaleDateString()}</p>
//     </div>
//     <div className="">
//       <p>Platform</p>
//       <p>{viewCapmaignDetails.platform_type}</p>
//     </div>
    
//   </div>
//   </div>
//   <div className='flex felx-wrap'>
//     <h2>Campaign Objective</h2>
//     <p></p>
//   </div>
//   </>
//   <div className='flex felx-wrap'>
//     {/* <BusinessTrendVsPreviousYear/> */}
//   </div>
//   <div className='flex felx-wrap'>
//   {/* <ActualSpendVsProjectedSpendsChart /> */}
//   </div>
// </div>
//       )
   
// }
// // )}


 
// // }

export default function IndividualCampaign() {
  const [viewCampaignDetails, setViewCampaignDetails] = useState(null);
  const [regionName, setRegionName] = useState(""); // For storing the region name
  const { id } = useParams();
  const navigate = useNavigate() 

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await axios.get('/api/campaignData.json');
        const data = res.data;
        
        // Loop over the regions to find the campaign
        for (const [region, campaigns] of Object.entries(data)) {
          const campaign = campaigns.find(camp => camp.id === id);
          if (campaign) {
            setViewCampaignDetails(campaign);
            setRegionName(region); // Set the region name
            break;
          }
        }
      } catch (error) {
        console.error('Error fetching campaign data:', error);
      }
    };
    fetchChartData();
  }, [id]);

  const handleBack = () =>{
    navigate("/dashboard")
  }
  if (!viewCampaignDetails) {
    return <p>Loading campaign details...</p>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid Date" : date.toLocaleDateString();
  };

  // Render `platform_type` as a comma-separated string of platform names if it's an object
  const platformTypes = viewCampaignDetails.platform_type 
    ? Object.keys(viewCampaignDetails.platform_type).join(", ") 
    : "N/A";
    

  return (
    <>
    <div className="grid grid-rows-4 grid-flow-col gap-2 pb-5 pt-5 pr-4 pl-4 pb-4 text-sm" style={{ background: "white" }}>
      <button onClick={handleBack}>Back</button>
      <div className="row-span-4 w-40">
        <img src={viewCampaignDetails.thumUrl || "placeholder.jpg"} alt="Thumb" />
      </div>
      <div className="row-span-2 col-span-3">
        <div className="prd_name">{viewCampaignDetails.product_name || "N/A"}</div>
        <div className="camp_name">{viewCampaignDetails.campaign_name || "N/A"}</div>
        <div className="flex flex-wrap">
          <div className="location">
          
          <p>Country: {regionName}</p> {/* Using regionName as the country */}
            
            </div>
          <div className="spendAmout">Total Spend: ${viewCampaignDetails.spend.total_spend || "N/A"} Million</div>
        </div>
      </div>
      <div className="row-span-2 col-span-3 content-center">
        <div className="flex flex-row justify-between gap-5 max-w-full items-center">
          <div>Start Date: {formatDate(viewCampaignDetails.start_date)}</div>
          <div>End Date: {formatDate(viewCampaignDetails.end_date)}</div>
          <div>Platform: {platformTypes}</div>
        </div>
      </div>
    </div>
    <div className="grid grid-rows-4 grid-flow-col gap-2 pb-5 pt-5 pr-4 pl-4 pb-4 text-sm" style={{ background: "white" }}>
      <h1>Campaign Objective</h1>
      <p>{viewCampaignDetails.campaignObjective}</p>
    </div>
  <div className='flex felx-wrap'>
 <BusinessTrendVsPreviousYear/>
 </div>
<div className='flex felx-wrap'>
<ActualSpendVsProjectedSpendsChart 
    projectedSpend={viewCampaignDetails.projected_monthly_spend} 
    actualSpend={viewCampaignDetails.monthly_actual_spend} 
/>
 </div>
    </>
  );
}