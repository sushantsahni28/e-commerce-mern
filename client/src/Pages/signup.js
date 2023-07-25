import { useContext, useState } from "react"
import Headers from "../components/headers"
import { CloseCircleOutlined, FrownOutlined, SmileOutlined } from "@ant-design/icons"
import { Alert, Space, Spin, notification } from "antd"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { usePasswordValidation } from "../components/Hooks/usePasswordValidation"
import Passwordcard from "../components/Cards/passwordCard"
import { CommContext } from "../Context/CommContext"

const Signup = () => {
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    const { signup } = useContext(CommContext)

    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [confirm,setConfirm] = useState() 
    const [phone, setPhone] = useState()
    const [gender, setGender] = useState("Male")
    const [loading, setLoading] = useState(false)
    const [focuspass, setFocuspass] = useState(false)

    const [password, setPassword] = useState({
          checkPassword: "",
         });
       
    const [
    validLength,
    hasNumber,
    upperCase,
    lowerCase,
    specialChar,
    ] = usePasswordValidation({
        checkPassword: password.checkPassword,
    });


    const setCheck = (e) => {
      setPassword({ ...password, checkPassword: e.target.value });
    };

    const [notMatch,setNotMatch] = useState(false)
    const handlePhone = (e) => {
        setPhone(e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g))
    }

    const handleConfirm = (e) => {
      setConfirm(e.target.value)
        if(password.checkPassword == e.target.value){
            setNotMatch(false)
            return
        }
        setNotMatch(true)
    }

    const handleSubmit = async() => {
      if(!name || !email || !password || !phone || !gender){
        api.open({
        message: 'Form Incomplete',
        description:
          'Please fill complete form before submission.',
          icon: <FrownOutlined style={{ color: '#FF0000' }} />,
        });
        return
      }
      
      if(!lowerCase || !upperCase || !specialChar || !validLength || !hasNumber) {  
          api.open({
          message: 'Password pattern mismatch',
          description:
            'Password must be of more than 8 length and should contain atleast one capital letter, one small letter, one digit, one symbol[!@#$%^&*_=+-]',
            icon: <FrownOutlined style={{ color: '#FF0000' }} />,
        });
        return
      }
      
      if(confirm != password.checkPassword){
        api.open({
        message: 'Passwords don\'t match',
        description:
          'Password and Confirm Password values should match.',
          icon: <FrownOutlined style={{ color: '#FF0000' }} />,
        });
        return
      }

      try{
        setLoading(true)
        const inputs = {
          name, email, password, gender, phone
        }
        const resp = await signup(inputs)

        if(resp == 1){
          api.open({
          message: "Account created successfully",
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
        message: err.response?.data,
        description:
          "Recheck your email and other details.",
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
              <input placeholder="Enter your name" 
                  onInput={(e) => setName(e.target.value)}
                  required /><br />
              <input placeholder="Enter your email" 
                  onInput={(e) => setEmail(e.target.value)}
                  required /><br />
              <input placeholder="Enter your password" 
                    type="password" 
                    onFocus={() => setFocuspass(true)}
                    onBlur={() => setFocuspass(false)}
                    onChange={setCheck}  
                    required /><br />

              {focuspass ? (
              <div className="passwordCheck">
              <Passwordcard 
                  lowerCase={lowerCase}
                  upperCase={upperCase}
                  hasNumber={hasNumber}
                  specialChar={specialChar}
                  validLength={validLength}/>
              </div> ): <></>}

                {notMatch ? (
                  <div className="d-flex confirmCheck">
                    <CloseCircleOutlined style={{color:"red", marginTop:"7px", marginRight:"2px"}}/>
                    <p className="text-danger">Passwords don't match</p>
                  </div>
                 ): <></>}
              <input placeholder="Confirm password" 
                type="password" 
                onInput={handleConfirm} 
                onBlur={() => setNotMatch(false)}
                required /><br/>

              <input placeholder="Enter your Phone no." name="contact" type="text" value={phone}
              onInput={handlePhone} required /><br />
              <select name="gender" onChange={(e) => setGender(e.target.value)}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
              </select><br />
              {loading ? (
                <Space direction="vertical" className="d-flex justify-content-center" style={{ width: '100%' }} >
                  <Spin tip="Loading..." spinning={loading} >
                    <Alert
                      message="Creating Account"
                      description="please wait..."
                      type="info"
                    />
                  </Spin>
                </Space>
              ):(<></>)}
              {loading? (<></>) :<button className="btn btn-outline-danger" onClick={handleSubmit}>Sign Up</button>}
          </div>
          {loading? (<></>) :<a className="mt-2 w-50 btn btn-outline-primary" href="/login">Login</a>}
      </div>
      <div className="col-md-5">
        <img src="/img/login.jpg" className="mt-3" width={550} height={400}/>
      </div>
    </div>
    </>
  )
}

export default Signup
