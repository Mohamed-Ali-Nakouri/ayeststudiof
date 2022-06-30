export const GET_AUTH_TOKENS = `/api/AuthTokens`;
export const SEND_RESET_CODE = `/api/SendResetCode`;
export const VERIFY_CODE = `/api/VerifyCode`;
export const CHANGE_PASSWORD = `/api/ChangePassword`;
export const USER_DETAILS = `/api/UserDetails`;
export const CREATE_USER = `/api/CreateUser`;
export const MODIFY_API = `/api/ModifyApiKey`;
export const ACCOUNT_DETAILS = `/api/Account/GetAccountDetails`;
export const ACCOUNT_RATES = `/api/Account/GetRates`;
export const ACCOUNT_TRACKING_PROVIDER = `/api/Account/GetTrackingProviders`;
export const CREAT_CAMPAIGN = '/api/Campaign/AddCampaign';
export const CAMPAIGN_LIST = `/api/Campaign/GetCampaignsList`;
export const GET_A_CAMPAIGN = `/api/Campaign/GetACampaign`;
export const START_A_CAMPAIGN = `/api/Campaign/StartACampaign`;
export const PAUSE_A_CAMPAIGN = `/api/Campaign/PauseACampaign`;
export const TERMINATE_A_CAMPAIGN = '/api/Campaign/TerminateACampaign'
export const REACTIVE_A_CAMPAIGN = '/api/Campaign/ReactivateACampaign'
export const GET_CAMPAIGN_SUMMARY = `/api/Reporting/GetSummary`;
export const GET_CAMPAIGN_DAILY_SUMMARY = `/api/Reporting/GetSummaryDaily`;
export const GET_INSTALLATION_REPORTING = `/api/Reporting/GetInstallations`;
export const GET_REPORTING_STATS = `/api/Reporting/GetStats`;
export const GET_TRAFFIC_ANALYSIS_REPORTING = `/api/Reporting/GetTrafficAnalysis`;

export const AUTH_PAYLOAD = {
  grant_type: 'password',
  client_id: '6',
  client_secret: 'Jf8JxK279O7PwTC71llw8muEPYub4AylcljfCvdm',
};
