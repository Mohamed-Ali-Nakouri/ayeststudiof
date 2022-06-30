import React,{useEffect,useState} from 'react';
import {Row, Col, DatePicker, Modal,Descriptions} from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import SampleCardSix from '../../components/cards/sampleCard/SampleCardSix';
import {useHistory} from "react-router-dom";
import AddCampaign from "../../components/addCampaign/addCampaign";
import api from "../../utility/api";
import styled from 'styled-components';
import {
    GET_CAMPAIGN_DAILY_SUMMARY,
    GET_CAMPAIGN_SUMMARY,
    GET_TRAFFIC_ANALYSIS_REPORTING
} from "../../constants/endpoints";
import {Spinner} from "../../components/spinner/spinner";

const Dashboard = () => {
    const history = useHistory();
    const getToday = () =>{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();


        return yyyy + '-' + mm + '-' + dd;
    }
    
    const getMonth = () =>{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth()).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
       // console.log(yyyy + '-' + mm + '-' + dd)

        return yyyy + '-' + mm + '-' + dd;
    }
    const [loading, setLoading] = useState(true);
    const [summaryModalVisible,setSummaryModalVisible] = useState(false);
    const [dailyModalVisible,setDailyModalVisible] = useState(false);
    const [startDate,setStartDate] = useState(getToday);
    const [endDate, setEndDate] = useState(getToday);
    const [isModelLoading, setIsModelLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [identifier,setIdentifier] = useState('');
    const [dailyData,setDailyData] = useState([]);
   
    const initialSummaryData={
        activeCampaigns: 0,
        clicks: 0,
        conversionRate: 0,
        conversions: 0,
        impressions: 0,
        installs: 0,
        runningCampaigns: 0
    };
    const [summaryData,setSummaryData] = useState(initialSummaryData);
    const [monthlySummaryData,setMonthlySummaryData] = useState(initialSummaryData);

    const startHandleChange =(value) => {
        var today = value._d
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        setStartDate(yyyy + '-' + mm + '-' + dd);
    }
    const endHandleChange = (value) => {
        var today = value._d
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        setEndDate(yyyy + '-' + mm + '-' + dd);
    }
    const handleSummary = () => {
        setSummaryModalVisible(true);
        setIsModelLoading(true);
        api.get(GET_CAMPAIGN_SUMMARY, {params:{identifier:identifier,startDate:startDate,endDate:endDate}}).then(res => {
            //console.log(res.data);
            setSummaryData(res.data.statistics);

            setIsModelLoading(false);
        });

    }

    const getSummary = async () => {
        setIsLoading(true);
        let data=await api.get(GET_CAMPAIGN_SUMMARY, {params:{identifier:identifier,startDate:getMonth(),endDate:endDate}})
        setMonthlySummaryData(data.data.statistics);
        setIsLoading(false);
        //return data.data.statistics;
    }
    const handleDaily = () => {
        setDailyModalVisible(true)
        setIsModelLoading(true);
        api.get(GET_CAMPAIGN_DAILY_SUMMARY, {params:{identifier:identifier,startDate:startDate,endDate:endDate}}).then(res => {
            setDailyData(res.data.statistics);
            setIsModelLoading(false);
        });
    }
    const handleIdentifier = (e) => {
        setIdentifier(e.target.value);
    }
    
    useEffect(() => {
        getMonth();
        (async () => {
            
        await getSummary();
           
          })();
    },[]);



    const CardWrapper = styled.figure`
  display: flex;
  margin: 0;
  position: relative;
  h2,
  p {
    margin: 0;
  }
  figcaption {
    .more {
      position: absolute;
      top: 0px;
      ${({ theme }) => (theme.rtl ? 'left' : 'right')}: 0;
      a {
        color: ${({ theme }) => theme['extra-light-color']};
      }
    }
    h2 {
      font-size: 20px;
      font-weight: 600;
    }
    p {
      font-size: 14px;
      color: ${({ theme }) => theme['light-color']};
    }
  }
`;

const Icon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, className }) => theme[`${className}-color`]};
  ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 20px;
