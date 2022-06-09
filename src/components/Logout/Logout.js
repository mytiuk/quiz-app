import React, { Component } from 'react'
import { connect } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {logOut} from '../../store/actions/authAction'

 class Logout extends Component {
   
  componentDidMount() { 
    this.props.logOut()
   }
   render() {
     return (
       <></>
     )
   }
  }
  
  export function mapDispatchToProps(dispatch) {
    return {
      logOut: () => dispatch(logOut())
    }
  }

  export default connect(null, mapDispatchToProps)((props) => (
    <Logout 
        {...props}
        navigate={useNavigate()}
    />
  ))

