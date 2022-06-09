import axios from '../../axios/axios-quiz'
import { FETCH_QUIZES_ERROR,
         FETCH_QUIZES_START, 
         FETCH_QUIZES_SUCCESS, 
         FETCH_QUIZE_SUCCESS,
         QUIZ_SET_STATE,
         FINISH_QUIZ,
         QUIZ_NEXT_QUESTION,
         RETRY_HANDLER,
         DELETE_HANDLER
         } from "./actionTypes"

export function fetchQuizes() {
    return async dispatch => {

    dispatch(fetchQuizesStart())

   try {
    const response = await axios.get('quizes.json')
    const quizes = []

    Object.keys(response.data).forEach((key, index) => {
      quizes.push(
        {id: key, name: `Test №${index + 1} 📝`}
      )
    })

    dispatch(fetchQuizesSuccess(quizes))

} catch (error) {
    dispatch(fetchQuizesError(error))
 }
  }
}   

export function deleteQuestion(index, id) {
  console.log(id)
  return async(dispatch, getState) => {
    const state = getState()
    const quizes = [...state.quiz.quizes]
     quizes.splice(index, 1)

    dispatch(deleteHandler(quizes))

    try {
      await axios.delete(`quizes/${id}.json`)

    } catch(error) {
      console.log(error)
    }
  }
}

export function deleteHandler(quizes) {
  return {
    type: DELETE_HANDLER,
    quizes
  }
}

export  function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const response = await axios.get(`quizes/${quizId}.json`)
      const quiz = response.data

      dispatch(fetchQiuzSuccess(quiz))
      
    } catch (error) {
      dispatch(fetchQuizesError(error))
    }
   }
  }

export function retryHandlerReducer() {
  return async dispatch => {
    dispatch(retryHandlerChange())
  }
}

export  function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

export  function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }
}

export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR, 
    error
  }
}

export function fetchQiuzSuccess(quiz) {
  return {
    type: FETCH_QUIZE_SUCCESS,
    quiz
  }
}

//--------------------------------------

  export function retryHandlerChange() {
    return {
      type: RETRY_HANDLER
    }
  }
//-------------------------------------

export function quizSetState(results, answerState) {
  return {
    type: QUIZ_SET_STATE,
    results, answerState
  }
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ
  }
}

export function quizNextQuestion(questionNumber) {
  return {
    type: QUIZ_NEXT_QUESTION,
    questionNumber
  }
}

  export function quizAnswerClick(answerId) {
    return async (dispatch, getState) => {
      const state = getState().quiz

        if(state.answerState) {

        if (state.answerState[answerId] === 'success'){
          return
        }
      }

    const question = state.quiz[state.activeQuestion]

    const results = state.results

      if(question.rightAnswerId === answerId) {

        if(!results[question.id]) {
          results[question.id] = 'success'
        }
          dispatch(quizSetState(results, {[answerId]: 'success'}))
 
          const timeout = window.setTimeout(() => {

            if(isQiuzFinished(state)) {
              dispatch(finishQuiz())

            } else {
              dispatch(quizNextQuestion(state.activeQuestion + 1))
            }

              window.clearTimeout(timeout)
          }, 1000)

      } else {
        results[question.id] = 'error'
        dispatch(quizSetState(results, {[answerId]: 'error'}))
    
      }
    }
  } 
 
  function isQiuzFinished(state) {
  

return state.activeQuestion + 1 === state.quiz.length

    }

    //-------Quiz creator---------//

  export function quizCreatorReducer() {
    return async (dispatch, getState) => {
      const state = getState()
      dispatch(createFormControls())

    }
  }

  export function createFormControls() {
    return {
      type: '',
    }
  }