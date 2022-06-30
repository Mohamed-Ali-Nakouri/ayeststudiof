import React, {useEffect, useState ,Component} from 'react';
import ReactDOM from "react-dom";
import {PageHeader} from '../../components/page-headers/page-headers';
import {Main} from '../styled';
import api from "../../utility/api";
import {Spinner} from '../spinner/spinner'
import {Row, Col} from 'antd';
import {Cards} from "../cards/frame/cards-frame";
import FeatherIcon from "feather-icons-react";
import './addCampaign.css';
import {CREAT_CAMPAIGN} from "../../constants/endpoints";
import { Button,Space, Modal ,Input,Select} from 'antd';
import {useHistory} from "react-router-dom";

// const AddCampaign = () => {
//     const navigate = useHistory();
//     const [visibleModal, setVisibleModal] = useState(false);
//     const [confirmLoading, setConfirmLoading] = useState(false);
//
//     const showModal = () => {
//         setVisibleModal(true);
//     };
//
//
//
//
//     const handleCancel = () => {
//         setVisibleModal(false);
//     };
//     const [modal, contextHolder] = Modal.useModal();
//     const ReachableContext = React.createContext();
//     const [isLoading, setIsLoading] = useState(false);
//     const[visible,setVisible] = useState(false);
//     const[keySearch,setKeySearch] = useState(false);
//     //const[currentStep,setCurrentStep] = useState(1);
//     const [campaignData, setCampaignData] = useState({
//         currentStep:1,
//         email: "",
//         username: "",
//         password: "",
//         platform: 'android',
//         applicationUrl : "",
//         campaignType :'',
//         budget:'',
//         bid: '',
//         targetCountries: '',
//         downloadRate: '',
//         status: '',
//         identifier: '',
//         eventName : '',
//         eventConversionTime:'',
//         eventDescription:'',
//         trackingProvider:'',
//         redirectUrl: '',
//         keywordSets: '',
//     });
//     const [min,setMin] = useState(1);
//     const [max,setMax] = useState(5000);
//     const managed = ['cpi_managed','cpa_managed','cpc_managed','nicpi_managed']
//     const {currentStep, username,platform,applicationUrl,campaignType,budget,bid,targetCountries,downloadRate,status,identifier,eventName,eventConversionTime,eventDescription,trackingProvider,redirectUrl,keywordSets} = campaignData;
//
//
//
//     const handleChange = (e) => {
//         const {name, value} = e.target;
//
//         if(name ==='campaignType'){
//             if(['cpa','cpa_managed'].includes(value)){
//                 setVisible(true);
//             }else {
//                 setVisible(false);
//             }
//             if(['cpi_search','cpi_search_hr'].includes(value)){
//                 setKeySearch(true);
//             }else {
//                 setKeySearch(false);
//             }
//             if(managed.includes(value)){
//                 setMax(20000);
//                 setMax(500)
//             }else {
//                 setMax(5000);
//                 setMin(1);
//             }
//         }
//         if(name==='targetC') {
//             let options = e.target.options;
//             let val = '';
//             for (let i =0 ; i <options.length;i++){
//                 if(options[i].selected) {
//                     if(val!==''){
//                         val+=','
//                     }
//                     val+= options[i].value;
//                 }
//             }
//             setCampaignData({...campaignData, targetCountries: val})
//         }else {
//             setCampaignData({...campaignData, [name]: value});
//
//         }
//
//     }
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         const {...data} = campaignData;
//         if(!visible){
//             delete data.eventName;
//             delete data.eventDescription;
//             delete data.eventConversionTime;
//         }
//         if(!keySearch){
//             delete data.keywordSets;
//         }
//         api.post(CREAT_CAMPAIGN,data).then(res => {
//             console.log(res.data);
//             setIsLoading(false);
//             if(res.data.status === 'success') {
//                 navigate.push(`/admin/campaign-info/${res.data.campaignData.campaignId}`)
//             }
//             if(res.data.status === 'error') {
//                 console.log('error');
//                 modal.error({
//                     title: 'Error',
//                     content: (
//                         <>
//                             <ReachableContext.Consumer key="4">{name => `${res.data.errorMessage}`}</ReachableContext.Consumer>
//                         </>
//                     )
//                 });
//             }
//
//
//         })
//
//     }
//    // console.log(currentStep)
//
//     const _next = () => {
//         let currentStep = campaignData.currentStep;
//         currentStep = currentStep >= 2 ? 3 : currentStep + 1;
//         setCampaignData({...campaignData,currentStep:currentStep });
//     };
//     const _prev = () => {
//         let currentStep = campaignData.currentStep;
//         currentStep = currentStep <= 1 ? 1 : currentStep - 1;
//         setCampaignData({...campaignData,currentStep:currentStep });
//
//     };
//
//     function previousButton() {
//         let currentStep = campaignData.currentStep ;
//         if (currentStep !== 1) {
//             return (
//                 <div className="buttons button_space">
//                     <button type="button" className="back_button" onClick={_prev}>
//                         Previous
//                     </button>
//                 </div>
//             );
//         }
//         return null;
//     }
//     function nextButton() {
//         let currentStep = campaignData.currentStep;
//         if (currentStep < 2) {
//             return (
//                 <div className="buttons">
//                     <button className="next_button" type="button" onClick={_next}>
//                         Next Step
//                     </button>
//                 </div>
//             );
//         } else {
//             return (
//                 <div className="buttons">
//                     <button className="submit_button">Submit</button>
//                 </div>
//             );
//         }
//     }
//     function Step1(props) {
//         if (props.currentStep !== 1) {
//             return null;
//         }
//         return (
//             <div className="main active">
//                 <div className="form-group">
//                     <div className="text">
//                         <h2>Application Information</h2>
//                         <p></p>
//                     </div>
//                     <div className="input-text">
//                         <div className="input-div">
//                             <select name='platform' value={platform} onChange={handleChange}>
//                                 <option value="" defaultValue disabled>
//                                     Select Platform
//                                 </option>
//                                 <option value="Android">Android</option>
//                                 <option value="iOS">iOS</option>
//                             </select>
//                         </div>
//                         <div className="input-div">
//                             <input type="number" name='downloadRate' value={downloadRate} onChange={handleChange} required />
//                             <span>Download Rate</span>
//                         </div>
//                     </div>
//                     <div className="input-text">
//                         <div className="input-div">
//                             <input type="text" name='applicationUrl' value={applicationUrl} onChange={handleChange} required />
//                             <span>Application Url</span>
//                         </div>
//                         <div className="input-div">
//                             <input type="text" name='identifier' value={identifier} onChange={handleChange}  required />
//                             <span>Identifier</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
//
//     function Step2(props) {
//         if (props.currentStep !== 2) {
//             return null;
//         }
//         return (
//             <div className="main active">
//                 <div className="form-group">
//                     <div className="text">
//                         <h2>Campaign Information</h2>
//                     </div>
//                     <div className="input-text">
//                         <div className="input-div">
//                             <select name='campaignType' value={campaignType} onChange={handleChange}>
//                                 <option value="" selected disabled>
//                                     Campaign Type
//                                 </option>
//                                 <option value="cpi">CPI</option>
//                                 <option value="cpi_hr">CPI_HR</option>
//                                 <option value="cpi_managed">CPI_MANAGED</option>
//                                 <option value="incent_cpc">INCENT_CPC</option>
//                                 <option value="cpa">CPA</option>
//                                 <option value="cpa_managed">CPA_MANAGED</option>
//                                 <option value="cpi_search">CPI_SEARCH</option>
//                                 <option value="cpi_search_hr">CPI_SEARCH_HR</option>
//                                 <option value="cpc_managed">CPC_MANAGED</option>
//                                 <option value="nicpi_managed">NICPi_MANAGED</option>
//                             </select>
//                         </div>
//                         <div className="input-div">
//                             <select name="targetCountries"  value={targetCountries} onChange={handleChange}>
//                                 <option value="" selected disabled>
//                                     Target Countries
//                                 </option>
//                                 <option value="US">US</option>
//                                 <option value="ZZ">ZZ</option>
//                                 <option value="GB">GB</option>
//                                 <option value="CA">CA</option>
//                                 <option value="AU">AU</option>
//                                 <option value="DE">DE</option>
//                                 <option value="FR">FR</option>
//                                 <option value="IT">IT</option>
//                                 <option value="ES">ES</option>
//                                 <option value="NL">NL</option>
//                                 <option value="MX">MX</option>
//                                 <option value="IN">IN</option>
//                                 <option value="VN">VN</option>
//                                 <option value="JP">JP</option>
//                                 <option value="RU">RU</option>
//                                 <option value="PL">PL</option>
//                                 <option value="MY">MY</option>
//                                 <option value="AT">AT</option>
//                                 <option value="BR">BR</option>
//                                 <option value="PH">PH</option>
//                                 <option value="ID">ID</option>
//                                 <option value="CO">CO</option>
//                                 <option value="CZ">CZ</option>
//                                 <option value="RO">RO</option>
//                                 <option value="HK">HK</option>
//                                 <option value="GR">GR</option>
//                                 <option value="BG">BG</option>
//                                 <option value="RT">TR</option>
//                                 <option value="KR">KR</option>
//                                 <option value="PT">PT</option>
//                                 <option value="UA">UA</option>
//                                 <option value="HU">HU</option>
//                                 <option value="TH">TH</option>
//                                 <option value="VE">VE</option>
//                                 <option value="CH">CH</option>
//                                 <option value="SA">SA</option>
//                                 <option value="SG">SG</option>
//                                 <option value="TW">TW</option>
//                                 <option value="CL">CL</option>
//                                 <option value="MA">MA</option>
//                             </select>
//                         </div>
//                         <div className="input-div">
//                             <select name='status' value={status} onChange={handleChange}>
//                                 <option selected disabled>
//                                     Status
//                                 </option>
//                                 <option value="pending">Pending</option>
//                                 <option value="running">Running</option>
//                             </select>
//                         </div>
//                     </div>
//                     <div className="input-text">
//                         <div className="input-div">
//                             <input
//                                 type="number"
//                                 name="budget"
//                                 value={budget}
//                                 onChange={handleChange}
//                                 min={min}
//                                 max={max}
//                                 required
//                             />
//                             <span>Budget</span>
//                         </div>
//                         <div className="input-div">
//                             <input
//                                 type="number" name='bid' value={bid} onChange={handleChange} min={max/100000} max={max/1000} required
//                             />
//                             <span>Bid</span>
//                         </div>
//                     </div>
//                     <div className="input-text">
//                         <div className="input-div">
//                             <input
//                                 type="text"
//                                 name="trackingProvider"
//                                 value={trackingProvider}
//                                 onChange={handleChange}
//                                 required
//                             />
//                             <span>Tracking Provider</span>
//                         </div>
//
//                         <div className="input-div">
//                             <input
//                                 type="text"
//                                 name="redirectUrl"
//                                 value={redirectUrl}
//                                 onChange={handleChange}
//                             />
//                             <span>Redirect Url</span>
//                         </div>
//                     </div>
//                     <div className="input-text" hidden={!visible}>
//                         <div className="input-div">
//                             <input
//                                 type="text"
//                                 name="eventName"
//                                 value={eventName}
//                                 onChange={handleChange}
//                             />
//                             <span>Event Name</span>
//                         </div>
//
//                         <div className="input-div">
//                             <input
//                                 type="number"
//                                 name="eventConversationTime"
//                                 value={eventConversionTime}
//                                 onChange={handleChange}
//                             />
//                             <span>Event convertion Time</span>
//                         </div>
//                     </div>
//                     <div className="input-text" hidden={!visible}>
//                         <div className="input-div">
//                             <input
//                                 type="text"
//                                 name="eventDescription"
//                                 value={eventDescription}
//                                 onChange={handleChange}
//                             />
//                             <span>Event Description</span>
//                         </div>
//                     </div>
//                     <div className="input-text" hidden={!keywordSets}>
//                         <div className="input-div">
//                             <input
//                                 type="text"
//                                 name="keywordSets"
//                                 value={keywordSets}
//                                 onChange={handleChange}
//                             />
//                             <span>Keyword Sets</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
//     return (
//         <>
//             <div key="6" className="page-header-actions" onClick={showModal}>
//                 <Button size="small" key="4" type="primary" >
//                     <FeatherIcon icon="plus" size={14} />
//                     Add New
//                 </Button>
//             </div>
//             <Modal
//                 width={1000}
//                 title=""
//                 visible={visibleModal}
//                 footer={null}
//                 onOk={handleSubmit}
//                 confirmLoading={isLoading}
//                 onCancel={handleCancel}
//             >
//                 <div className="container">
//                     <div className="card">
//                         <div className="form">
//                             <div className="left-side">
//                                 <div className="left-heading">
//                                     <h3>Add New Campaign</h3>
//                                 </div>
//                                 <div className="steps-content">
//                                     <h3>Step <span className="step-number">1</span></h3>
//                                     <p className="step-number-content active">
//                                         Enter your application information.
//                                     </p>
//                                     <p className="step-number-content d-none">
//                                         Complete the campaign information.
//                                     </p>
//                                 </div>
//                                 <ul className="progress-bar">
//                                     <li className="active">Application Information</li>
//                                     <li>Campaign Information</li>
//                                 </ul>
//                             </div>
//                             <div className="right-side" id="root">
//                                 <div id="container">
//                                     <div className="App">
//                                         <form onSubmit={handleSubmit}>
//                                             <Step1
//                                                 currentStep={currentStep}
//                                                 handleChange={handleChange}
//                                                 identifier={identifier}
//                                                 applicationUrl={applicationUrl}
//                                                 downloadRate={downloadRate}
//                                                 platform={platform}
//
//                                             />
//                                             <Step2
//                                                 currentStep={currentStep}
//                                                 handleChange={handleChange}
//                                                 username={username}
//                                             />
//
//                                             <div className="buttons">
//                                                 {previousButton()}
//                                                 {nextButton()}
//                                             </div>
//                                         </form>
//                                     </div>
//
//
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//     {/*            <div className='register section__padding'>*/}
//     {/*                <div className="register-container">*/}
//     {/*                <Row*/}
//     {/*  gutter={{*/}
//     {/*    xs: 8,*/}
//     {/*    sm: 16,*/}
//     {/*    md: 24,*/}
//     {/*    lg: 32*/}
//     {/*  }}*/}
//     {/*>*/}
//     {/*  <Col className="" span={6}>*/}
//     {/*  <div className="register-formGroup">*/}
//     {/*         <select name='platform' value={platform} onChange={handleChange} >*/}
//     {/*             <option value='android'>Android</option>*/}
//     {/*              <option value='ios'>ios</option>*/}
//     {/*               </select>*/}
//
//     {/*     </div>*/}
//     {/*  </Col>*/}
//     {/*  <Col className="" span={6}>*/}
//     {/*  <div className="register-formGroup">*/}
//     {/* <Input type="text" name='applicationUrl' value={applicationUrl} onChange={handleChange} />*/}
//     {/*</div>*/}
//     {/*  </Col>*/}
//     {/*  <Col className="" span={6}>*/}
//     {/*  <div className="register-formGroup">*/}
//     {/*                           */}
//     {/*                            <select name='campaignType' value={campaignType} onChange={handleChange} >*/}
//     {/*                                <option value='cpi'>CPI</option>*/}
//     {/*                                <option value='cpi_hr'>CPI_HR</option>*/}
//     {/*                                <option value='cpi_managed'>CPI_MANAGED</option>*/}
//     {/*                                <option value='incent_cpc'>INCENT_CPC</option>*/}
//     {/*                                <option value='cpa'>CPA</option>*/}
//     {/*                                <option value='cpa_managed'>CPA_MANAGED</option>*/}
//     {/*                                <option value='cpi_search'>CPI_SEARCH</option>*/}
//     {/*                                <option value='cpi_search_hr'>CPI_SEARCH_HR</option>*/}
//     {/*                                <option value='cpc_managed'>CPC_MANAGED</option>*/}
//     {/*                                <option value='nicpi_managed'>NICPi_MANAGED</option>*/}
//     {/*                            </select>*/}
//
//     {/*                        </div>*/}
//     {/*  </Col>*/}
//     {/*  <Col className="gutter-row" span={6}>*/}
//     {/*  <div className="register-formGroup">*/}
//     {/*                            */}
//     {/*                            <input type="number" name='budget' value={budget} onChange={handleChange} min={min} max={max} required />*/}
//     {/*                        </div>*/}
//     {/*  </Col>*/}
//     {/*</Row>*/}
//     {/*                    <form className='register-writeForm' autoComplete='off' onSubmit={handleSubmit} >*/}
//     {/*                       /!* <div className="register-formGroup">*/}
//     {/*                            <label>Platform</label>*/}
//     {/*                            <select name='platform' value={platform} onChange={handleChange} >*/}
//     {/*                                <option value='android'>Android</option>*/}
//     {/*                                <option value='ios'>ios</option>*/}
//     {/*                            </select>*/}
//
//     {/*                        </div>*/}
//     {/*                        <div className="register-formGroup">*/}
//     {/*                            <label>Application URL</label>*/}
//     {/*                            <Input type="text" name='applicationUrl' value={applicationUrl} onChange={handleChange} />*/}
//     {/*</div>*/}
//     {/*                        <div className="register-formGroup">*/}
//     {/*                            <label>Campaign Type</label>*/}
//     {/*                            <select name='campaignType' value={campaignType} onChange={handleChange} >*/}
//     {/*                                <option value='cpi'>CPI</option>*/}
//     {/*                                <option value='cpi_hr'>CPI_HR</option>*/}
//     {/*                                <option value='cpi_managed'>CPI_MANAGED</option>*/}
//     {/*                                <option value='incent_cpc'>INCENT_CPC</option>*/}
//     {/*                                <option value='cpa'>CPA</option>*/}
//     {/*                                <option value='cpa_managed'>CPA_MANAGED</option>*/}
//     {/*                                <option value='cpi_search'>CPI_SEARCH</option>*/}
//     {/*                                <option value='cpi_search_hr'>CPI_SEARCH_HR</option>*/}
//     {/*                                <option value='cpc_managed'>CPC_MANAGED</option>*/}
//     {/*                                <option value='nicpi_managed'>NICPi_MANAGED</option>*/}
//     {/*                            </select>*/}
//
//     {/*                        </div>*!/*/}
//     {/*                        <div className="register-formGroup">*/}
//     {/*                            <label>Budget</label>*/}
//     {/*                            <input type="number" name='budget' value={budget} onChange={handleChange} min={min} max={max} required />*/}
//     {/*                        </div>*/}
//     {/*                        <div className="register-formGroup">*/}
//     {/*                            <label>Bid</label>*/}
//     {/*                            <input type="number" name='bid' value={bid} onChange={handleChange} min={max/100000} max={max/1000} required />*/}
//     {/*                        </div>*/}
//     {/*                        <div className="register-formGroup">*/}
//     {/*                            <label>Target countries</label>*/}
//     {/*                            <select name='targetC'  onChange={handleChange} multiple>*/}
//     {/*                                <option value='US'>US</option>*/}
//     {/*                                <option value='ZZ'>ZZ</option>*/}
//     {/*                                <option value='GB'>GB</option>*/}
//     {/*                                <option value='CA'>CA</option>*/}
//     {/*                                <option value='AU'>AU</option>*/}
//     {/*                                <option value='DE'>DE</option>*/}
//     {/*                                <option value='FR'>FR</option>*/}
//     {/*                                <option value='IT'>IT</option>*/}
//     {/*                                <option value='ES'>ES</option>*/}
//     {/*                                <option value='NL'>NL</option>*/}
//     {/*                                <option value='MX'>MX</option>*/}
//     {/*                                <option value='IN'>IN</option>*/}
//     {/*                                <option value='VN'>VN</option>*/}
//     {/*                                <option value='JP'>JP</option>*/}
//     {/*                                <option value='RU'>RU</option>*/}
//     {/*                                <option value='PL'>PL</option>*/}
//     {/*                                <option value='MY'>MY</option>*/}
//     {/*                                <option value='AT'>AT</option>*/}
//     {/*                                <option value='BR'>BR</option>*/}
//     {/*                                <option value='PH'>PH</option>*/}
//     {/*                                <option value='ID'>ID</option>*/}
//     {/*                                <option value='CO'>CO</option>*/}
//     {/*                                <option value='CZ'>CZ</option>*/}
//     {/*                                <option value='RO'>RO</option>*/}
//     {/*                                <option value='HK'>HK</option>*/}
//     {/*                                <option value='GR'>GR</option>*/}
//     {/*                                <option value='BG'>BG</option>*/}
//     {/*                                <option value='RT'>TR</option>*/}
//     {/*                                <option value='KR'>KR</option>*/}
//     {/*                                <option value='PT'>PT</option>*/}
//     {/*                                <option value='UA'>UA</option>*/}
//     {/*                                <option value='HU'>HU</option>*/}
//     {/*                                <option value='TH'>TH</option>*/}
//     {/*                                <option value='VE'>VE</option>*/}
//     {/*                                <option value='CH'>CH</option>*/}
//     {/*                                <option value='SA'>SA</option>*/}
//     {/*                                <option value='SG'>SG</option>*/}
//     {/*                                <option value='TW'>TW</option>*/}
//     {/*                                <option value='CL'>CL</option>*/}
//     {/*                                <option value='MA'>MA</option>*/}
//     {/*                            </select>*/}
//     {/*                        </div>*/}
//     {/*                        <div className="register-formGroup">*/}
//     {/*                            <label>Download rate</label>*/}
//     {/*                            <input type="number" name='downloadRate' value={downloadRate} onChange={handleChange} required />*/}
//     {/*                        </div>*/}
//
//     {/*                        <div className="register-formGroup">*/}
//     {/*                            <label>Status</label>*/}
//     {/*                            <select name='status' value={status} onChange={handleChange} >*/}
//     {/*                                <option value='pending'>pending</option>*/}
//     {/*                                <option value='running'>Running</option>*/}
//     {/*                            </select>*/}
//     {/*                        </div>*/}
//     {/*                        <div className="register-formGroup">*/}
//     {/*                            <label>Identifier</label>*/}
//     {/*                            <input type="text" name='identifier' value={identifier} onChange={handleChange}  required />*/}
//     {/*                        </div>*/}
//
//     {/*                        <div className="register-formGroup">*/}
//     {/*                            <label>trackingProvider</label>*/}
//     {/*                            <input type="text" name='trackingProvider' value={trackingProvider} onChange={handleChange}  />*/}
//     {/*                        </div>*/}
//     {/*                        <div className="register-formGroup">*/}
//     {/*                            <label>redirectUrl</label>*/}
//     {/*                            <input type="text" name='redirectUrl' value={redirectUrl} onChange={handleChange} required  />*/}
//     {/*                        </div>*/}
//     {/*                        <div className="register-formGroup" hidden={!visible}>*/}
//     {/*                            <label>Event Name</label>*/}
//     {/*                            <input type="text" name='eventName' value={eventName} onChange={handleChange}  />*/}
//     {/*                        </div>*/}
//     {/*                        <div className="register-formGroup" hidden={!visible}>*/}
//     {/*                            <label>Event conversation time</label>*/}
//     {/*                            <input type="number" name='eventConversationTime' value={eventConversionTime} onChange={handleChange}  />*/}
//     {/*                        </div>*/}
//     {/*                        <div className="register-formGroup" hidden={!visible}>*/}
//     {/*                            <label>Event description</label>*/}
//     {/*                            <textarea name='eventDescription' value={eventDescription} onChange={handleChange}   />*/}
//     {/*                        </div>*/}
//     {/*                        <div className="register-formGroup" hidden={!keySearch}>*/}
//     {/*                            <label>keyword Sets</label>*/}
//     {/*                            <input type="text" name='keywordSets' value={keywordSets} onChange={handleChange}  />*/}
//     {/*                        </div>*/}
//
//
//
//
//
//     {/*                        <div className="register-button">*/}
//
//     {/*                            /!*<div key="6" className="page-header-actions">*/}
//     {/*                                <Button size="small" key="4" type="primary" disabled={isLoading} onClick={handleSubmit}>*/}
//     {/*                                    <FeatherIcon icon="plus" size={14}/>*/}
//     {/*                                    Add New*/}
//     {/*                                </Button>*/}
//     {/*                            </div>*!/*/}
//     {/*                            {contextHolder}*/}
//     {/*                        </div>*/}
//     {/*                    </form>*/}
//     {/*                </div>*/}
//     {/*            </div>*/}
//
//             </Modal>
//         </>
//     )
//
// }
// export default AddCampaign;

