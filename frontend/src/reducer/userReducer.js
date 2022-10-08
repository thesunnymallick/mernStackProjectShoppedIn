
import {
    LOGIN_REQUEST, 
    LOGIN_SUCCESS,
    LOGIN_FAIL ,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    LOGOUT_SUCCESS,
    LOGOUT_FAIL,

    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_REST,
    UPDATE_PROFILE_FAIL,

    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_REST,
    UPDATE_PASSWORD_FAIL,

    FORGOT_PASSWORD_REQUEST,
    FROGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,


    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,

    USER_UPDATED_REQUEST,
    USER_UPDATED_SUCCESS,
    USER_UPDATED_REST,
    USER_UPDATED_FAIL,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_REST,
    USER_DELETE_FAIL,


    
    CLEAR_ERRORS } from '../constants/userConstants'



    // USER REDUCER
export const userReducer=(state={user:{}},action)=>{

    switch (action.type) {
        case LOGIN_REQUEST:
        case USER_REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
          return{
            loading:true,
            isAuthticated:false
          };
         case LOGIN_SUCCESS:
         case USER_REGISTER_SUCCESS:
         case LOAD_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthticated:true,
                user:action.payload

            }
      
         case LOGIN_FAIL:
         case USER_REGISTER_FAIL:
                return{
                    ...state,
                    loading:false,
                    isAuthticated:false,
                    user:null,
                    error:action.payload
                }
        case LOAD_USER_FAIL:
            return{
                ...state,
                loading:false,
                isAuthticated:false,
                user:null,
                error:action.payload
            }

        case LOGOUT_SUCCESS:
                return{
                    loading:false,
                    isAuthticated:false,
                    user:null
                   }
        case LOGOUT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
                return{
                     ...state,
                     error:null
                    }
            
   
    
        default:
            return state
    }
}

 // PROFILE REDUCER ==== 
 export const profileReducer=(state={user:{}},action)=>{

    switch (action.type) {
        
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case USER_UPDATED_REQUEST:
        case USER_DELETE_REQUEST:
          return{
            ...state,
            loading:true,
        
          };
      
         case UPDATE_PROFILE_SUCCESS:
         case UPDATE_PASSWORD_SUCCESS:
         case  USER_UPDATED_SUCCESS:
            return{
                ...state,
                loading:false,
                isUpdated:action.payload,

            }
        case USER_DELETE_SUCCESS:

            return{
                ...state,
                loading:false,
                isDeleted:action.payload,

            }
       
         case UPDATE_PROFILE_FAIL:
         case UPDATE_PASSWORD_FAIL:
         case USER_UPDATED_FAIL:
         case USER_DELETE_FAIL:
      
                return{
                    ...state,
                    loading:false,
                    error:action.payload
                }
        case UPDATE_PROFILE_REST:
        case UPDATE_PASSWORD_REST:
        case USER_UPDATED_REST:
            return{
                ...state,
                isUpdated:false
            }

            case  USER_DELETE_REST:
                return{
                    ...state,
                    isDeleted:false
                }
       

       
        case CLEAR_ERRORS:
                return{
                     ...state,
                     error:null
                    }
            
   
    
        default:
            return state
    }
}


// Forgot Passsword Reducer

export const forgotPasswordReducer=(state={user:{}},action)=>{

    switch (action.type) {
        
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
          return{
            ...state,
            loading:true,
            error:null
        
          };
      

         case FROGOT_PASSWORD_SUCCESS:
            return{
                ...state,
                loading:false,
                message:action.payload

            }
        case RESET_PASSWORD_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    success:action.payload
                }
       
         
         case FORGOT_PASSWORD_FAIL:
         case RESET_PASSWORD_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:action.payload
                }
     
        case CLEAR_ERRORS:
                return{
                     ...state,
                     error:null
                    }
            
   
    
        default:
            return state
    }
}


// Get All user Reducer---(admin)

export const allUsersReducer=(state = { users:[] }, action)=>{
    switch (action.type) {
        case  ALL_USERS_REQUEST:
         return{
            ...state,
           loading:true
         };
         case ALL_USERS_SUCCESS:
            return{
                ...state,
               loading :false,
               users:action.payload
            } 
        case   ALL_USERS_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
           return{
            ...state,
            error:null
           }
        
    
        default:
          return state
    }
}



// Single user Details ---Admin


export const userDetailsReducer=(state = { user:{} }, action)=>{
    switch (action.type) {
        case  USER_DETAILS_REQUEST:
         return{
            ...state,
           loading:true
         };
         case USER_DETAILS_SUCCESS:
            return{
                ...state,
               loading :false,
               user:action.payload
            } 
        case  USER_DETAILS_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
           return{
            ...state,
            error:null
           }
        
    
        default:
          return state
    }
}





