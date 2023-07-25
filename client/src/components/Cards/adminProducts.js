import { FrownOutlined, SmileOutlined } from "@ant-design/icons"
import { notification } from "antd"
import axios from "axios"
import { useState } from "react"

const AdminProducts = ({
    item,
    handleDelete
}) => {
    const API_URL = "http://localhost:8000"
    const [api, contextHolder] = notification.useNotification();

    const [name, setName] = useState(item?.name)
    const [price, setPrice] = useState(item?.price)
    const [quantity, setQuantity] = useState(item?.quantity)
    const [description, setDescription] = useState(item?.description)

    const headers = {
      'Authorization': JSON.parse(localStorage.getItem("token"))
    };

    const handleUpdate = async(id) => {
        try {
            const { data } = await axios.post("/api/admin/updateproduct",{
                id, name, price, description, quantity
            },{ headers })
            if(data.ok == true){
                api.open({
                  message: "Product data updated",
                  description:
                    "Operation complete",
                    icon: <SmileOutlined style={{ color: '#0000ff' }} />,
                });
            }
        } catch (error) {
            api.open({
              message: error.response?.data,
              description:
                "Contact Developer",
                icon: <FrownOutlined style={{ color: '#ff0000' }} />,
            });
        }
    }
    
  return (
    <div key={item.id} className="d-flex border border-dark p-3">
        {contextHolder}
        <img src={`${API_URL}${item?.image}`} width={180} height={180} style={{marginRight:"10px"}} />
        <form className="d-flex">
            <div className="d-flex flex-column row-gap-4 flex-shrink-0" style={{marginRight:"10px"}}>
                <label>Product Name</label>
                <label>Product Description</label>
                <label>Product Price</label>
                <label>Product Quantity</label>
            </div>
            <div className="d-flex flex-column row-gap-3">
                <input 
                    name="name"
                    value={name} 
                    onInput={(e) => setName(e.target.value)}
                    required />
                <input 
                    name="description" 
                    value={description}
                    onInput={(e) => setDescription(e.target.value)}
                    required />
                <input 
                    name="price" 
                    value={price}
                    onInput={(e) => setPrice(e.target.value)}
                    required />
                <input 
                    name="quantity" 
                    value={quantity}
                    onInput={(e) => setQuantity(e.target.value)}
                    required />
            </div>
        </form>
        <div className="w-50 d-flex flex-column justify-content-end align-items-end m-3 row-gap-2">
            <button 
                className="btn btn-primary w-50"
                onClick={() => handleUpdate(item?.id)}
                >Update</button>
            <button 
                className="btn btn-danger w-50"
                onClick={() => handleDelete(item?.id)}
                >Delete</button>
        </div>
    </div>
  )
}

export default AdminProducts
