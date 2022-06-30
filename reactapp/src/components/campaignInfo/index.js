import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {PageHeader} from '../../components/page-headers/page-headers';
import {Main} from '../styled';
import api from "../../utility/api";
import {
    GET_A_CAMPAIGN,
    START_A_CAMPAIGN,
    PAUSE_A_CAMPAIGN,
    TERMINATE_A_CAMPAIGN,
    REACTIVE_A_CAMPAIGN
} from "../../constants/endpoints";
import {Button, Space, Modal, Input} from 'antd';
import FeatherIcon from "feather-icons-react";
import {Row, Col, Table} from 'antd';
import {Cards} from "../cards/frame/cards-frame";
import {Rings} from 'react-loader-spinner';
import {Spinner} from '../spinner/spinner'
import AddCampaign from "../addCampaign/addCampaign";
import { Card, List } from "antd";

const CampaignInfo = () => {
    const  [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadings, setLoadings] = useState([]);
    const [modal, contextHolder] = Modal.useModal();
    const {id} = useParams();
    const [budget, setBudget] = useState(0);
    const [reactiveIndex,setReactiveIndex] = useState(-1);
    const [reactiveLoading,setReactiveLoading] = useState(false);
    const handleChange = (e) => {
        setBudget(e.target.value);
    }
    const ReachableContext = React.createContext();
    const [isReactiveVisible, setIsReactiveVisible] = useState(false);
    const handleReactive = () => {
        setReactiveLoading(true);
        api.post(REACTIVE_A_CAMPAIGN, {CampaignId:id, addBudget:budget}).then(res => {
            if(res.data.status === 'error') {
                modal.error({
                    title: 'Error',
                    content: (
                        <>
                            <ReachableContext.Consumer key="5">{name => `${res.data.errorMessage}`}</ReachableContext.Consumer>
                        </>
                    )
                });
            }else if(res.data.status ==='success') {
                setIsReactiveVisible(false);
                modal.success(({
                    title:'Action Succeed',
                    content: (<>
                        <ReachableContext.Consumer key="6">{name => 'Action succeed' }</ReachableContext.Consumer>
                    </>)
                }))
            }
            setReactiveLoading(false);
            stopLoading(reactiveIndex);
        })
    }


    useEffect( () => {
        api.get(GET_A_CAMPAIGN,{params: {CampaignId: id}}).then(res => {
            setCampaign(res.data);
            setLoading(false);
        })
    },[]);
    const enterLoading = index => {
        setLoadings(prevLoadings => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
    }
    const stopLoading = index => {
        setLoadings(prevLoadings => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = false;
            return newLoadings;
        });
    }

    const campaignAction = (ACTION,index) => {
        enterLoading(index);
        if(ACTION === REACTIVE_A_CAMPAIGN) {
            setIsReactiveVisible(true);
            setReactiveIndex(index);
        }else {
            api.get(ACTION,{params: {CampaignId: id}}).then(res => {
                if(res.data.status === 'error') {
                    modal.error({
                        title: 'Error',
                        content: (
                            <>
                                <ReachableContext.Consumer key="6">{name => `${res.data.errorMessage}`}</ReachableContext.Consumer>
                            </>
                        )
                    });
                }else if(res.data.status ==='success') {
                    modal.success(({
                        title:'Action Succeed',
                        content: (<>
                            <ReachableContext.Consumer key="7">{name => 'Action succeed' }</ReachableContext.Consumer>
                        </>)
                    }))
                }
                stopLoading(index)
            });
        }

    }
    let fixedData = [];
    const fixedColumns = [
        {
          title: 'Attribute',
          dataIndex: 'title',
          fixed: true,
          width: 175,
        },
        {
          title: 'Value',
          dataIndex: 'value',
        },
      ];
    loading? (<Spinner />) :  fixedData = [
        {
          title: "App Name",
          value:campaign.campaignData.appName
        },
        {
          title: "Status",
          value:campaign.campaignData.status
        },
        {
          title: "Campaign Id",
          value:campaign.campaignData.campaignId
        },
        {
          title: "Platform",
          value:campaign.campaignData.platform
        },
        {
          title: "Campaign Type",
          value:campaign.campaignData.campaignType
        },
        {
          title: "Package Name",
          value:campaign.campaignData.packageName
        },
        {
          title: "Created at",
          value:campaign.campaignData.created
        },
        {
          title: "Target countries",
          value:campaign.campaignData.targetCountries
        },
        {
          title: "Reservations",
          value:campaign.campaignData.reservations
        },
        {
          title: "Tracking",
          value:campaign.campaignData.tracking
        },
        {
          title: "Total budget",
          value:campaign.campaignData.totalBudget+'$'
        },
        {
          title: "Remaining budget",
          value:campaign.campaignData.remainingBudget+'$'
        },
        {
          title: "Bid per conversion",
          value:campaign.campaignData.bidPerConversion+'$'
        },
        {
          title: "Total downloads",
          value:campaign.campaignData._totalDownloads
        },
        {
          title: "Remaining downloads",
          value:campaign.campaignData._remainingDownloads
        },
        {
          title: "Tokens per download",
          value:campaign.campaignData._tokensPerDownload
        },
        {
          title: "Limit strategy",
          value:campaign.campaignData.limitStrategy
        },
        {
          title: "Is Retention",
          value:campaign.campaignData.isRetention === 0 ? 'No' : 'Yes'
        },
        {
          title: "Is Managed",
          value:campaign.campaignData.isManaged === 0 ? 'No' : 'Yes'
        }
      ];
 
      
     // const fixedData = [];
    const centred = {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '6em'
    }
    const history = useHistory();

    return (
        <>{
            loading? (<Spinner />) :
            
            <div>
                <PageHeader
                    ghost
                    title='Campaign info'
                    buttons={[
                        <AddCampaign key="0"/>,
                    ]}
                />

                <Main>
                    <Row gutter={25}>
                        <Col lg={24} xs={24}>
                            <Cards headless>
                                <div style={{minHeight: 'calc(100vh - 320px)'}}>
                                    {

                                        campaign ? (
                                            
                                        
                                        <div>
                                            <Table
      columns={fixedColumns}
      dataSource={fixedData}
      pagination={false}
      scroll={{
        x: 100,
        y: 500,
      }}
      bordered
      
    />
    <br></br>
    
                                            <Space style={{ width: '100%', justifyContent: 'flex-end'}} >
                                                    <Button type="primary" loading={loadings[0]} onClick={() => campaignAction(START_A_CAMPAIGN,0)}>Start</Button>
                                                    <Button type="primary" loading={loadings[1]} onClick={() => campaignAction(PAUSE_A_CAMPAIGN,1)} warning >Pause</Button>
                                                    <Button type="primary" loading={loadings[2]} onClick={() => campaignAction(TERMINATE_A_CAMPAIGN,2)} danger>Terminate</Button>
                                                    <Button type="primary" loading={loadings[3]} onClick={() => campaignAction(REACTIVE_A_CAMPAIGN,3)} danger>Reactivate </Button>
                                            </Space>
                                            
                                            <Modal
                                                    title={`Reactivate Campaign ${id}`}
                                                    visible={isReactiveVisible}
                                                    onCancel={()=> setIsReactiveVisible(false)}
                                                    confirmLoading={reactiveLoading}
                                                    onOk={handleReactive}

                                                >
                                                    <div className="register-formGroup">
                                                        <label>Budget</label>
                                                        <Input type="text" name='budget' value={budget} onChange={handleChange} />
                                                    </div>
                                                </Modal>

                                                {contextHolder}
                                            </div>

                                        ) : <h1>No data</h1>
                                    }
                                </div>
                            </Cards>
                        </Col>
                    </Row>
                </Main>
            </div>
        }
        </>
    );


};
export default CampaignInfo;
