import { Button, notification } from "antd"
import Headers from "../components/headers"
import { useState } from "react";
import { CloseCircleOutlined, FrownOutlined, SmileOutlined } from "@ant-design/icons";
import Passwordcard from "../components/Cards/passwordCard";
import { usePasswordValidation } from "../components/Hooks/usePasswordValidation";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ChangePassword = () => {
    const [api, contextHolder] = notification.useNotification();

    const { slug } = useParams()
    const navigate = useNavigate()

    const [confirm,setConfirm] = useState()
    const [focuspass, setFocuspass] = useState(false)
    const [password, setPassword] = useState({
        checkPassword: "",
    });
    const [notMatch,setNotMatch] = useState(false)
    const [loading,setLoading] = useState(false)
       
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

    const handleConfirm = (e) => {
      setConfirm(e.target.value)
        if(password.checkPassword == e.target.value){
            setNotMatch(false)
            return
        }
        setNotMatch(true)
    }

    const handleSubmit = async() => {
      if(password.checkPassword == "" || !confirm){
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
        const {data} = await axios.post("/api/change",{
            password:password.checkPassword,
            token:slug
        })
        if(data.ok == true){
          api.open({
          message: "Password changed successfully",
          description:
            "Redirecting to Login page....",
            icon: <SmileOutlined style={{ color: '#0000ff' }} />,
          });
          setTimeout(() => {
            setLoading(false)
            navigate('/login');
          },1000)
        }
        setLoading(false)   
      }catch(err){
        api.open({
        message: err.response?.data,
        description:
          "Recheck your details.",
          icon: <FrownOutlined style={{ color: '#FF0000' }} />,
        });
        setLoading(false)
      }
    }
  return (
    <>
      <Headers />
        <div className="d-flex justify-content-center flex-column align-items-center mt-1">
        {contextHolder}
          <p className="mt-3">Enter new Password</p>
          <div className="mt-1 d-flex flex-column w-25">
            <input placeholder="Enter your password" 
                    type="password" 
                    onFocus={() => setFocuspass(true)}
                    onBlur={() => setFocuspass(false)}
                    onChange={setCheck}  
                    required /><br />

              {focuspass ? (
              <div className="forgetCheck">
              <Passwordcard 
                  lowerCase={lowerCase}
                  upperCase={upperCase}
                  hasNumber={hasNumber}
                  specialChar={specialChar}
                  validLength={validLength}/>
              </div> ): <></>}

                {notMatch ? (
                  <div className="d-flex forgetConfirm">
                    <CloseCircleOutlined style={{color:"red", marginTop:"7px", marginRight:"2px"}}/>
                    <p className="text-danger">Passwords don't match</p>
                  </div>
                 ): <></>}
              <input placeholder="Confirm password" 
                type="password" 
                onInput={handleConfirm} 
                onBlur={() => setNotMatch(false)}
                required /><br/>
            <Button 
                className="btn btn-outline-danger"
                onClick={handleSubmit}
                loading={loading}
            >
                Change Password
            </Button>
          </div>
        </div>
    </>
  )
}

export default ChangePassword
