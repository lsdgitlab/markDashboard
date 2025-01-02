import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { databases, ID } from './clients';

const dbconnection = ()=>{
    const [data, setData] = useState([]);

    useEffect(()=>{
        const fetchCampaignListData = async ()=>{
            try {
                const response = await axios.get('api/campaignData.json')                
            } catch (error) {
                
            }
        }
    })
}

return dbconnection
