import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FrownOutlined, LoadingOutlined, SmileOutlined } from "@ant-design/icons"
import axios from "axios";
import { CommContext } from "../Context/CommContext";
import { notification } from "antd";

const Verify = () => {
  const { slug } = useParams()
  const navigate = useNavigate()

  const { logout } = useContext(CommContext)

  const [time, setTime] = useState()
  const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
      verifyUser()
      startTime()
    },[])

    const startTime = () => {
        const compTime = 3
        let curTime = 0
        setInterval(() =>{
            setTime(compTime - curTime)
            curTime++
        },1000)
    }

  const verifyUser = async() => {
    try {
      const { data } = await axios.post("/api/verification",{
        token: slug
      })
      if(data.ok == true){
        logout()
        api.open({
          message: "Account verified",
          description:
            "Now you can add products to your cart. Redirecting to login page...",
            icon: <SmileOutlined style={{ color: '#0000FF' }} />,
        });
        setTimeout(()=>{
          navigate("/login")
        },4000)
      }
    } catch (err) {
      api.open({
        message: err.response?.data,
        description:
          "Recheck your email. Redirecting to home page.",
          icon: <FrownOutlined style={{ color: '#FF0000' }} />,
      });
      setTimeout(()=>{
        navigate("/")
      },4000)
    } 
  }
  return (
    <div className="d-flex align-items-center justify-content-center">
        {contextHolder}
      <LoadingOutlined className="mt-2" style={{fontSize:"100px"}}/> :
        <h2>Please wait for {time} seconds while verifying....</h2>
    </div>
  )
}

export default Verify
