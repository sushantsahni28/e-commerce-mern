import { useEffect, useState } from "react"
import Headers from "../components/headers"
import axios from "axios"
import { DeleteOutlined, FrownOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { notification } from "antd"

const Cart = () => {
    const [api, contextHolder] = notification.useNotification();

    const [cartItem, setCartItem] = useState([])
    const [loading,setLoading] = useState(false)

    const API_URL = "http://localhost:8000"

    const headers = {
      'Authorization': JSON.parse(localStorage.getItem("token"))
    };

    useEffect(() => {
      getCartItems()
    },[])

    const getCartItems = async() => {
      try {
        const { data } = await axios.get("/api/products/cartitems",{headers})
        setCartItem(data)
      } catch (error) {
        api.open({
          message: err.response?.data,
          description:
            "Contact Developer",
            icon: <FrownOutlined style={{ color: '#ff0000' }} />,
        });
        setLoading(false)
      }
    }
    
    const handleAddProduct = async(item) => {
      if(item.cartquantity == item.quantity){
        api.open({
          message: "Max quantity reached",
          description:
            "Cannot add more products",
            icon: <FrownOutlined style={{ color: '#ff0000' }} />,
        });
        return
      }
      try {
        setLoading(true)
        const {data} = await axios.post("/api/products/change",{
          itemid: item.productid, 
          itemquantity: Number(item.cartquantity)+1
        },{headers})

        if(data.ok === true){
            const ind = cartItem.findIndex((element) => element.productid == item.productid)
            const {cartquantity, ...other} = cartItem[ind]
                    
            const newData = {...other, cartquantity:cartquantity+1}       
            const newarr = [...cartItem.slice(0,ind),newData,...cartItem.slice(ind+1)]
            setCartItem(newarr)
        }
        setLoading(false)
      } catch (error) {
        api.open({
          message: error.response?.data,
          description:
            "Contact Developer",
            icon: <FrownOutlined style={{ color: '#ff0000' }} />,
        });
        setLoading(false)
      }
    }
    const handleSubProduct = async(item) => {
      if(item.cartquantity == 1){
        api.open({
          message: "Min quantity reached",
          description:
            "Cannot subtract quantity anymore",
            icon: <FrownOutlined style={{ color: '#ff0000' }} />,
        });
        return
      }
      try {
        setLoading(true)
        const {data} = await axios.post("/api/products/change",{
          itemid: item.productid, 
          itemquantity: Number(item.cartquantity)-1
        },{headers})

        if(data.ok === true){
            const ind = cartItem.findIndex((element) => element.productid == item.productid)
            const {cartquantity, ...other} = cartItem[ind]
                    
            const newData = {...other, cartquantity:cartquantity-1}       
            const newarr = [...cartItem.slice(0,ind),newData,...cartItem.slice(ind+1)]
            setCartItem(newarr)
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        api.open({
          message: error.response?.data,
          description:
            "Contact Developer",
            icon: <FrownOutlined style={{ color: '#ff0000' }} />,
        });
        setLoading(false)
      }
    }
    const handleDelProduct = async(item) => {
      try {
        setLoading(true)
        const {data} = await axios.post("/api/products/delete",{
          itemid: item.productid, 
        },{headers})

        if(data.ok === true){
            const ind = cartItem.findIndex((element) => element.productid == item.productid)      
            const newarr = [...cartItem.slice(0,ind),...cartItem.slice(ind+1)]
            setCartItem(newarr)
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        api.open({
          message: error.response?.data,
          description:
            "Contact Developer",
            icon: <FrownOutlined style={{ color: '#ff0000' }} />,
        });
        setLoading(false)
      }
    }
  return (
    <>
      <Headers />
      <div className="text-center">
        <h2>Cart</h2>
        {contextHolder}
      </div>
      <div className="mt-1 p-3">
        {cartItem.length == 0 ? (
          <div className="d-flex flex-column align-items-center">
            <ShoppingCartOutlined style={{fontSize:"150px"}} />
            <h4>Cart Empty</h4>
            <p>Go to Homepage to add some products in the cart...</p>
          </div>
        ) : <></>}
        {cartItem.map((item,index) => (
        <div key={index} className="d-flex justify-content-between border border-secondary mb-2">
          <div className="d-flex">
              <img src={`${API_URL}/${item.image}`} width="200" height="200" className="m-1" />
              <div className="mt-4">
                  <h2>{item.name}</h2>
                  <p><b>₹</b>{item.price}</p>
                  <p><b>Description:</b> {item.description}</p>
                  <p><b>Inventory Quantity:</b> {item.quantity}</p>
              </div>
          </div>
          <div className="d-flex align-self-end justify-self-end flex-column m-4">
              <label className="text-center border border-secondary mb-2">{item.cartquantity}</label>
              <div className="d-flex justify-content-between">
                  <button className="btn btn-outline-secondary" 
                    disabled={loading}
                    onClick={() => handleAddProduct(item)}>+</button>
                  <button className="btn btn-outline-secondary"
                    disabled={loading}
                    onClick={() => handleSubProduct(item)}
                    >-</button>
              </div>
              <button
                disabled={loading} 
                onClick={() => handleDelProduct(item)}
                className="btn btn-danger mt-2">
                  <DeleteOutlined style={{fontSize:"20px"}} /> Remove
              </button>
          </div> 
      </div>))}
      </div>
    </>
  )
}

export default Cart
