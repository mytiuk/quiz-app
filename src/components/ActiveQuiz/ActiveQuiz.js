import React from 'react'
import classes from './ActiveQuiz.css'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = props => {

 return (
  <div className={classes.ActiveQuize}>
    <p className={classes.Question}>
      <span>
        <strong>{props.answerNumber}.</strong>&nbsp;
        {props.question}
      </span>
    </p>
      <AnswersList
      answers={props.answers}
      onAnswerClic={props.onAnswerClic}
      state={props.state}
      />
      <small>{props.answerNumber} from {props.quizLength}</small>
  </div>
)
}
export default ActiveQuiz