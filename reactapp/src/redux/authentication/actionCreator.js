import actions from './actions';
import api from '../../utility/api';
import sleep from '../../utility/sleep';
import {
    ACCOUNT_DETAILS,
    AUTH_PAYLOAD,
    CREATE_USER,
    GET_AUTH_TOKENS,
    USER_DETAILS,
    SEND_RESET_CODE,
    VERIFY_CODE,
    CHANGE_PASSWORD
} from '../../constants/endpoints';
import {removeItem, setItem} from '../../utility/localStorageControl';
import actionsEvent from "../events/actions";

const {loginBegin, loginSuccess, loginErr, SignUpError, logoutBegin, forgotPasswordBegin, sendCodeSuccess, logoutSuccess, logoutErr, UserDetails, ApiDetails, verifyCodeSuccess, changePasswordSuccess} = actions;
const { nextStep} = actionsEvent;
const GetUserDetails = () => {
   
        return async dispatch => {
            api.get(USER_DETAILS).then(res => {
            
                dispatch(UserDetails(res.data));
            })
            api.get(ACCOUNT_DETAILS).then(res => {
                
                dispatch(ApiDetails(res.data));
            })
        };
    
    
};
const SignUp = ({name, email, password}) => {
    //const history = useHistory();
    return async dispatch => {
        dispatch(loginBegin());
        api
            .post(CREATE_USER, {name, email, password})
            .then(res => {
                //history.push('/');
               window.location.replace("/admin");

            })
            .catch(err => {
                //console.log(err);
                dispatch(loginErr(err.response.data))
            })

    };
}
const login = ({username, password}) => {
    return async dispatch => {
        dispatch(loginBegin());
        api
            .post(GET_AUTH_TOKENS, {...AUTH_PAYLOAD, username, password})
            .then(res => {
                delete api.defaults.headers['Authorization'];
                api.defaults.headers['Authorization'] = 'Bearer '+res.data.access_token;
                setItem('Auth', res.data);
                dispatch(loginSuccess(res.data));
                dispatch(GetUserDetails());
            })
            .catch(err => {
            
                dispatch(loginErr(err.response.data));
            });
    };
};
const logOut = () => {
    return async dispatch => {
        try {
            dispatch(logoutBegin());
            removeItem('Auth');
            dispatch(logoutSuccess(null));
        } catch (err) {
            dispatch(logoutErr(err));
        }
    };
};
const SendResetCode = (email) => {
    return async dispatch => {
    api
            .post(SEND_RESET_CODE, {email})
            .then(res => {
                
                dispatch(sendCodeSuccess(res.data));

                dispatch(nextStep(1))

            })
            .catch(err => {
                console.log(err);
                dispatch(loginErr(err.response.data));
            });
    }
}
const VerifyCode = (code) => {
    return async dispatch => {
    api
            .post(VERIFY_CODE, {code})
            .then(res => {

                dispatch(verifyCodeSuccess(res.data));
                //sleep(3000)
                dispatch(nextStep(2))

            })
            .catch(err => {
                //console.log(err);
                dispatch(loginErr(err.response.data));
            });
    }
}
const ChangePassword = (email,password,confirm) => {
    return async dispatch => {
            api
                .post(CHANGE_PASSWORD, {email,password,confirm})
                .then(res => {

                    dispatch(changePasswordSuccess(res.data));
                    window.location.replace("/login");
                    //dispatch(nextStep(3))

                })
                .catch(err => {

                    dispatch(loginErr(err.response.data));
                });
            

    };

}
export {login, logOut, GetUserDetails, SignUp, ChangePassword, SendResetCode, VerifyCode};
