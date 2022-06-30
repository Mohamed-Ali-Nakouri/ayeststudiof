import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const Dashboard = lazy(() => import('../../container/dashboard'));
const Campaigns = lazy(() => import('../../components/Campaigns/index'));
const CampaignInfo = lazy(() => import('../../components/campaignInfo/index'))
const ReportingModule = lazy(() => import('../../components/ReportingModule/reportingModule'));

const DashboardRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Dashboard} />
      <Route path={`${path}/Campaigns`} component={Campaigns} />
      <Route path = {`${path}/campaign-info/:id`} component={CampaignInfo}/>
      <Route path={`${path}/CampaignPerformActions`} component={Dashboard} />
      <Route path={`${path}/ReportingModule`} component={ReportingModule} />
    </Switch>
  );
};

export default DashboardRoutes;
