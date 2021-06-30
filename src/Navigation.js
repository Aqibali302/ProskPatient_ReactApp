import React from "react";

import { HashRouter as Router, Route, Link } from "react-router-dom";
import Demo from "./demo";
import App from "./App";
import App1 from "./App1";
import App2 from "./App2";
import App3 from "./App3";

import HomePage from "./HomePage";
import UserProfile from "./UserProfile";
import ReportsHeader from "./utilities/ReportsHeader";
import ReportsDepartment from "./utilities/ReportsDepartment";
import InitialsScreen from "./initials/InitialsScreen";
import SetupTwoFactor from "./SetupTwoFactor";

import MobileVerification from "./MobileVerification";
import EmailVerification from "./EmailVerification";
import EmailLogin from "./EmailLogin";
import ForgetPassword from "./ForgetPasswordEmail";
import ProvideInsuranceCardMain from "./ProvideInsuranceCardMain";

import F01Form from "./common/F01Form";
import F02Form from "./common/F02Form";
import F04Form from "./common/F04Form";
import F03Form from "./common/F03Form";
import SetupDashboard from "./SetupDashboard";
import D22Dashboard from "./dashboards/D22Dashboard";
import ProvideIDCard from "./ProvideIDCard";
import ProvideInsuranceCard from "./ProvideInsuranceCard";
import ProvideInsuranceCard2 from "./ProvideInsuranceCard2";
import ProvideInsuranceCard3 from "./ProvideInsuranceCard3";
import Consent1 from "./Consent1";
import Consent2 from "./Consent2";
import Consent3 from "./Consent3";
import Consent4 from "./Consent4";
import Consent5 from "./Consent5";
import Consent6 from "./Consent6";
import Consent7 from "./Consent7";
import Consent8 from "./Consent8";
import Consent9 from "./Consent9";
import Consent10 from "./Consent10";
import Survey from "./Survey";
import PMH from "./PMH";
import MedicationForm from "./MedicationForm";
import AllergiesForm from "./AllergiesForm";
import ThankyouPage from "./ThankyouPage";
import SurveyScore from "./SurveyScore";
import TwoFactorAuthentication from "./TwoFactorAuthentication";
import MenuPage from "./MenuPage";
import VideoChat from "./VideoChat";
import SurveyScoreReview from "./SurveyScoreReview";
import MeetingRoom from "./MeetingRoom";
import GetFacilitiesListData from "./GetFacilitiesListData";
import ProviderDataList from "./ProviderDataList";
import ProblemsDataList from "./ProblemsDataList";
import PrimaryCarePhysician from "./PrimaryCarePhysician";
import PrimaryCarepharmacy from "./PrimaryCarepharmacy";

function Navigation() {
  return (
    <Router basename={"/retailer"}>
      <Route exact path="/" component={App1} />
      <Route exact path="/1" component={App} />
      <Route exact path="/2" component={App2} />
      <Route exact path="/App3" component={App3} />
      <Route exact path="/demo/" component={Demo} />
      <Route exact path="/home/" component={HomePage} />
      <Route exact path="/UserProfile/" component={UserProfile} />
      <Route exact path="/R101/" component={ReportsHeader} />
      <Route exact path="/initials/" component={InitialsScreen} />
      <Route exact path="/MobileVerification/" component={MobileVerification} />
      <Route exact path="/EmailVerification/" component={EmailVerification} />
      <Route exact path="/EmailLogin/" component={EmailLogin} />
      <Route exact path="/SetupTwoFactor" component={SetupTwoFactor} />
      <Route exact path="/ResetPassword" component={ForgetPassword} />
      <Route exact path="/ReportsDepartment" component={ReportsDepartment} />
      <Route exact path="/SetupDashboard" component={SetupDashboard} />
      <Route exact path="/D22Dashboard" component={D22Dashboard} />
      <Route exact path="/ProvideIDCard" component={ProvideIDCard} />
      <Route exact path="/Consent1" component={Consent1} />
      <Route exact path="/Consent2" component={Consent2} />
      <Route exact path="/Consent3" component={Consent3} />
      <Route exact path="/Consent4" component={Consent4} />
      <Route exact path="/Consent5" component={Consent5} />
      <Route exact path="/Consent6" component={Consent6} />
      <Route exact path="/Consent7" component={Consent7} />
      <Route exact path="/Consent8" component={Consent8} />
      <Route exact path="/Consent9" component={Consent9} />
      <Route exact path="/Consent10" component={Consent10} />
      <Route exact path="/Survey" component={Survey} />
      <Route exact path="/PMH" component={PMH} />
      <Route exact path="/MedicationForm" component={MedicationForm} />
      <Route exact path="/AllergiesForm" component={AllergiesForm} />
      <Route exact path="/ThankyouPage" component={ThankyouPage} />
      <Route exact path="/SurveyScore" component={SurveyScore} />
      <Route exact path="/TwoFactorAuthentication" component={TwoFactorAuthentication} />
      <Route exact path="/MenuPage" component={MenuPage} />
      <Route exact path="/VideoChat" component={VideoChat} />
      <Route exact path="/MeetingRoom" component={MeetingRoom} />
      <Route exact path="/SurveyScoreReview" component={SurveyScoreReview} />
      <Route exact path="/ProvideInsuranceCardMain" component={ProvideInsuranceCardMain} />
      <Route exact path="/ProvideInsuranceCard" component={ProvideInsuranceCard}/>
      <Route exact path="/ProvideInsuranceCard2" component={ProvideInsuranceCard2}/>
      <Route exact path="/ProvideInsuranceCard3" component={ProvideInsuranceCard3}/>
      <Route exact path="/GetFacilitiesListData" component={GetFacilitiesListData}/>
      <Route exact path="/ProviderDataList" component={ProviderDataList}/>
      <Route exact path="/ProblemsDataList" component={ProblemsDataList}/>

      <Route exact path="/common/F01Form/" component={F01Form} />

      <Route exact path="/common/F02Form/" component={F02Form} />

      <Route exact path="/common/F03Form/" component={F03Form} />

      <Route exact path="/common/F04Form/" component={F04Form} />
      <Route exact path="/PrimaryCarePhysician" component={PrimaryCarePhysician} />
      <Route exact path="/PrimaryCarepharmacy" component={PrimaryCarepharmacy} />
    </Router>
  );
}
export default Navigation;