const rootElement = document.getElementById("container");

class MasterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 1,
            email: "",
            username: "",
            password: "",
            platform: "android",
            applicationUrl: "",
            campaignType: "cpi",
            budget: "",
            bid: "",
            targetCountries: "",
            downloadRate: "",
            status: "pending",
            identifier: "",
            eventName: "",
            eventConversionTime: "",
            eventDescription: "",
            trackingProvider: "",
            redirectUrl: "",
            keywordSets: ""
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { email, username, password } = this.state;
        alert(`Your registration detail: \n 
           Email: ${email} \n 
           Username: ${username} \n
           Password: ${password}`);
    };

    _next = () => {
        let currentStep = this.state.currentStep;
        currentStep = currentStep >= 2 ? 3 : currentStep + 1;
        this.setState({
            currentStep: currentStep
        });
    };

    _prev = () => {
        let currentStep = this.state.currentStep;
        currentStep = currentStep <= 1 ? 1 : currentStep - 1;
        this.setState({
            currentStep: currentStep
        });
    };

    /*
     * the functions for our button
     */
    previousButton() {
        let currentStep = this.state.currentStep;
        if (currentStep !== 1) {
            return (
                <div className="buttons button_space">
                    <button type="button" className="back_button" onClick={this._prev}>
                        Previous
                    </button>
                </div>
            );
        }
        return null;
    }

    nextButton() {
        let currentStep = this.state.currentStep;
        if (currentStep < 2) {
            return (
                <div className="buttons">
                    <button className="next_button" type="button" onClick={this._next}>
                        Next Step
                    </button>
                </div>
            );
        } else {
            return (
                <div className="buttons">
                    <button className="submit_button">Submit</button>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="App">
                <form onSubmit={this.handleSubmit}>
                    <Step1
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        email={this.state.email}
                    />
                    <Step2
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        username={this.state.username}
                    />

                    <div className="buttons">
                        {this.previousButton()}
                        {this.nextButton()}
                    </div>
                </form>
            </div>
        );
    }
}