`;
const showDashboard = ()=>{
  
    return (
        <>
        {
       isLoading?(<Spinner/>):
    
        <div>
           <PageHeader
                ghost
                title="Dashboard"
                buttons={[<AddCampaign key="0" />]}
            />
            <Main>
                <Row gutter={25}>
                    
                <Col  xxl={6} md={8} sm={12} xs={24}>
                <Cards key={1} headless>
                    <CardWrapper>
                        <Icon className={"primary"}>
                            <img src={require(`./static/img/icon/1.svg`)} alt="" />
                                        </Icon>
                <figcaption>
          <div className="more">
          </div>
          <h2>{monthlySummaryData.activeCampaigns}</h2>
          <p>Active Campaigns</p>
        </figcaption>
      </CardWrapper>
    </Cards>
                </Col>
                <Col  xxl={6} md={8} sm={12} xs={24}>
                <Cards key={2} headless>
                    <CardWrapper>
                        <Icon className={"secondary"}>
                            <img src={require(`./static/img/icon/2.svg`)} alt="" />
                                        </Icon>
                <figcaption>
          <div className="more">
          </div>
          <h2>{summaryData.runningCampaigns}</h2>
          <p>Running Campaigns</p>
        </figcaption>
      </CardWrapper>
    </Cards>
                </Col>
                <Col  xxl={6} md={8} sm={12} xs={24}>
                <Cards key={3} headless>
                    <CardWrapper>
                        <Icon className={"success"}>
                            <img src={require(`./static/img/icon/3.svg`)} alt="" />
                                        </Icon>
                <figcaption>
          <div className="more">
          </div>
          <h2>{monthlySummaryData.impressions}</h2>
          <p> Impressions</p>
        </figcaption>
      </CardWrapper>
    </Cards>
                </Col>
                <Col  xxl={6} md={8} sm={12} xs={24}>
                <Cards key={4} headless>
                    <CardWrapper>
                        <Icon className={"warning"}>
                            <img src={require(`./static/img/icon/4.svg`)} alt="" />
                                        </Icon>
                <figcaption>
          <div className="more">
          </div>
          <h2>{monthlySummaryData.clicks}</h2>
          <p>Clicks</p>
        </figcaption>
      </CardWrapper>
    </Cards>
                </Col>
                <Col lg={24} xs={24}>
                        <Cards key={5} headless>
                            <div style={{ minHeight: 'calc(100vh - 320px)' }}>
                                Start Date : <DatePicker key='start'  format='YYYY-MM-DD' onChange={startHandleChange}/> End Date : <DatePicker key='end'  format='YYYY-MM-DD' onChange={endHandleChange}/>
                                <div style={{marginTop: 20}}>
                                    Identifier: <input type='text' onChange={handleIdentifier} style={{
                                        marginLeft:'20,    width: 100',
                                    boxSizing: 'borderBox',
                                    border: '2px solid #ccc',
                                    borderRadius: 4,
                                    fontSize: 16,
                                    backgroundColor: 'white',
                                    backgroundPosition: '10px 10px',
                                    backgroundRepeat: 'no-repeat',
                                    padding: '12px 20px 12px 40px',
                                    color: 'black'}}/>
                                </div>
                                <div style={{marginTop: 20,display: 'flex', justifyContent:'flex-end'}} >
                                    <Button type="primary" size="small" key="7" onClick={handleSummary}style={{marginRight: 20,marginLeft: 20}}>
                                        Summary
                                    </Button>
                                    <Button type="primary" size="small" key="8" onClick={handleDaily} style={{marginRight: 20}}>
                                        Daily Summary
                                    </Button>
                                </div>
                            </div>
                            
                            <Modal
                                title={`Summary Stats`}
                                visible={summaryModalVisible}
                                onOk={() => {setSummaryModalVisible(false)}}
                                onCancel={() => {setSummaryModalVisible(false)}}

                            >
                                {
                                    isModelLoading?(<Spinner/>):
                                        <div>
                                            {
                                                summaryData&&(
                                                <div>
                                                <Descriptions title="" bordered>
                                                    <Descriptions.Item label="Active Campaigns" span={3}>{summaryData.activeCampaigns}</Descriptions.Item>
                                                    <Descriptions.Item label="Running Campaigns" span={2}>{summaryData.runningCampaigns}</Descriptions.Item>
                                                    <Descriptions.Item label="Impressions" span={2}>{summaryData.impressions}</Descriptions.Item>
                                                    <Descriptions.Item label="Clicks" span={2}>{summaryData.clicks}</Descriptions.Item>
                                                    <Descriptions.Item label="Installs" span={2}>{summaryData.installs}</Descriptions.Item>
                                                    <Descriptions.Item label="ConversionRate" span={2}>{summaryData.conversionRate}</Descriptions.Item>
                                                    <Descriptions.Item label="Conversions" span={3}>{summaryData.conversions}</Descriptions.Item>
                                                </Descriptions>
                                                </div>)
                                            }

                                        </div>
                                }
                            </Modal>

                            <Modal
                                title={`Daily Summary Stats`}
                                visible={dailyModalVisible}
                                onOk={() => {setDailyModalVisible(false)}}
                                onCancel={() => {setDailyModalVisible(false)}}

                            >
                                {
                                    isModelLoading?(<Spinner/>):
                                        <div>
                                            {
                                                dailyData.length ===0 ?(<h2>There is no data</h2>):

                                                Object.keys(dailyData).map((key)=> {
                                                    return (
                                                        <div key={key}>
                                                        <Descriptions title="" bordered>
                                                            <Descriptions.Item label="Date" span={3}>{key}</Descriptions.Item>
                                                            <Descriptions.Item label="Impressions" span={2}>{dailyData[key].impressions}</Descriptions.Item>
                                                            <Descriptions.Item label="Clicks" span={2}>{dailyData[key].clicks}</Descriptions.Item>
                                                            <Descriptions.Item label="Installs" span={2}>{dailyData[key].installs}</Descriptions.Item>
                                                            <Descriptions.Item label="ConversionRate" span={2}>{dailyData[key].conversionRate}</Descriptions.Item>
                                                            <Descriptions.Item label="Conversions" span={3}>{dailyData[key].conversions}</Descriptions.Item>
                                                        </Descriptions>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <ul>
                                            </ul>
                                        </div>
                                }
                            </Modal>
                        </Cards>
                        
                </Col>
                </Row>
            </Main>
            </div>
}
        </>
    );
};
   return showDashboard();
};

export default Dashboard;
