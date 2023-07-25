import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CommContext } from "../Context/CommContext"
import { SmileOutlined } from "@ant-design/icons"
import { notification } from "antd"

const Headers = () => {
  const { user,logout } = useContext(CommContext)
  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate()
  const handleLogout = () =>{
    logout()
    api.open({
      message: "Logout success",
      description:
        "Redirecting to Login page....",
        icon: <SmileOutlined style={{ color: '#0000ff' }} />,
    });
  
    setTimeout(() => {
      navigate('/login');
    },1000)
  }
  return (
    <div className="d-flex justify-content-between bg-light">
      {contextHolder}
      <Link to="/" className="h2 m-2">Home</Link>
      {user != null ?(
        <div className="m-2">
            <a className="btn btn-warning m-1" href="/cart">Cart</a>
            <a className="btn btn-primary m-1" href="/dashboard">Dashboard</a>
            <a className="btn btn-danger" onClick={handleLogout}>Logout</a>
        </div>
      ):(
        <div className="m-2">
            <a className="btn btn-primary m-1" href="/login">Login</a>
            <a className="btn btn-danger" href="/signup">Sign Up</a>
        </div>
      )}
    </div>
  )}

export default Headers
