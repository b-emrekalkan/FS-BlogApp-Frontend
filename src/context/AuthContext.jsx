import axios from 'axios';
import {createContext, useState} from 'react'
import { toastErrorNotify, toastSuccessNotify } from '../helper/ToastNotify';

export const AuthContext = createContext();

const url = "http://127.0.0.1:8000/"

const AuthContextProvider = (props)=>{

  const [currentUser,setCurrentUser] = useState(JSON.parse(sessionStorage.getItem("currentuser")) || false)
  let keys = sessionStorage.getItem('token')
  const [myKey,setMyKey] = useState(keys && window.atob(keys))

  const createUser = async (email,password,firstName,lastName,username,profile_pic,biography,password1,navigate)=>{

    const userInfo = {
              "username": username,
              "email": email,
              "first_name": firstName,
              "last_name": lastName,
              "profile_pic": profile_pic,
              "biography":biography,
              "password": password,
              "password1": password1
          }

    try {
      const res = await axios.post(`${url}auth/register/`,userInfo)

      if(res.data.token){

        setMyKey(res.data.token)
        setCurrentUser({...res.data,'token':''})

        const userData = { ...res.data, token: '' }
        sessionStorage.setItem("currentuser", JSON.stringify(userData))
       const myToken = window.btoa(res.data.token)
        console.log(res.data);
        console.log(currentUser);
        sessionStorage.setItem('token',myToken)
        toastSuccessNotify('User registered successfully.')
        navigate("/")
      }

    } catch (error) {
      toastErrorNotify(error.message)
    }
  }

  const signIn = async (email,password,userName,navigate)=>{

    console.log(email,password,userName);
    try {
      console.log(email)
      const res = await axios.post(`${url}auth/login/`,{
        "email": email,
        "username":userName,
        "password":password
      })
      console.log(res)
      if(res.data.key){
        console.log(res)
        setMyKey(res.data.key)
        setCurrentUser(res.data.user)
        sessionStorage.setItem('currentuser',JSON.stringify(res.data.user))
        const myToken = window.btoa(res.data.key)
        sessionStorage.setItem('token',myToken)

        toastSuccessNotify('User login successfully.')
        navigate("/")
      }

    } catch (error) {
      toastErrorNotify(error.message)
    }
  }

  const logOut = async (navigate)=>{
    try {
      var config = {
        method: 'post',
        url: `${url}auth/logout/`,
        headers: { 
          'Authorization': `Token ${myKey}`,
        }
      };
      const res = await axios(config)
      console.log(res)
      if (res.status === 200) {
        setCurrentUser(false)
        setMyKey(false)
        sessionStorage.clear()
        toastSuccessNotify('User log out successfully.')
        navigate("/")
      }

    } catch (error) {
      toastErrorNotify(error.message)
    }
  }

 let value = {
    createUser,
    currentUser,
    myKey,
    signIn,
    logOut
 }

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;