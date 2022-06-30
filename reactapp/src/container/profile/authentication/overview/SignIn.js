import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Form, Input, Button, notification, Card,Checkbox
 } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AuthWrapper } from './style';
import { login } from '../../../../redux/authentication/actionCreator';
import Heading from '../../../../components/heading/heading';

const SignIn = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.loading);
  const LoginError = useSelector(state => state.auth.error);
  const [form] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    if (LoginError)
      notification.error({
        message: LoginError.error,
        description: LoginError.message,
      });
  }, [LoginError]);
  const handleSubmit = () => {
    dispatch(login(form.getFieldsValue()));
    history.push('/');
  };

  return (
    <AuthWrapper>
      <p className="auth-notice">
        Don&rsquo;t have an account? <NavLink to="/signup">Sign up now</NavLink>
      </p>
      <div className="auth-contents">
        <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
          <Card style={{borderRadius:'0px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
            <Heading as="h3">
              Sign<span className="color-secondary">In</span>
            </Heading>
            <Form.Item
              name="username"
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
            <div className="auth-form-action" style={{ 'justifyContent': 'flex-end'}}>
            <NavLink className="forgot-pass-link" to="/forgotPassword">
              Forgot password?
            </NavLink>
          </div>
            <Form.Item>
              <Button className="btn-signin" style={{ float: 'right' }} htmlType="submit" type="primary" size="large">
                {isLoading ? 'Loading...' : 'Sign In'}
              </Button>
            </Form.Item>
          </Card>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
