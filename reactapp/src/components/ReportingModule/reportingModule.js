import React, {useEffect, useState} from 'react';
import {Row, Col, Table, Button, Modal, Card, DatePicker,Collapse,Statistic,Badge, Descriptions } from 'antd';
import {PageHeader} from '../../components/page-headers/page-headers';
import {Cards} from '../../components/cards/frame/cards-frame';
import {Main} from '../styled';
import api from "../../utility/api";
import {Spinner} from "../spinner/spinner";
import AddCampaign from "../addCampaign/addCampaign";
import {useHistory} from "react-router-dom";
import {
    CAMPAIGN_LIST, GET_REPORTING_STATS, GET_TRAFFIC_ANALYSIS_REPORTING,
    PAUSE_A_CAMPAIGN,
    REACTIVE_A_CAMPAIGN,
    START_A_CAMPAIGN,
    TERMINATE_A_CAMPAIGN
} from "../../constants/endpoints";
import {DateRangePickerOne} from "../datePicker/datePicker";
import {Line} from "peity-react";
import {object} from "prop-types";
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const ReportingModule = () => {
    const getToday = () =>{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();


        return yyyy + '-' + mm + '-' + dd;
    }
    const navigate = useHistory();
    const [Campaigns, setCampaigns] = useState();
    const [cId, setCId] = useState('');
    const [modal, contextHolder] = Modal.useModal();
    const [loading, setLoading] = useState(true);
    const [statsModalVisible,setStatsModalVisible] = useState(false);
    const [trafficModalVisible,setTrafficModalVisible] = useState(false);
    const [startDate,setStartDate] = useState(getToday);
    const [endDate, setEndDate] = useState(getToday);
    const [isModelLoading, setIsModelLoading] = useState(false);
    const [trafficData,setTrafficData] = useState([]);
    const [statsData,setStatsData] = useState({clicks: 0,
        conversions: 0,
        cost: 0,
        downloads: 0,
        views: 0});
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
    useEffect(() => {
        api.get(CAMPAIGN_LIST).then(res => {
            setCampaigns(res.data)
            setLoading(false);
        })
    }, []);
    const handleTraffic = (id) => {
        setIsModelLoading(true);
        api.get(GET_TRAFFIC_ANALYSIS_REPORTING, {params:{campaignId:id,startDate:startDate,endDate:endDate}}).then(res => {
            setTrafficData(res.data.trafficAnalysis);

            setIsModelLoading(false);
        });

    }
    const handleStat = (id) => {
        setIsModelLoading(true);
        api.get(GET_REPORTING_STATS, {params:{campaignId:id,startDate:startDate,endDate:endDate}}).then(res => {
            setStatsData(res.data.summary);
            setIsModelLoading(false);
        });

    }
    const keys = [
        {
            title: 'campaign Id',
            dataIndex: 'campaignId',
            key: 'campaignId',
        },
        {
            title: 'app Name',
            dataIndex: 'appName',
            key: 'appName',
        },
        {
            title: 'campaign Type',
            dataIndex: 'campaignType',
            key: 'campaignType',
        },
        {
            title: 'platform',
            dataIndex: 'platform',
            key: 'platform',
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'info',
            dataIndex: 'campaignId',
            key:'info',
            render: (text,record) => (
                <Button type='primary' shape='circle' key={record.capmpaignId} onClick={() => navigate.push(`/admin/campaign-info/${record.campaignId}`)}><i className="fa fa-info" /></Button>
            )
        },
        {
            title: 'Stats',
            dataIndex: 'campaignId',
            key:'stats',
            render: (text,record) => (<Button type='primary' shape='circle' key={record.campaignId} onClick={() => {setCId(record.campaignId); setStatsModalVisible(true);handleStat(record.campaignId)}}>S</Button> )
        },
        {
            title: 'Traffic Analysis',
            dataIndex: 'campaignId',
            key:'traffic',
            render: (text,record) =>(<Button type='primary' shape='circle' key={record.campaignId} onClick={() => {setCId(record.campaignId); setTrafficModalVisible(true);handleTraffic(record.campaignId)}}>T</Button>)
        }
    ];
    return (
        <>
            {
                loading? (<Spinner/>):
                    <div>
                        <PageHeader
                            ghost
                            title={`Reporting Module Campaigns: ${Campaigns?.numCampaigns | 0} Total`}
                            buttons={[
                                <AddCampaign key="0"/>,
                            ]}
                        />
                        <Main>
                            <Row gutter={25}>
                                <Col lg={24} xs={24}>
                                    <Cards headless>
                                        <div style={{minHeight: 'calc(100vh - 320px)'}}>
                                        {/*    Start Date : <DatePicker key='start'  format='YYYY-MM-DD' onChange={startHandleChange}/> End Date : <DatePicker key='end'  format='YYYY-MM-DD' onChange={endHandleChange}/>*/}
                                            <Table dataSource={Campaigns?.campaignData} columns={keys} />
                                        </div>
                                    </Cards>
                                </Col>
                            </Row>
                        </Main>
                    </div>
            }
            <Modal
                title={`State Campaign Id ${cId}`}
                visible={statsModalVisible}
                onOk={() => {setStatsModalVisible(false)}}
                onCancel={() => {setStatsModalVisible(false)}}

            >
                {
                    isModelLoading?(<Spinner/>):

                        

                        <div>
                            <Descriptions title="" bordered>
                            <Descriptions.Item label="Views" span={2}>{statsData.views}</Descriptions.Item>
                            <Descriptions.Item label="Clicks" span={2}>{statsData.clicks}</Descriptions.Item>
                            <Descriptions.Item label="Downloads" span={2}>{statsData.downloads}</Descriptions.Item>
                            <Descriptions.Item label="Conversion" span={3}>{statsData.conversions}</Descriptions.Item>
                            <Descriptions.Item label="Cost" span={3}>{"$"+statsData.cost}</Descriptions.Item>
                            </Descriptions>
                        </div>
                }
            </Modal>
            <Modal
                width={1000}
                title={`Traffic Campaign Id ${cId}`}
                visible={trafficModalVisible}
                onCancel={() => {setTrafficModalVisible(false)}}
                onOk={() => {setTrafficModalVisible(false)}}

            >
                {
                    isModelLoading?(<Spinner/>):
                        <div >
                            {
                                trafficData.length === 0 ?(<h2>There is No traffic Analysis Data for this campaign</h2>):
                                    <div >
                                        {
                                            trafficData.map((object,i) => {
                                               
                                                return (
                                                    <Collapse defaultActiveKey={[0]} >
                                                    <Panel header={"Source :"+object.source} key={i}>
                                                           
                                               
                                                                    <Descriptions title="" bordered>
                                                                    <Descriptions.Item label="Source" span={2}>{object.source}</Descriptions.Item>
                                                                    <Descriptions.Item label="Sub" span={2}>{object.sub}</Descriptions.Item>
                                                                    <Descriptions.Item label="Impressions" span={2}>{object.impressions}</Descriptions.Item>
                                                                    <Descriptions.Item label="Clicks" span={2}>{object.clicks}</Descriptions.Item>
                                                                    <Descriptions.Item label="Conversions" span={2}>{object.conversions}</Descriptions.Item>
                                                                    <Descriptions.Item label="Conversion Time Minutes" span={1}>{object.meanConversionTimeMinutes}</Descriptions.Item>
                                                                    <Descriptions.Item label="Conversion Time Below 15s"span={2}>{object.conversionTimeBelow15s}</Descriptions.Item>
                                                                    <Descriptions.Item label="Conversion Time Below 30s"span={1}>{object.conversionTimeBelow30s}</Descriptions.Item>
                                                                    <Descriptions.Item label="Conversion Time Greater 1d"span={3}>{object.conversionTimeGreater1d}</Descriptions.Item>
                                                                    <Descriptions.Item label="Cost" span={3}>{"$"+object.costUsd}</Descriptions.Item>
                                                                    <Descriptions.Item label="Status" span={3}><Badge status="processing" text={object.status}/></Descriptions.Item>
                                                                    
                                                                  </Descriptions>
                                                   
                                                    </Panel>
                                                
                                                  </Collapse>
                                                )
                                            })
                                        }
                                    </div>
                            }
                        </div>
                }
            </Modal>

        </>
    );
}

export default ReportingModule;