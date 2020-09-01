import React from "react";
import HeaderBar from "../../components/Dashboard/HeaderBar";
import SideBar from "../../components/Dashboard/SideBar";
// import DashboardMain from "../../components/Dashboard/DashboardMain";
import Account from "../../components/Account/Account";
import PostTrip from "../../components/CreateTrip/PostTrip";
import EditProfile from "../../components/Account/Profile/EditProfile";
import PublicProfile from "../../components/PublicProfile/PublicProfile";

const Dashboard = () => {
  return (
      <div className="container-dashboard">
        <HeaderBar/>
        <SideBar/>
        {/* <div className="page-layout"> */}
              {/* <Account/> */}
              {/* <EditProfile/> */}
              {/* <PublicProfile/> */}
              {/* <PostTrip/> */}
              {/* <DashboardMain/> */}
        {/* </div> */}
      </div>
  );
};

export default Dashboard;

