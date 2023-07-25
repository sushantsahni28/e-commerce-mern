import { useState } from "react"
import Headers from "../components/headers"
import axios from "axios"
import { FrownOutlined, SmileOutlined } from "@ant-design/icons"
import { Button, notification } from "antd"

const Forgetpass = () => {
  const [api, contextHolder] = notification.useNotification();

  const [username,setUsername] = useState()
  const [loading, setLoading] = useState(false)

  const handleChange = async() => {
    if(!username){
      api.open({
        message:"Please fill the email.",
        description:
          'Cannot send reset link without the email',
          icon: <FrownOutlined style={{ color: '#FF0000' }} />,
      });
      return
    }
    try {
      setLoading(true)
      const { data } = await axios.post("/api/login/forgotpassword",{
        username
      })
      if(data.ok == true){
        api.open({
          message:"Reset link sent",
          description:
            'Check your email to find the reset password link.',
            icon: <SmileOutlined style={{ color: '#0000FF' }} />,
        });
      }  
    } catch (error) {
      api.open({
          message: error.response?.data,
          description:
            'Check all fields before submission',
            icon: <FrownOutlined style={{ color: '#FF0000' }} />,
        });
    }
    setLoading(false)
  }
  return (
    <>
      <Headers />
      <div className="mt-1">
        {contextHolder}
        <div className="d-flex justify-content-center flex-column align-items-center">
          <h2 className="mt-3">Forgot Password</h2>
          <div
            className="mt-1 d-flex flex-column w-25"
          >
            <input
              placeholder="Enter your email"
              value={username}
              onInput={(e) => setUsername(e.target.value)}
              required
            /><br />
            <Button
              className="btn btn-outline-secondary"
              onClick={handleChange}
              loading={loading}
              >
              Reset Password
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Forgetpass
