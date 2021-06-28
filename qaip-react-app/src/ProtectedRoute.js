import React from 'react'
import {Route,Redirect} from 'react-router-dom'

function ProtectedRoute({navbar:Navbar,component:Component,...rest}) {
    return (
       <Route
       {...rest}
       render={
          
           props=>{
            if(localStorage.getItem("token")!=null){
               return<div><Navbar/>
                <Component/>
               </div>
           }
        else {
            return <Redirect to={
             {pathname:"/",state:{from:props.location}}
            } />
        }
        }

       }/>
    )
}

export default ProtectedRoute
