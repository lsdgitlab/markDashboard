import {React} from 'react';
import { LineChart , Line, CartesianGrid, XAxis, YAxis,Tooltip, Legend
 } from 'recharts';
const dataSpend = [
    {
        "name": "Jan",
        "2024": 4000,
        "2023": 2400,
        "amt": 2400
      },
      {
        "name": "Feb",
        "2024": 3000,
        "2023": 1398,
        "amt": 2210
      },
      {
        "name": "Mar",
        "2024": 2000,
        "2023": 9800,
        "amt": 2290
      },
      {
        "name": "Apr",
        "2024": 2780,
        "2023": 3908,
        "amt": 2000
      },
      {
        "name": "May",
        "2024": 1890,
        "2023": 4800,
        "amt": 2181
      },
      {
        "name": "Jun",
        "2024": 2390,
        "2023": 3800,
        "amt": 2500
      },
      {
        "name": "Jul",
        "2024": 3490,
        "2023": 4300,
        "amt": 2100
      },
      {
        "name": "Aug",
        "2024": 2000,
        "2023": 9800,
        "amt": 2290
      },
      {
        "name": "Sep",
        "2024": 2780,
        "2023": 3908,
        "amt": 2000
      },
      {
        "name": "Oct",
        "2024": 1890,
        "2023": 4800,
        "amt": 2181
      },
      {
        "name": "Nov",
        "2024": 2390,
        "2023": 3800,
        "amt": 2500
      },
      {
        "name": "Dec",
        "2024": 3490,
        "2023": 4300,
        "amt": 2100
      }
  ]



export default function BusinessTrendVsPreviousYear (){

    return(
        <>
        <div className='container'>
        {/* <ResponsiveContainer width="100%" height="100%"> */}

            <LineChart  width={730} height={250} data={dataSpend}  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
            <Line type="monotone" dataKey="2023" stroke="#8884d8" fill='#a5a5a5' stackId="1" />
            <Line type="monotone" dataKey="2024" stroke="#82ca9d" fill='#a5a5a5' stackId="1" />

            </LineChart >
            </div>
        {/* </ResponsiveContainer> */}
        </>
    )

}