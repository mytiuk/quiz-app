import { FETCH_QUIZES_ERROR, 
         FETCH_QUIZES_START, 
         FETCH_QUIZES_SUCCESS, 
         FETCH_QUIZE_SUCCESS,
         QUIZ_SET_STATE,
         FINISH_QUIZ,
         QUIZ_NEXT_QUESTION,
          RETRY_HANDLER,
          DELETE_HANDLER
         } from "../actions/actionTypes"

const initialState = {
  quizes: [],
  loading: false,
  error: null,
  results: {},   
  activeQuestion: 0,
  answerState: null,  
  isFinished: false,
  quiz: null,
  rightAnswerId: 1,
  isFormValid: false,
  formControls: null
}

export function quizReducer(state = initialState, action) {
  
  switch (action.type) {
    case FETCH_QUIZES_START: 
      return {
        ...state,
     }
    case FETCH_QUIZES_SUCCESS:
      return { 
        ...state,
        loading: false,
        quizes: action.quizes
      }
    case FETCH_QUIZES_ERROR: 
      return {
        ...state,
        loading: false,
        error: action.error
      }

  /////////////////////////////
      case FETCH_QUIZE_SUCCESS:
        return {
          ...state,
          loading: false,
          quiz: action.quiz
        }
      case QUIZ_SET_STATE:
        return {
          ...state,
          results: action.results,
          answerState: action.answerState
        }
      case FINISH_QUIZ:
        return {
          ...state,
          isFinished: true
        }
      case QUIZ_NEXT_QUESTION:
        return {
          ...state,
          activeQuestion: action.questionNumber,
          answerState: null,
        }
      case RETRY_HANDLER:
        return {
          ...state,
          activeQuestion:  0,
          answerState: null,
          isFinished: false,
          results: {}
        }
        case DELETE_HANDLER:
          return {
            ...state,
            quizes: action.quizes
          }
    default: return state
  }
}