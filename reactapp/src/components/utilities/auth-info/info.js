import React from 'react';
import { Avatar, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { InfoWraper, UserDropDwon } from './auth-info-style';
import { Popover } from '../../popup/popup';
import { logOut } from '../../../redux/authentication/actionCreator';
import Heading from '../../heading/heading';

const { Text } = Typography;
const AuthInfo = () => {
  const dispatch = useDispatch();
  const User = useSelector(state => state.auth.user);
  const Api = useSelector(state => state.auth.api);
  const SignOut = e => {
    e.preventDefault();
    dispatch(logOut());
  };

  const userContent = (
    <UserDropDwon>
      <div className="user-dropdwon">
        <figure className="user-dropdwon__info">
          <img src={require('../../../static/img/icon/155-credit-card.svg')} width="60em" alt="$" />
          <figcaption>
            <Heading as="h5">Balance</Heading>
            <Text type="success">{Api?.accountData.balance} $</Text>
          </figcaption>
        </figure>
        <ul className="user-dropdwon__links">
         {/* <li>
            <Link to="#">
              <FeatherIcon icon="user" /> Profile
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="settings" /> Settings
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="dollar-sign" /> Billing
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="users" /> Activity
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="bell" /> Help
            </Link>
          </li>*/}
        </ul>
        <Link className="user-dropdwon__bottomAction" onClick={SignOut} to="#">
          <FeatherIcon icon="log-out" /> Sign Out
        </Link>
      </div>
    </UserDropDwon>
  );

  return (
    <InfoWraper>
      <Text type="success">Welcome back!, {User?.name}</Text>
      <div className="nav-author">
        <Popover placement="bottomRight" content={userContent} action="click">
          <Link to="#" className="head-example">
            <Avatar src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png" />
          </Link>
        </Popover>
      </div>
    </InfoWraper>
  );
};

export default AuthInfo;
