import { React } from "react";
// import Header from './header'
import CampaignFilter from "../component/campaignFilter";
import TopGlobalCampaign from "../component/TopGlobalCampaign"

export default function CampaignDashBorad() {
  return (
    <>
     {/* <h1>Campaign Dashborad</h1> */}
      <CampaignFilter />
      <TopGlobalCampaign />
      </>
  );
}
