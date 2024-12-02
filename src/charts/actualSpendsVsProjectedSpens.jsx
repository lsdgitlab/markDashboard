import {React} from 'react';
import { BarChart, Bar, Rectangle, CartesianGrid, XAxis, YAxis,Tooltip, Legend } from 'recharts';

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {


//       <div className="custom-tooltip">
//         <p className="label">{`${label} : ${payload[0].value}`}</p>
//         {/* <p className="intro">{getIntroOfPage(label)}</p> */}
//         <p className="desc">Anything you want can be displayed here.</p>
//       </div>

//   }
//   return null;

// }

export default function ActualSpendVsProjectedSpends ({projectedSpend, actualSpend}){
  const dataSpend = Object.keys(projectedSpend).map((month) => ({
    name: month,
    projectedSpends: parseInt(projectedSpend[month], 10),
    actualSpend: parseInt(actualSpend[month], 10),
}));

    return(
        <>
        <div className='container'>
        {/* <ResponsiveContainer width={"100%"} height={"100%"}> */}

        <BarChart
          width={1160}
          height={300}
          data={dataSpend}
          fill={'#ffffff'}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}

        >
          <CartesianGrid strokeDasharray="3 3" fill='#ffffff' />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="projectedSpends" fill="#fd0505" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="actualSpend" fill="#430080" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
        {/* </ResponsiveContainer> */}
            </div>
        </>
    )

    

}