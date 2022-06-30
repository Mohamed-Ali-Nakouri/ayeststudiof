import React, { useState ,useEffect} from 'react';
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {Col, Form, Input, Button, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { AuthWrapper } from './style';
import { useDispatch, useSelector } from 'react-redux';
import Heading from '../../../../components/heading/heading';
import { SendResetCode, VerifyCode, ChangePassword } from '../../../../redux/authentication/actionCreator';
import { Steps, Step } from '../../../../components/steps/steps';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import actions from '../../../../redux/events/actions';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";
const amount = "2";
const currency = "USD";
const style = {"layout":"vertical"};


const {nextStep} = actions
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.loading);
  const LoginError = useSelector(state => state.auth.error);
  const Code = useSelector(state => state.auth.code);
  const [form] = Form.useForm();
  const history = useHistory();


  
  const [state, setState] = useState({
    current: 0,
    next: 0,
    prev: 0,
    values: null,
    otp: '' ,
    email:'',});


    const next = currentValue => {
      setState({ ...state, next: currentValue });
    };
  
    const prev = currentValue => {
      setState({ ...state, prev: currentValue });
    };

  useEffect(() => {
    if (LoginError)
    {
      notification.error({
        message: LoginError.error,
        description: LoginError.message,
      });
    } else if(Code)
    {
      notification.success({
        message: Code.code,
        description: Code.message,
      });
    }
      
  }, [LoginError,Code]);
  
  const handleSubmit = values => {
    handleSendCode(values);
    setState({ ...state,email: values.email});
  };

  const handleCodeVerification = values => {
    dispatch(VerifyCode(values.code));
    setState({ ...state, otp:values.code });
  };
  const handleChangePassword = values => {
    dispatch(ChangePassword(state.email,values.password,values.confirm));

  }
  
  const handleSendCode =(values) =>{
    dispatch(SendResetCode(values.email));
  } 



  return (
    <AuthWrapper>

      <Col md={24} sm={24} xs={24}>
            <Cards title="Forget Password" caption="">
              <Steps
                isswitch
                steps={[
                  {
                    title: 'Confirm Email',
                    content: (      <div className="auth-contents">
                      <PayPalScriptProvider options={{ "client-id": "AZgs3BHLg_t06HOYJFo4NyBen0oGY5kTb6_CfVDd1VuCB7epYpmVRsTfxXRKlspROKTJR6Kqn-oevnfY" }}/>
                      <PayPalButtons style={{ layout: "horizontal" }} />
                      <PayPalScriptProvider/>
                      <div style={{ maxWidth: "750px", minHeight: "200px" }}>
                        <PayPalScriptProvider
                            options={{
                              "client-id": "AZgs3BHLg_t06HOYJFo4NyBen0oGY5kTb6_CfVDd1VuCB7epYpmVRsTfxXRKlspROKTJR6Kqn-oevnfY",
                              components: "buttons",
                              currency: "USD"
                            }}
                        >
                          <ButtonWrapper
                              currency={currency}
                              showSpinner={false}
                          />
                        </PayPalScriptProvider>
                      </div>
                    <Form name="forgotPass" onFinish={handleSubmit} layout="vertical">
                      <Heading as="h3">Forgot Password?</Heading>

                      <p className="forgot-text">
                        Enter the email address you used when you joined and we’ll send you a code to reset your password.
                      </p>
                      <Form.Item
                        label="Email Address"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                      >
                        <Input placeholder="name@example.com" />
                      </Form.Item>
                      <Form.Item>
                        <Button className="btn-reset" htmlType="submit" type="primary" size="large">
                          Send Reset Code
                        </Button>
                      </Form.Item>
                      <p className="return-text">
                        Return to <NavLink to="/">Sign In</NavLink>
                      </p>
                    </Form>
                  </div>),
                  },
                  {
                    title: 'Confirm Code',
                    content: (<div className="auth-contents">

                    <Form name="forgotPass" onFinish={handleCodeVerification} layout="vertical">
                      <Heading as="h3">OTP Code</Heading>
                     
                      <Form.Item
                        label="OTP Code"
                        name="code"
                        rules={[{ required: true, message: 'Please input the code!'}]}
                      >
                        <Input placeholder="12345" />
                      </Form.Item>
                      <Form.Item>
                        <Button className="btn-reset" htmlType="submit" type="primary" size="large">
                          Verify
                        </Button>
                      </Form.Item>
                      
                    </Form>
                  </div>),
                  },

                  {
                    title: 'Change password',
                    content: (<div className="auth-contents">
                      <Form name="forgotPass" onFinish={handleChangePassword} layout="vertical">
                        <Heading as="h3">Create New Password</Heading>

                        <Form.Item
                            prefix={<FeatherIcon icon="lock" size={14} />}
                            name="password"
                            label="Password"
                            rules={[
                              {
                                required: true,
                                message: 'Please input your password!',
                              },
                            ]}
                            hasFeedback
                        >
                          <Input.Password />
                        </Form.Item>
                        <Form.Item
                            prefix={<FeatherIcon icon="lock" size={14} />}
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                              {
                                required: true,
                                message: 'Please confirm your password!',
                              },
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                  }

                                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                              }),
                            ]}
                        >
                          <Input.Password />
                        </Form.Item>

                        <Form.Item>
                          <Button className="btn-reset" htmlType="submit" type="primary" size="large">
                            Change Password
                          </Button>
                        </Form.Item>

                      </Form>
                    </div>),
                  },
                ]}
                onNext={next}
                onPrev={prev}
              />
            </Cards> 
          </Col>
    </AuthWrapper>
  );
};

export default ForgotPassword;
