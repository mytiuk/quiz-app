import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './QuizList.css'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import {fetchQuizes, deleteQuestion} from '../../store/actions/quizActions'

 class QuizList extends Component {

  onDelete = (index, id) => {
   
    this.props.deleteQuestion(index, id)
  }

  renderQuizes() {

    return this.props.quizes.map((quiz, index) => {
      return (
        <div key={index}>
          <li
          key={quiz.id}
          >
            <NavLink to={'/quiz/' + quiz.id}>
              {quiz.name}</NavLink>
            <button
              className={classes.Button}
              key={index}
              onClick={() => this.onDelete(index, quiz.id)}
              >Delete
            </button>
          </li>
        </div>
      )
    })
  }

 async componentDidMount() { 
     
  this.props.fetchQuizes()
}

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Test list</h1>
           {!this.props.token && this.props.quizes.length === 0 && <div style={{fontSize: '1.2rem', marginTop: '30px'}}>Log in to create a test</div>}
            { this.props.loading && this.props.quizes.length === 0
              ? <Loader/> 
              : <ul> {this.renderQuizes()} </ul>
            }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading,
    token: state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
    deleteQuestion: (index, id) => dispatch(deleteQuestion(index, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)