import { Navigate } from "react-router-dom"


export const ProtectedRoute = ({children}) => {
    const user = JSON.parse(localStorage.getItem("commuser"))
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
}

export const VerifiedRoute = ({children}) => {   
    const user = JSON.parse(localStorage.getItem("commuser"))
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    else if(user.verified == 0){
      const verified = 0
      return <Navigate to="/" verified={verified} replace />
    }
    return children;
}

export const ExternalRoute = ({children}) => {
    const user = JSON.parse(localStorage.getItem("commuser"))
    if (user) {
      return <Navigate to="/" replace />;
    }
    return children;
}