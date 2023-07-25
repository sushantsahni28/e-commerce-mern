import { useContext, useEffect, useState } from "react"
import Headers from "../components/headers"
import { CommContext } from "../Context/CommContext"
import Notadmin from "../components/Cards/notAdmin"
import AdminProducts from "../components/Cards/adminProducts"
import axios from "axios"
import { FrownOutlined, LoadingOutlined, SmileOutlined } from "@ant-design/icons"
import { Button, notification } from "antd"

const Admin = () => {
    const { user } = useContext(CommContext)
    const [api, contextHolder] = notification.useNotification();

    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [quantity, setQuantity] = useState()
    const [allProds, setAllProds] = useState([])
    const [pic,setPic] = useState([])

    const [loading, setLoading] = useState(false)
    const [loadSubmit, setLoadSubmit] = useState(false)

    const headers = {
      'Authorization': JSON.parse(localStorage.getItem("token"))
    };

    useEffect(() => {
        loadProducts()
    },[])

    const handleSubmit = async() => {
        if(!name || !description || !price || !quantity){
            api.open({
              message: "Form incomplete",
              description:
                "Please fill the complete form before submission",
                icon: <FrownOutlined style={{ color: '#ff0000' }} />,
            });
            return 
        }
        if(!pic[0]){
            api.open({
              message: "Please upload a picture",
              description:
                "A picture should be uploaded with the product",
                icon: <FrownOutlined style={{ color: '#ff0000' }} />,
            });
            return 
        }
        if(pic[0].type.split("/")[0] !== "image"){
            api.open({
              message: "Uploaded file is not an image",
              description:
                "Please upload an image file",
                icon: <FrownOutlined style={{ color: '#ff0000' }} />,
            });
            return
        }
        setLoadSubmit(true)
        const formData = new FormData()

        formData.append("name",name)
        formData.append("description",description)
        formData.append("price",price)
        formData.append("quantity",quantity)
        formData.append("picture", pic[0]);

        try {
            const { data } = await axios.post("/api/admin/addproduct",
                formData
            ,{headers})
            setAllProds([...allProds,data])
            setName("")
            setDescription("")
            setPrice("")
            setQuantity("")
            setPic([])
            api.open({
              message: "Product added",
              description:
                "New product added to the list",
                icon: <SmileOutlined style={{ color: '#0000ff' }} />,
            });
        } catch (error) {
            api.open({
              message: error.response?.data,
              description:
                "Failed to add new product",
                icon: <FrownOutlined style={{ color: '#ff0000' }} />,
            });
        }
        setLoadSubmit(false)
    }
    const handlePrice = (e) => {
        setPrice(e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g))
    }
    const handleQuantity = (e) => {
        setQuantity(e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g))
    }
    const loadProducts = async() => {
        try {
            setLoading(true)
            const {data} = await axios.get("/api/admin/allproducts",{
                headers
            })
            setAllProds(data)  
            setLoading(false)
        } catch (error) {
            api.open({
              message: error.response?.data,
              description:
                "Contact Developer",
                icon: <FrownOutlined style={{ color: '#ff0000' }} />,
            });
        }
    }
    const handleDelete = async(id) => {
        try {
            const { data } = await axios.post("/api/admin/deleteproduct",{
                id
            },{ headers })
            if(data.ok == true){
                const ind = allProds.findIndex((element) => element.id == id)      
                const newarr = [...allProds.slice(0,ind),...allProds.slice(ind+1)]
                setAllProds(newarr)
                api.open({
                  message: "Product data deleted",
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
    <>
    <Headers />
      {user.verified == 2 ? 
      <>
        <h1 className="display-4 text-danger bg-dark text-center">Welcome! Lord Admin</h1>  
        {contextHolder}
        <div className="m-5 row">
            <div className="col-md-8 overflow-auto vh-100">
                {loading ? <LoadingOutlined style={{ fontSize: 100 }} spin />: 
                allProds && allProds.map((item) => (
                    <AdminProducts 
                        item={item}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>
        <div className="col-md-4">
            <div className="mt-1 d-flex flex-column border border-dark p-3">
                <h3 className="text-center">Add Product</h3>
                <input 
                    placeholder="Product Name" 
                    value={name}
                    onInput={(e) => setName(e.target.value)}
                    required /><br />
                <input 
                    placeholder="Product Description" 
                    value={description}
                    onInput={(e) => setDescription(e.target.value)}
                    required /><br />
                <input 
                    placeholder="Product Price" 
                    value={price}
                    onInput={handlePrice}
                    required /><br />
                <input
                    placeholder="Product Quantity" 
                    value={quantity}
                    onInput={handleQuantity}
                    required /><br />
                <input 
                    type="file"
                    onChange={(e) => setPic(e.target.files)} 
                    accept="image/*" 
                    required /><br />
                <Button 
                    type="primary" 
                    onClick={handleSubmit}
                    loading={loadSubmit}
                    >Add Product</Button>
            </div>
        </div>
    </div>
    </>: 
       <Notadmin />
      }
    </>
  )
}

export default Admin
