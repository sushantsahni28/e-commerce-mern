import { useContext, useState } from "react"
import Headers from "../components/headers"
import { CommContext } from "../Context/CommContext"
import { CloseCircleOutlined, FormOutlined, FrownOutlined, SettingOutlined, SmileOutlined } from "@ant-design/icons"
import { Button, Input, Modal, Tooltip, notification } from "antd"
import Passwordcard from "../components/Cards/passwordCard"
import { usePasswordValidation } from "../components/Hooks/usePasswordValidation"
import axios from "axios"
import { Link } from "react-router-dom"

const Dashboard = () => {
  const { user } = useContext(CommContext)
  const [api, contextHolder] = notification.useNotification();
  
  const [notMatch,setNotMatch] = useState(false)
  const [focuspass,setFocuspass] = useState(false)
  const [confirm,setConfirm] = useState()
  const [loading,setLoading] = useState(false)
  const [oldPass, setOldPass] = useState()

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

    const handleConfirm = (e) => {
      setConfirm(e.target.value)
        if(password.checkPassword == e.target.value){
            setNotMatch(false)
            return
        }
        setNotMatch(true)
    }
  
  const headers = {
      'Authorization': JSON.parse(localStorage.getItem("token"))
    };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async() => {
    if(!password.checkPassword || !oldPass || !confirm){
      api.open({
          message: 'Incomplete Form',
          description:
            'Please Fill all fields before before submission',
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
    if(password.checkPassword != confirm){
      api.open({
          message: 'Passwords mismatch',
          description:
            'Password and Confirm password should match',
            icon: <FrownOutlined style={{ color: '#FF0000' }} />,
        });
      return
    }
    try {
       const {data } = await axios.post("/api/change/old",{
        oldpassword: oldPass,
        password: password.checkPassword
       },{headers})
       if(data.ok == true){
        api.open({
          message: 'Password changed successfully',
          description:
            'You can now login with new password',
            icon: <SmileOutlined style={{ color: '#0000FF' }} />,
        });
       }
    } catch (error) {
      console.log(error)
      api.open({
          message: error.response?.data,
          description:
            'Check all fields before submission',
            icon: <FrownOutlined style={{ color: '#FF0000' }} />,
        });
    }
    setOldPass()
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setOldPass()
    setIsModalOpen(false);
  };

  return (
    <>
      <Headers />
      {user != null && <div className="bg-dark text-white">
        <h2 className="text-center">{user.name.toUpperCase()}</h2>
        <h5><b>Email: </b>{user.username}</h5>
        <h5><b>Phone: </b>{user.contact}</h5>
        <h5><b>Gender: </b>{user.gender}</h5>
        <h5>{user.verified == 0 ? 
        <b className="text-danger">Your account has not been verified yet</b> :
        user.verified == 2 ? <b className="text-info">Welcome Admin</b>:
        <b className="text-success">Your account is verified</b>
        }</h5>

        <div className="d-flex justify-content-end m-3 p-3">
          {contextHolder}
          {user.verified == 2 ? <Tooltip placement="top" title="Admin">
            <Link to="/admin">
              <FormOutlined 
                style={{fontSize:"40px", marginRight:"15px"}} />
            </Link>
          </Tooltip> : <></>}
          <Tooltip placement="top" title="Change Password">  
            <SettingOutlined 
              onClick={showModal}
              style={{fontSize:"40px"}} />
          </Tooltip>
          <Modal 
            title="Change Password" 
            open={isModalOpen} 
            onOk={handleOk} 
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Return
              </Button>,
              <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                Submit
              </Button>
            ]}
            >
            Enter old Password:
            <Input
              type="password"
              value={oldPass}
              placeholder="Enter old Password"
              onInput={(e) => setOldPass(e.target.value)}
            />
            Enter new Password:
            <Input 
              placeholder="Enter new Password"
              type="password" 
              onFocus={() => setFocuspass(true)}
              onBlur={() => setFocuspass(false)}
              onChange={setCheck}
            />
            {focuspass ? (
              <div className="moveRight">
            <Passwordcard 
                  lowerCase={lowerCase}
                  upperCase={upperCase}
                  hasNumber={hasNumber}
                  specialChar={specialChar}
                  validLength={validLength}/>
              </div> ): <></>}

            Confirm new Password:
            <Input 
              placeholder="Confirm new Password"
              type="password" 
              onInput={handleConfirm} 
              onBlur={() => setNotMatch(false)}
            />
             {notMatch ? (
                  <div className="d-flex">
                    <CloseCircleOutlined style={{color:"red", marginTop:"7px", marginRight:"2px"}}/>
                    <p className="text-danger">Passwords don't match</p>
                  </div>
                 ): <></>}
          </Modal>
        </div>
      </div>}
    </>
  )
}

export default Dashboard
