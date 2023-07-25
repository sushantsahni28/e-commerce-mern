import { useContext, useEffect, useState } from "react"
import Headers from "../components/headers"
import axios from "axios"
import Productcard from "../components/Cards/productCard"
import { CommContext } from "../Context/CommContext"


let prodcount
const Homepage = () => {
  
  const [products, setProducts] = useState([])
  const [isDisabled, setIsDisabled] = useState(false)
  const [buttonText, setButtonText] = useState('Load More')
  
  const { user } = useContext(CommContext)
  
  useEffect(() => {
    prodcount = 0
    loadProducts()
  },[])

  const loadProducts = async() => {
    const { data }= await axios.get(`/api/products/${prodcount}`)
    prodcount+=5
    setProducts([...products,...data])

    if(data.length <5){
      setIsDisabled(!isDisabled)
      setButtonText("No more Products")
    }
  }

  return (
    <>
      <Headers />
      {user != null ? (
        <h2 className="m-2">Hello {user.name}</h2>
      ):(
        <h2 className="m-2">Hello Traveller</h2>
      )}
      <div className="d-flex flex-wrap justify-content-center">
        {products.map((product) => (
            <Productcard key={product.id} product={product}/>
        ))}
      </div>
      <button onClick={loadProducts} 
          disabled={isDisabled} 
          className="btn btn-outline-secondary w-100">{buttonText}</button>
    </>
  )
}

export default Homepage
