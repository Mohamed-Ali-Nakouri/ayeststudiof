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
import { Button,Space,Result,Spin, Modal, Alert,Input,Select} from 'antd';
import {useHistory} from "react-router-dom";



const AddCampaign = () => {
    const navigate = useHistory();
    const [visibleModal, setVisibleModal] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setVisibleModal(true);
    };




    const handleCancel = () => {
        clearState();
        setVisibleModal(false);
    };
    const [modal, contextHolder] = Modal.useModal();
    const ReachableContext = React.createContext();
    const [isLoading, setIsLoading] = useState(false);
    const[visible,setVisible] = useState(false);
    const[keySearch,setKeySearch] = useState(false);
    //const[currentStep,setCurrentStep] = useState(1);
    const initialState ={
        currentStep:1,
        platform: 'android',
        applicationUrl : "",
        campaignType :'cpi',
        budget:'',
        bid: '',
        targetCountries: '',
        downloadRate: '',
        status: 'pending',
        identifier: '',
        eventName : '',
        eventConversionTime:'',
        eventDescription:'',
        trackingProvider:'',
        redirectUrl: '',
        keywordSets: '',
    }
    const [campaignData, setCampaignData] = useState(initialState);

    const [min,setMin] = useState(1);
    const [max,setMax] = useState(5000);
    const managed = ['cpi_managed','cpa_managed','cpc_managed','nicpi_managed']
    const {currentStep,platform,applicationUrl,campaignType,budget,bid,targetCountries,downloadRate,status,identifier,eventName,eventConversionTime,eventDescription,trackingProvider,redirectUrl,keywordSets} = campaignData;
    


    const handleChange = (e) => {
        const {name, value} = e.target;

        if(name ==='campaignType'){

            if(['cpa','cpa_managed'].includes(value)){
                setVisible(true);
            }else {
                setVisible(false);
            }
            if(['cpi_search','cpi_search_hr'].includes(value)){
                setKeySearch(true);
            }else {
                setKeySearch(false);
            }
            if(managed.includes(value)){
                setMax(20000);
                setMax(500)
            }else {
                setMax(5000);
                setMin(1);
            }
        }
        if(name==='targetC') {
            let options = e.target.options;
            let val = "";
            for (let i =0 ; i <options.length;i++){
                if(options[i].selected) {
                    if(val!==""){
                        val+=','
                    }
                    val+= options[i].value;
                }
            }

            setCampaignData({...campaignData, targetCountries: val})

        }else {
            setCampaignData({...campaignData, [name]: value});

        }


    }
    const clearState = () => {
        setCampaignData({ ...initialState });
    };
    const handleSubmit = (e) => {

        e.preventDefault();
        setIsLoading(true);
        //console.log("entered submit");
        const {...data} = campaignData;
        if(!visible){
            delete data.eventName;
            delete data.eventDescription;
            delete data.eventConversionTime;
        }
        if(!keySearch){
            delete data.keywordSets;
        }
        api.post(CREAT_CAMPAIGN,data).then(res => {
            console.log(res);
            setIsLoading(false);
            if(res.data.status === 'success') {

                modal.success({
                    title: 'Campaign Created Successfully',
                    content:"Close this to go back to campaigns",
                    onOk: () => {handleCancel(),location.reload()}
                })
               // navigate.push(`/admin/campaign-info/${res.data.campaignId}`)
            }
            if(res.data.status === 'error') {
                //console.log('error');
                modal.error({
                    title: 'Error',
                    content: (<ReachableContext.Consumer key={11}>{name => `${res.data.errorMessage}`}</ReachableContext.Consumer> ),
                    onOk: () => {handleCancel()}}
                );
            }


        })

    }
   // console.log(currentStep)

    const _next = () => {
        let currentStep = campaignData.currentStep;
        currentStep = currentStep < 2 ? 2 : currentStep +1;
        setCampaignData({...campaignData,currentStep:currentStep });
    };
    const _prev = () => {
        let currentStep = campaignData.currentStep;
        currentStep = currentStep <= 1 ? 1 : currentStep - 1;
        setCampaignData({...campaignData,currentStep:currentStep });

    };
