import { Alert, Space, Spin, notification } from "antd"
import Headers from "../components/headers"
import { useContext, useState } from "react"
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import { CommContext } from "../Context/CommContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [api, contextHolder] = notification.useNotification();
    const { login } = useContext(CommContext)

    const navigate = useNavigate()

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async() => {
        if(!email || !password){
            api.open({
                message:"Form incomplete" ,
                description:
                  "Please fill complete form before submission.",
                  icon: <FrownOutlined style={{ color: '#FF0000' }} />,
            });  
            return
        }
        try{
            setLoading(true) 
            const inputs = {
              email,
              password
            }
            const resp = await login(inputs)
            if(resp == 1){
              api.open({
                message: "Login successful",
                description:
                  "Redirecting to Homepage....",
                  icon: <SmileOutlined style={{ color: '#0000ff' }} />,
              });
            
              setTimeout(() => {
                setLoading(false)
                navigate('/');
              },1000)
            }
            setLoading(false)
        }catch(err){
            api.open({
                message: err.response?.data ,
                description:
                  "Please check your email and password before login.",
                  icon: <FrownOutlined style={{ color: '#FF0000' }} />,
            }); 
            setLoading(false)
        }
    }

  return (
    <>
    <Headers />
    {contextHolder}
    <div className="mt-1 row">
      <div className="col-md-7 d-flex justify-content-center flex-column align-items-center">
          <h4 className="mt-5">Create your Account</h4>
          <div className="mt-1 d-flex flex-column w-50">
              <input placeholder="Enter your email" 
                  onInput={(e) => setEmail(e.target.value)}
                  required /><br />
              <input placeholder="Enter your password" 
                    type="password" 
                    onInput={(e) => setPassword(e.target.value)} 
                    required /><br />
                    
              {loading ? (
                <Space direction="vertical" className="d-flex justify-content-center" style={{ width: '100%' }} >
                  <Spin tip="Loading..." spinning={loading} >
                    <Alert
                      message="Authenticating..."
                      description="please wait..."
                      type="info"
                    />
                  </Spin>
                </Space>
              ):(<></>)}
              {loading? (<></>) :<button className="btn btn-outline-primary" onClick={handleSubmit}>Login</button>}
          </div>
          {loading? (<></>) :<a className="mt-2 w-50 btn btn-secondary" href="/forgetpass">Forget Password</a>}
      </div>
      <div className="col-md-5">
        <img src="/img/login.jpg" className="mt-3" width={550} height={400}/>
      </div>
    </div>
    </>
  )
}

export default Login
