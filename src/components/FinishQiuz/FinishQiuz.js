import React from 'react'
import classes from './FinishQiuz.css'
import Button from '../UI/Button/Button'
import { useNavigate } from 'react-router-dom'

const FinishQiuz = props => {

  const navigate = useNavigate()

  const successCount = Object.keys(props.results).reduce((total, key) => {
    if(props.results[key] === 'success') {
      total ++
    }
    return total
  }, 0)

  return (
    <div className={classes.FinishhQiuz}>
      <h1>Finish</h1>
      <ul className={classes.FinishQiuz}>
        {props.quiz.map((quizItem, index) => {
          const cls = [
            'fa',
             props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
             classes[props.results[quizItem.id]]
          ]
          return (
          <li key={index}>
            <strong>{index + 1}</strong>.&nbsp;
            {quizItem.question}
            <i className={cls.join(' ')}/>
          </li>
          )
        })}

      </ul>
      <p> Right {successCount} from {props.quiz.length} </p>
        <Button onClick={props.onRetry} type="primery"> Return </Button>
        <Button type="success" onClick={() => navigate('/')}> Go to test list </Button>
    </div>
  )
}

export default FinishQiuz