import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Input, Button, notification, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AuthWrapper } from './style';
import { SignUp } from '../../../../redux/authentication/actionCreator';
import Heading from '../../../../components/heading/heading';

const SignIn = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.auth.loading);
    const LoginError = useSelector(state => state.auth.error);
    const [form] = Form.useForm();

    useEffect(() => {
        if (LoginError)
            notification.error({
                message: LoginError.error,
                description: LoginError.message,
            });
    }, [LoginError]);
    const handleSubmit = () => {
        dispatch(SignUp(form.getFieldsValue()));
    };

    return (
        <AuthWrapper>
            <p className="auth-notice">
                Already own an account? <NavLink to="/">SignIn From Here</NavLink>
            </p>
            <div className="auth-contents">
                <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
                    <Card style={{borderRadius:'0px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                        <Heading as="h3">
                            Sign<span className="color-secondary">Up</span>
                        </Heading>
                        <Form.Item
                            name="name"
                            rules={[{ message: 'Please input your name ', required: true }]}
                            initialValue=""
                            label="Name: "
                        >
                            <Input placeholder="Jhon Doe" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ message: 'Please input your Email!', required: true }]}
                            initialValue=""
                            label="Email: "
                        >
                            <Input placeholder="Email Address" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password: "
                            rules={[{ message: 'Please input your password!', required: true }]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>
                        {/*<Form.Item
                            name="apikey"
                            label="api key: "
                            rules={[{ message: 'Please input your api key!', required: true }]}
                        >
                            <Input.Password placeholder="api key" />
    </Form.Item>*/}
                        <Form.Item>
                            <Button className="btn-signin" style={{ float: 'right' }} htmlType="submit" type="primary" size="large">
                                {isLoading ? 'Loading...' : 'Sign Up'}
                            </Button>
                        </Form.Item>
                    </Card>
                </Form>
            </div>
        </AuthWrapper>
    );
};

export default SignIn;