const neww=(e)=>{
    //console.log('entered newww')
    _next();
    handleSubmit(e);
}
    const previousButton =()=> {
        let currentStep = campaignData.currentStep ;
        if (currentStep === 1) {
          return (
            <div className="buttons">
            <button className="next_button" onClick={_next}>Next Step</button>
          </div>
          );
        } else if(currentStep === 2)
        {
          return (
            <div className="buttons button_space">
             <button  className="back_button" onClick={_prev}> Previous</button>
             <button type="submit" className="submit_button" onClick={neww} >Submit</button>
            </div>
          );
        }
        return null;
    }
    const  nextButton =() => {
        let currentStep = campaignData.currentStep;
        if (currentStep < 2) {
            return (
              <div class="buttons">
              <button className="next_button" type="button" onClick={_next}>Next Step</button>
          </div>
                    
                
            );
        } else {
            return (
                
                    <button className="submit_button">Submit</button>
            )           
        }
    }
    return (
        <>


            <div key="6" className="page-header-actions" onClick={showModal} >
                <Button size="small" key="4" type="primary" >
                    <FeatherIcon icon="plus" size={14} />
                    Add New
                </Button>
            </div>
            <Modal
                destroyOnClose={true}
                className="newModal"
                width={1000}
                title=""
                visible={visibleModal}
                footer={null}
                //onOk={handleSubmit}
                confirmLoading={isLoading}
                onCancel={handleCancel}
            >
                <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap" />
                <div className="container">
                    <div className="card">
                        <div className="form">
                            <div className="left-side">
                                <div className="left-heading">
                                    <h3>Add New Campaign</h3>
                                </div>
                                <div className="steps-content">
                                    <h3>Step <span className="step-number">1</span></h3>
                                    <p className="step-number-content active">
                                        Enter your application information.
                                    </p>
                                    <p className="step-number-content d-none">
                                        Complete the campaign information.
                                    </p>
                                </div>
                                <ul className="progress-bar">
                                    <li className="active">Application Information</li>
                                    <li>Campaign Information</li>
                                </ul>
                            </div>
                            <div className="right-side">
                                        <form onSubmit={handleSubmit}>
                                            {Step1()}
                                            {Step2()}
                                            {Step3()}
                                        </form>
                                {contextHolder}
                            </div>
                        </div>
                    </div>
                </div>

            </Modal>
        </>
    );
  function Step1() {
      if (currentStep !== 1) {
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
                          <select name='platform' value={platform} onChange={handleChange} required>
                              <option value="" defaultValue disabled>
                                  Select Platform
                              </option>
                              <option value="Android">Android</option>
                              <option value="iOS">iOS</option>
                          </select>
                      </div>
                      <div className="input-div">
                          <input type="number" name='downloadRate' value={downloadRate} onChange={handleChange} />
                          <span>Download Rate</span>
                      </div>
                  </div>
                  <div className="input-text">
                      <div className="input-div">
                          <input type="text" name='applicationUrl' value={applicationUrl} onChange={handleChange} required/>
                          <span>Application Url</span>
                      </div>
                      <div className="input-div">
                          <input type="text" name='identifier' value={identifier} onChange={handleChange}/>
                          <span>Identifier</span>
                      </div>
                  </div>
              </div>
              {previousButton()}
          </div>
         
      );
  }
  function Step2() {
      if (currentStep !== 2) {
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
                          <select key={9} name='campaignType' value={campaignType} onChange={handleChange}>
                              <option value="" defaultValue disabled>
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
                          <select key={10} name="targetC"  onChange={handleChange} multiple>
                              <option value="" defaultValue disabled>
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
                          <select name='status' value={status} onChange={handleChange}>
                              <option defaultValue disabled>
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
                              value={budget}
                              onChange={handleChange}
                              min={min}
                              max={max}
                              required
                          />
                          <span>Budget</span>
                      </div>
                      <div className="input-div">
                          <input
                              type="number" name='bid' value={bid} onChange={handleChange} min={max/100000} max={max/1000}/>
                          <span>Bid</span>
                      </div>
                  </div>
                  <div className="input-text">
                      <div className="input-div">
                          <input
                              type="text"
                              name="trackingProvider"
                              value={trackingProvider}
                              onChange={handleChange}
                          />
                          <span>Tracking Provider</span>
                      </div>
                      <div className="input-div">
                          <input
                              type="text"
                              name="redirectUrl"
                              value={redirectUrl}
                              onChange={handleChange}
                              />
                          <span>Redirect Url</span>
                      </div>
                     
                  </div>
                  <div className="input-text" hidden={!visible}>
                      <div className="input-div">
                          <input
                              type="text"
                              name="eventName"
                              value={eventName}
                              onChange={handleChange}
                          />
                          <span>Event Name</span>
                      </div>

                      <div className="input-div">
                          <input
                              type="number"
                              name="eventConversationTime"
                              value={eventConversionTime}
                              onChange={handleChange}
                          />
                          <span>Event convertion Time</span>
                      </div>
                  </div>
                  <div className="input-text" hidden={!visible}>
                      <div className="input-div">
                          <input
                              type="text"
                              name="eventDescription"
                              value={eventDescription}
                              onChange={handleChange}
                          />
                          <span>Event Description</span>
                      </div>
                  </div>
                  <div className="input-text" hidden={!keySearch}>
                      <div className="input-div">
                          <input
                              type="text"
                              name="keywordSets"
                              value={keywordSets}
                              onChange={handleChange}
                          />
                          <span>Keyword Sets</span>
                      </div>
                  </div>
              </div>
              {previousButton()}
          </div>
          
      );
  }
  function Step3() {
      if (currentStep !== 3) {
          return null;
      }

      return (

          <div className="main active"  >
              <div className="loader">Loading...</div>
              <div id="step3"><h1>Creating a new campaign</h1></div>
          </div>

      );

  }

}
export default AddCampaign;