function Step1(props) {
    if (props.currentStep !== 1) {
        return null;
    }
    return (
        <div className="main active">
            <div className="form-group">
                <div className="text">
                    <h2>Application Information</h2>
                    <p></p>
                </div>
                <div className="input-text">
                    <div className="input-div">
                        <select name="platform" required>
                            <option value="" selected disabled>
                                Select Platform
                            </option>
                            <option value="Android">Android</option>
                            <option value="iOS">iOS</option>
                        </select>
                    </div>
                    <div className="input-div">
                        <input type="number" required />
                        <span>Download Rate</span>
                    </div>
                </div>
                <div className="input-text">
                    <div className="input-div">
                        <input type="text" required />
                        <span>Application Url</span>
                    </div>
                    <div className="input-div">
                        <input type="text" required />
                        <span>Identifier</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Step2(props) {
    if (props.currentStep !== 2) {
        return null;
    }
    return (
        <div className="main active">
            <div className="form-group">
                <div className="text">
                    <h2>Campaign Information</h2>
                </div>
                <div className="input-text">
                    <div className="input-div">
                        <select name="campaignType">
                            <option value="" selected disabled hidden>
                                Campaign Type
                            </option>
                            <option value="cpi">CPI</option>
                            <option value="cpi_hr">CPI_HR</option>
                            <option value="cpi_managed">CPI_MANAGED</option>
                            <option value="incent_cpc">INCENT_CPC</option>
                            <option value="cpa">CPA</option>
                            <option value="cpa_managed">CPA_MANAGED</option>
                            <option value="cpi_search">CPI_SEARCH</option>
                            <option value="cpi_search_hr">CPI_SEARCH_HR</option>
                            <option value="cpc_managed">CPC_MANAGED</option>
                            <option value="nicpi_managed">NICPi_MANAGED</option>
                        </select>
                    </div>
                    <div className="input-div">
                        <select name="targetCountries">
                            <option value="" selected disabled hidden>
                                Target Countries
                            </option>
                            <option value="US">US</option>
                            <option value="ZZ">ZZ</option>
                            <option value="GB">GB</option>
                            <option value="CA">CA</option>
                            <option value="AU">AU</option>
                            <option value="DE">DE</option>
                            <option value="FR">FR</option>
                            <option value="IT">IT</option>
                            <option value="ES">ES</option>
                            <option value="NL">NL</option>
                            <option value="MX">MX</option>
                            <option value="IN">IN</option>
                            <option value="VN">VN</option>
                            <option value="JP">JP</option>
                            <option value="RU">RU</option>
                            <option value="PL">PL</option>
                            <option value="MY">MY</option>
                            <option value="AT">AT</option>
                            <option value="BR">BR</option>
                            <option value="PH">PH</option>
                            <option value="ID">ID</option>
                            <option value="CO">CO</option>
                            <option value="CZ">CZ</option>
                            <option value="RO">RO</option>
                            <option value="HK">HK</option>
                            <option value="GR">GR</option>
                            <option value="BG">BG</option>
                            <option value="RT">TR</option>
                            <option value="KR">KR</option>
                            <option value="PT">PT</option>
                            <option value="UA">UA</option>
                            <option value="HU">HU</option>
                            <option value="TH">TH</option>
                            <option value="VE">VE</option>
                            <option value="CH">CH</option>
                            <option value="SA">SA</option>
                            <option value="SG">SG</option>
                            <option value="TW">TW</option>
                            <option value="CL">CL</option>
                            <option value="MA">MA</option>
                        </select>
                    </div>
                    <div className="input-div">
                        <select name="status">
                            <option defaultValue disabled hidden>
                                Status
                            </option>
                            <option value="pending">Pending</option>
                            <option value="running">Running</option>
                        </select>
                    </div>
                </div>
                <div className="input-text">
                    <div className="input-div">
                        <input
                            type="number"
                            name="budget"
                            value={props.budget}
                            onChange={props.handleChange}
                            required
                        />
                        <span>Budget</span>
                    </div>

                    <div className="input-div">
                        <input
                            type="number"
                            name="bid"
                            value={props.bid}
                            onChange={props.handleChange}
                            required
                        />
                        <span>Bid</span>
                    </div>
                </div>
                <div className="input-text">
                    <div className="input-div">
                        <input
                            type="text"
                            name="trackingProvider"
                            value={props.trackingProvider}
                            onChange={props.handleChange}
                            required
                        />
                        <span>Tracking Provider</span>
                    </div>

                    <div className="input-div">
                        <input
                            type="text"
                            name="redirectUrl"
                            value={props.redirectUrl}
                            onChange={props.handleChange}
                        />
                        <span>Redirect Url</span>
                    </div>
                </div>
                <div className="input-text" hidden={!props.visible}>
                    <div className="input-div">
                        <input
                            type="text"
                            name="eventName"
                            value={props.eventName}
                            onChange={props.handleChange}
                        />
                        <span>Event Name</span>
                    </div>

                    <div className="input-div">
                        <input
                            type="number"
                            name="eventConversationTime"
                            value={props.eventConversionTime}
                            onChange={props.handleChange}
                        />
                        <span>Event convertion Time</span>
                    </div>
                </div>
                <div className="input-text" hidden={!props.visible}>
                    <div className="input-div">
                        <input
                            type="text"
                            name="eventDescription"
                            value={props.eventDescription}
                            onChange={props.handleChange}
                        />
                        <span>Event Description</span>
                    </div>
                </div>
                <div className="input-text" hidden={!props.keySearch}>
                    <div className="input-div">
                        <input
                            type="text"
                            name="keywordSets"
                            value={props.keywordSets}
                            onChange={props.handleChange}
                        />
                        <span>Keyword Sets</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<MasterForm />, rootElement);
