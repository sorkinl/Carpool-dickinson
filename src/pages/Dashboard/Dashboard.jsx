import React from "react";
import DashboardNavbar from "../../components/Dashboard/DashboardNavbar";
import DashboardSideBar from "../../components/Dashboard/DashboardSideBar";
import DashboardMain from "../../components/Dashboard/DashboardMain";
import Profile from '../../components/Account/Profile/Profile'
import Setting from "../../components/Account/Setting";

const Dashboard = () => {
  return (
      <div className="container-dashboard">
        <DashboardNavbar/>
        <div className="content-dashboard">
          <DashboardSideBar/>
          <DashboardMain/>
        </div>
      </div>
  );
};

export default Dashboard;

