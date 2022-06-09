import axios from 'axios'
import {AUTH_SUCCESS, AUTH_LOGOUT} from '../actions/actionTypes'

export default function auth(email, password, isLogin) {
  
  return async dispatch => {
  const authData = {
      email, password,
      returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC1QTH2KBPoms_3OQ_oadeFv63uD2MVaWw'

    if(isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC1QTH2KBPoms_3OQ_oadeFv63uD2MVaWw'
    } 
      try {
         const response = await axios.post(url, authData)
         const data = response.data

         const experationData = new Date(new Date().getTime() + data.expiresIn * 1000)
         localStorage.setItem('token', data.idToken)
         localStorage.setItem('useId', data.localId)
         localStorage.setItem('experationData', experationData)

         dispatch(authSuccess(data.idToken))
         dispatch(authLogout(data.expiresIn))

        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
  }
}

export  function authLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logOut())
    }, time * 1000)
  }
}

export function logOut() {
  localStorage.removeItem('token')
  localStorage.removeItem('useId')
  localStorage.removeItem('experationData')
  localStorage.removeItem('questions')
    return {
     type: AUTH_LOGOUT
  }
}

export function autoLogin() {
  return dispatch => {

    const token = localStorage.getItem('token')
    if(!token) {
      dispatch(logOut())
    } else {
      const experationData = new Date(localStorage.getItem('experationData'))
        if (experationData <= new Date()) {
          dispatch(logOut())
        } else {
          dispatch(authSuccess(token))
          dispatch(authLogout((experationData.getTime() - new Date().getTime()) / 1000))
        }
    }
  }
}

export  function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  }
}