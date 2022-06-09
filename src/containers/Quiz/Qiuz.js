import React, {Component} from 'react'
import classes from '../Quiz/Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishQiuz from '../../components/FinishQiuz/FinishQiuz'
import { useParams, useLocation } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import {fetchQuizById, quizAnswerClick, retryHandlerReducer} from '../../store/actions/quizActions'


class Quiz extends Component {
  
 componentDidMount() { 
    this.props.fetchQuizById(this.props.params.id)
   }
  
componentWillUnmount() {
  this.props.retryHandlerReducer()
}

  render() {
    return (

      <div className={classes.Quiz}>

       { this.props.loader || !this.props.quiz
          ?
          <Loader/>
          : 
          <div className={classes.QuizWrapper}>
            <h1>Answer all questions</h1>

            { this.props.isFinished
             ?
              <FinishQiuz
                results={this.props.results}
                quiz={this.props.quiz}
                onRetry={this.props.retryHandlerReducer}
              />
             :
              <ActiveQuiz
                question={this.props.quiz[this.props.activeQuestion].question}
                answers={this.props.quiz[this.props.activeQuestion].answers}
                onAnswerClic={this.props.quizAnswerClick}
                quizLength={this.props.quiz.length}
                answerNumber={this.props.activeQuestion + 1}
                state={this.props.answerState}
              />
            }
          </div>
       }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    results: state.quiz.results,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,   
    isFinished: state.quiz.isFinished,
    loading: state.quiz.loading,
    quiz: state.quiz.quiz
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryHandlerReducer: () => dispatch(retryHandlerReducer())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)((props) => (
  <Quiz 
      {...props}
      params={useParams()}
      lacation={useLocation()}
  />
))
 