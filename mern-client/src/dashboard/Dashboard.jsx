import React from "react";
import ApexChart from "./../components/ApexChart";
import AreaChart from "./../components/AreaChart";
import LineChart from "./../components/LineChart";
import DashHeaderCard from './../components/DashHeaderCard';

function Dashboard() {
  return (
    <div className="flex-col justify-center w-full">
      <DashHeaderCard />
      <div className="grid grid-cols-2 gap-5 py-7">
        <ApexChart />
        <AreaChart />
      </div>
      <div className="flex justify-center w-full">
        <LineChart />
      </div>
    </div>
  );
}

export default Dashboard;
