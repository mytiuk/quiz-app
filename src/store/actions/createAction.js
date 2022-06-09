import axios from '../../axios/axios-quiz'
import {CREATE_QUIZ_QUESTION, FINISH_QUIZ_QUESTION} from '../actions/actionTypes'

export  function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item
  }
}

export  function finishCreateQuiz() {
  return async (dispatch, getState) => {
    
    try {
     await axios.post('quizes.json', getState().create.quiz)

      dispatch(finishQuestionAction())
    } catch (error) {
      console.log(error)
    }
  }
}

export function finishQuestionAction() {
  return {
    type: FINISH_QUIZ_QUESTION
  }
}
