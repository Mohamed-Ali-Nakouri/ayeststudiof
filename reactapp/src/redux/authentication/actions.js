const actions = {
  LOGIN_BEGIN: 'LOGIN_BEGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  SEND_CODE_SUCCESS: 'SEND_CODE_SUCCESS',
  VERIFY_CODE_SUCCESS: 'VERIFY_CODE_SUCCESS',
  CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
  LOGIN_ERR: 'LOGIN_ERR',
  SIGNUP_ERR:'SIGNUP_ERR',
  USER_DETAILS: 'USER_DETAILS',
  API_DETAILS: 'API_DETAILS',
  LOGOUT_BEGIN: 'LOGOUT_BEGIN',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_ERR: 'LOGOUT_ERR',
  FORGOT_PASSWORD_BEGIN:'FORGOT_PASSWORD_BEGIN',
  
  loginBegin: () => {
    return {
      type: actions.LOGIN_BEGIN,
    };
  },

  loginSuccess: data => {
    return {
      type: actions.LOGIN_SUCCESS,
      data,
    };
  },

  sendCodeSuccess: data => {
    return {
      type: actions.SEND_CODE_SUCCESS,
      data,
    };
  },

  verifyCodeSuccess: data => {
    return {
      type: actions.VERIFY_CODE_SUCCESS,
      data,
    };
  },
  changePasswordSuccess: data => {
    return {
      type: actions.CHANGE_PASSWORD_SUCCESS,
      data,
    };
  },

  UserDetails: data => {
    return {
      type: actions.USER_DETAILS,
      data,
    };
  },
  ApiDetails: data => {
    return {
      type: actions.API_DETAILS,
      data,
    };
  },
  loginErr: err => {
    return {
      type: actions.LOGIN_ERR,
      err,
    };
  },

  SignUpError: err => {
    return {
      type: actions.SIGNUP_ERR,
      err,
    };
  },

  logoutBegin: () => {
    return {
      type: actions.LOGOUT_BEGIN,
    };
  },

  forgotPasswordBegin: () => {
    return {
      type: actions.FORGOT_PASSWORD_BEGIN,
    };
  },

  logoutSuccess: data => {
    return {
      type: actions.LOGOUT_SUCCESS,
      data,
    };
  },

  logoutErr: err => {
    return {
      type: actions.LOGOUT_ERR,
      err,
    };
  },
};

export default actions;
