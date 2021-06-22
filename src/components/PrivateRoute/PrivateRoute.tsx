import React, { FunctionComponent } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'


export const PrivateRoute: FunctionComponent<any> = ({
  component: Component, ...rest
  }) => {

    const { currentUser } = useAuth();

  return(
    <Route {...rest}
    render={(props => {
      if(currentUser){
        return <Component {...props}/>
      } else {
        return <Redirect to={{pathname:"/login", state: {from: props.location}}}/>
      }
    })}/>
  )
};