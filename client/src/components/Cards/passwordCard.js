import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"

const Passwordcard = ({
    validLength,
    hasNumber, 
    upperCase, 
    lowerCase, 
    specialChar
}) => {
  return (
    <>
      <div className="d-flex">{lowerCase ? <CheckCircleOutlined style={{marginTop:"7px",marginRight:"2px", color:"#00ff00"}}/> : <CloseCircleOutlined style={{marginTop:"7px",marginRight:"2px", color:"#ff0000"}}/>}<p>one lowercase character</p></div>
      <div className="d-flex">{upperCase ? <CheckCircleOutlined style={{marginTop:"7px",marginRight:"2px", color:"#00ff00"}}/> : <CloseCircleOutlined style={{marginTop:"7px",marginRight:"2px", color:"#ff0000"}}/>}<p>one uppercase character</p></div>
      <div className="d-flex">{hasNumber ? <CheckCircleOutlined style={{marginTop:"7px",marginRight:"2px", color:"#00ff00"}}/> : <CloseCircleOutlined style={{marginTop:"7px",marginRight:"2px", color:"#ff0000"}}/>}<p>one number</p></div>
      <div className="d-flex">{specialChar ? <CheckCircleOutlined style={{marginTop:"7px",marginRight:"2px", color:"#00ff00"}}/> : <CloseCircleOutlined style={{marginTop:"7px",marginRight:"2px", color:"#ff0000"}}/>}<p>one special character</p></div>
      <div className="d-flex">{validLength ? <CheckCircleOutlined style={{marginTop:"7px",marginRight:"2px", color:"#00ff00"}}/> : <CloseCircleOutlined style={{marginTop:"7px",marginRight:"2px", color:"#ff0000"}}/>}<p>atleast 8 length</p></div>
    </>
  )
}

export default Passwordcard
