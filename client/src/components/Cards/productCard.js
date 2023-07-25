import { Modal, notification } from 'antd';
import { useContext, useState } from 'react';
import { CommContext } from '../../Context/CommContext';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import axios from 'axios';

const Productcard = ({
    product
}) => {
    const API_URL = "http://localhost:8000"
    const {id, name, description, image, quantity,price} = product
    const picurl = API_URL+image

    const {user} = useContext(CommContext)
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleOk = () => {
      setIsModalOpen(false);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const handleCart = async(product) => {
      if(user == null){
        api.open({
          message: "User should be logged in",
          description:
            "Login before adding product to the cart",
            icon: <FrownOutlined style={{ color: '#ff0000' }} />,
        });
        return
      }
      if(user.verified == 0){
        api.open({
          message: "User not verified",
          description:
            "Check your email to verify yourself before adding products to your cart",
            icon: <FrownOutlined style={{ color: '#ff0000' }} />,
        });
        return
      }

      try{
        setLoading(true)
        const headers = {
          'Authorization': JSON.parse(localStorage.getItem("token"))
        };

        const {data} = await axios.post("/api/products/addtocart",{
          prodid:product.id
        },
        {headers})

        if(data.ok == true){
          api.open({
            message: "Product added to Cart",
            description:
              "Go to the cart to purchase the product.",
              icon: <SmileOutlined style={{ color: '#0000ff' }} />,
          });
        }else if(data.ok == false){
          api.open({
            message: "Product already added to the cart",
            description:
              "Go to the cart to purchase the product.",
              icon: <SmileOutlined style={{ color: '#0000ff' }} />,
          });
        }
        setLoading(false)
      }catch(err){
        api.open({
          message: err.response?.data,
          description:
            "Contact Developer",
            icon: <FrownOutlined style={{ color: '#ff0000' }} />,
        });
        setLoading(false)
      }   
    }
    
  return ( 
    <div key={id} className="p-2 d-flex flex-column justify-content-center border border-secondary m-1">
        <img 
            width={270}
            height={300}
            src={picurl}
        />
        <div className="d-flex flex-column align-items-center">
            <h3>{name}</h3>
            <h6>₹{price}</h6>
        </div>
        <div className="d-flex justify-content-around">
            <button className="btn btn-warning" 
              disabled={loading}
              onClick={() =>handleCart({id})}>Add to Cart</button>
            <button onClick={showModal} className="btn btn-outline-secondary">View desc.</button>
            <Modal title={name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className='d-flex justify-content-center'>
                    <img src={picurl} width={350} height={350} className='text-center'/>
                </div>
                <p style={{fontSize:"20px"}} className='text-center'>₹{price}</p>
                <p style={{fontSize:"20px"}}><b>Description:</b> {description}</p>
                <p style={{fontSize:"20px"}}><b>Quantity:</b> {quantity}</p>
            </Modal>
        </div>
        {contextHolder}
    </div>
  )
}

export default Productcard
