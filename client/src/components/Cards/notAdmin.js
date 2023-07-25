import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Notadmin = () => {
    const [time, setTime] = useState()

    const navigate = useNavigate()
    useEffect(() => {
        startTime()
    },[])

    const startTime = () => {
        const compTime = 3
        let curTime = 0
        setInterval(() =>{
            setTime(compTime - curTime)
            curTime++
            if(compTime - curTime == -1){
                navigate("/")
            }
        },1000)
    }
  return (
    <>
      <div class="d-flex flex-column mt-5 pt-5">
        <div class="d-flex justify-content-center">
            <div class="d-flex justify-content-center align-items-center flex-column p-4 bg-warning">
                <h3 class="text-danger">Not</h3>
                <h3 class="text-danger">Authorized</h3>
            </div>
            <img src="/img/unauthorized.jpg" />
        </div>
        <div class="d-flex justify-content-center text-dark">
            <h2>Only Admin can Access this Page.</h2>
        </div>
        </div>
        <div class="d-flex flex-column align-items-center w-100 mt-3">
            <h3>Redirecting to home in</h3>
            <h4>{time} seconds</h4> 
        </div>
    </>
  )
}

export default Notadmin
