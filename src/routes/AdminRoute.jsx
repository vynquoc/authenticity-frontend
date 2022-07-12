import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route } from "react-router-dom"

const AdminRoute = ({ component: Component, ...restOfProps }) => {
    const user = useSelector(state => state.userLogin.userInfo)
  
    return (
      <Route
        {...restOfProps}
        render={(props) =>
          user ? <Component {...props} /> : <Redirect to="/admin-login" />
        }
      />
    );
}

export default AdminRoute
