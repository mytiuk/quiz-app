import { Component } from 'react'
import Quiz from './containers/Quiz/Qiuz'
import Layout from './hoc/Layout/Layout'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import QuizList from './containers/QuizList/QuizList'
import { connect } from 'react-redux'
import { autoLogin } from './store/actions/authAction'
import { Routes, Route, Navigate } from 'react-router-dom'
import Logout from './components/Logout/Logout'

class App extends Component {
  
componentDidMount() { 
  this.props.autoLogin()
 }

  render() {

    let routes = (
          <Routes>
            <Route path="/" end element={<QuizList/>}/>
            <Route path="/auth" element={<Auth/>} />
            <Route path="/quiz/:id" element={<Quiz/>}/>
            <Route path="*" element={<Navigate to="/" />}/>
          </Routes>
       )

    if(this.props.isAuthenticate) {
      routes = (
        <Routes>
        <Route path="/" element={<QuizList/>} />
        <Route path="/quiz-creator" element={<QuizCreator/>}/>
        <Route path="/quiz/:id" element={<Quiz/>}/>
         <Route path="/logout" element={<Logout/>}/>
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticate: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)




