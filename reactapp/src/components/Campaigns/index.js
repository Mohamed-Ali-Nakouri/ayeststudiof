import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import {Row, Col, Table, Button, Modal, Input} from 'antd';
import FeatherIcon from 'feather-icons-react';
import {PageHeader} from '../../components/page-headers/page-headers';
import {Cards} from '../../components/cards/frame/cards-frame';
import {Main} from '../styled';
import api from "../../utility/api";
import {
    CAMPAIGN_LIST,
    PAUSE_A_CAMPAIGN,
    REACTIVE_A_CAMPAIGN,
    START_A_CAMPAIGN,
    TERMINATE_A_CAMPAIGN
} from "../../constants/endpoints";
import {Spinner} from "../spinner/spinner";
import AddCampaign from "../addCampaign/addCampaign";

const Campaign = () => {
    const [Campaigns, setCampaigns] = useState();
    const [cId, setCId] = useState('');
    const [visibleModal, setVisibleModal] = useState(false);
    const [loadings, setLoadings] = useState([]);
    const [budget, setBudget] = useState(0);
    const [reactiveIndex,setReactiveIndex] = useState(-1);
    const [reactiveLoading,setReactiveLoading] = useState(false);
    const handleChange = (e) => {
      setBudget(e.target.value);
    }
    const ReachableContext = React.createContext();
    const [isReactiveVisible, setIsReactiveVisible] = useState(false);
    const showModal = () => {
        setVisibleModal(true);
    };
    const handleReactive = () => {
        setReactiveLoading(true);
        api.post(REACTIVE_A_CAMPAIGN, {CampaignId:cId, addBudget:budget}).then(res => {
            if(res.data.status === 'error') {
                modal.error({
                    title: 'Error',
                    content: (
                        <>
                            <ReachableContext.Consumer key="0">{name => `${res.data.errorMessage}`}</ReachableContext.Consumer>
                        </>
                    )
                });
            }else if(res.data.status ==='success') {
                setIsReactiveVisible(true);
                modal.success(({
                    title:'Action Succeed',
                    content: (<>
                        <ReachableContext.Consumer key="1">{name => 'Action succeed' }</ReachableContext.Consumer>
                    </>)
                }))
            }
            stopLoading(reactiveIndex);
            setReactiveLoading(false);

        })
    }

    const handleCancel = () => {
        setVisibleModal(false);
    };
    const [modal, contextHolder] = Modal.useModal();
    const [loading, setLoading] = useState(true);
    const navigate = useHistory();
    useEffect(() => {
        api.get(CAMPAIGN_LIST).then(res => {
            setCampaigns(res.data)
            setLoading(false);
        })
    }, [])

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
            setReactiveIndex(index)
        }else {
            api.get(ACTION,{params: {CampaignId: cId}}).then(res => {
                if(res.data.status === 'error') {
                    modal.error({
                        title: 'Error',
                        content: (
                            <>
                                <ReachableContext.Consumer key="2">{name => `${res.data.errorMessage}`}</ReachableContext.Consumer>
                            </>
                        )
                    });
                }else if(res.data.status ==='success') {
                    modal.success(({
                        title:'Action Succeed',
                        content: (<>
                            <ReachableContext.Consumer key="3">{name => 'Action succeed' }</ReachableContext.Consumer>
                        </>)
                    }))
                }
                stopLoading(index)
            });
        }

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
            title: 'total Budget ($)',
            dataIndex: 'totalBudget',
            key: 'totalBudget',
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'total Downloads',
            dataIndex: '_totalDownloads',
            key: 'totalDownloads',
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
            title: 'action',
            dataIndex: 'campaignId',
            key:'action',
            render: (text,record) => (<Button type='primary' shape='circle' key={record.campaignId} onClick={() => {setCId(record.campaignId); setVisibleModal(true)}}>A</Button> )
        }
    ]
    return (
        <>
            {
                loading? (<Spinner/>):
                    <div>
                        <PageHeader
                            ghost
                            title={`Campaigns: ${Campaigns?.numCampaigns | 0} Total`}
                            buttons={[
                                <AddCampaign key="0"/>,
                            ]}
                        />
                        <Main>
                            <Row gutter={25}>
                                <Col lg={24} xs={24}>
                                    <Cards headless>
                                        <div style={{minHeight: 'calc(100vh - 320px)'}}>
                                            <Table dataSource={Campaigns?.campaignData} columns={keys} />
                                        </div>
                                    </Cards>
                                </Col>
                            </Row>
                        </Main>
                    </div>
            }
            <Modal
                title={`Campaign Id ${cId}`}
                visible={visibleModal}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button type="primary" loading={loadings[0]} onClick={() => campaignAction(START_A_CAMPAIGN,0)}>Start</Button>,
                    <Button type="primary" loading={loadings[1]} onClick={() => campaignAction(PAUSE_A_CAMPAIGN,1)} warning >Pause</Button>,
                    <Button type="primary" loading={loadings[2]} onClick={() => campaignAction(TERMINATE_A_CAMPAIGN,2)} danger>Terminate</Button>,
                    <Button type="primary" loading={loadings[3]} onClick={() => campaignAction(REACTIVE_A_CAMPAIGN,3)} danger>Reactivate </Button>
                ]}
            >
                <p>Choose action</p>
            </Modal>
            <Modal
                title={`Reactivate Campaign ${cId}`}
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

        </>
    );
};

export default Campaign;
