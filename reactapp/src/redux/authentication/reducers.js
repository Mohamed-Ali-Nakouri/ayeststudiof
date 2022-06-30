
import actions from './actions';
import { getItem } from '../../utility/localStorageControl';

const {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_ERR,
  LOGOUT_BEGIN,
  LOGOUT_SUCCESS,
  LOGOUT_ERR,
  USER_DETAILS,
  API_DETAILS,
  SEND_CODE_SUCCESS,
} = actions;

const initState = {
  login: getItem('Auth'),
  user: null,
  api: null,
  loading: false,
  error: null,
};

const AuthReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: data,
        loading: false,
        error: null,
      };
    case SEND_CODE_SUCCESS:
      return {
        ...state,
        code: data,
        loading: false,
        error: null,
      }  
    case USER_DETAILS:
      return {
        ...state,
        user: data,
      };
    case API_DETAILS:
      return {
        ...state,
        api: data,
      };
    case LOGIN_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case LOGOUT_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        login: data,
        loading: false,
        error: null,
      };
    case LOGOUT_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export default AuthReducer;
