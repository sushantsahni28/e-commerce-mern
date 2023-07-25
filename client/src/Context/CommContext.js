import { FrownOutlined } from "@ant-design/icons";
import { notification } from "antd";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import moment from "moment";

export const CommContext = createContext()

export const CommContextProvider = ({children}) => {
    const [api, contextHolder] = notification.useNotification();

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("commuser")) || null
    )
    const [token, setToken] = useState()
    const [expires, setExpires] = useState()

    useEffect(() => {
        if(token && expires){
            localStorage.setItem('token',JSON.stringify(token))
            localStorage.setItem('expires',JSON.stringify(expires?.valueOf()))
            localStorage.setItem('commuser',JSON.stringify(user))
        }
    },[user])

    const login = async(inputs) =>{
        try {
            const { data } = await axios.post("/api/login",
            inputs)

            if(data.ok === true){
                const expiresDate = moment().add(data.expiresIn)

                setToken(data.token)
                setExpires(expiresDate)
                setUser(data.user)
                return 1
            }
        } catch(err){
            console.log(err)
            api.open({
                message: err.response?.data ,
                description:
                  "Please check your email and password before login.",
                  icon: <FrownOutlined style={{ color: '#FF0000' }} />,
            });
            return 0
        }
    }

    const signup = async(inputs) =>{
        try {
            const { data } = await axios.post("/api/signup",
            inputs)

            if(data.ok === true){
                const expiresDate = moment().add(data.expiresIn)

                setToken(data.token)
                setExpires(expiresDate)
                setUser(data.user)
                return 1
            }
        } catch(err){
            console.log(err)
            api.open({
                message: err.response?.data ,
                description:
                  "Please check your email and password before login.",
                  icon: <FrownOutlined style={{ color: '#FF0000' }} />,
            });
            return 0
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('commuser')
        localStorage.removeItem('token')
        localStorage.removeItem('expires')
    }

    return(
        <CommContext.Provider value={{login,signup,logout,user}}>
            {contextHolder}
            {children}
        </CommContext.Provider>
    )
}