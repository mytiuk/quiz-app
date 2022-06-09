import React, { Component } from 'react'
import classes from './QuizCreator.css'
import Button from '../../components/UI/Button/Button'
import { createControl, validate, validateForm } from '../../form/formFramework'
import Input from '../../components/UI/Input/Input'
import Auxilliary from '../../hoc/Auxilliary/Auxilliary'
import Select from '../../components/UI/Select/Select'
import { connect } from 'react-redux'
import {createQuizQuestion, finishCreateQuiz} from '../../store/actions/createAction'

function createOptionControl(number) {
  return createControl({
    label: `Option ${number}`,
    errorMessage: 'Option can not be empty',
    id: number
  }, {required: true})
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Enter the question',
      errorMessage: 'Question can not be empty'
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  }
}

 class QuizCreator extends Component {

  state = {
    rightAnswerId: 1,
    isFormValid: false,
    formControls: createFormControls(),
  }

  addQuestionHandler = event => {
    event.preventDefault()

    const {question, option1, option2, option3, option4 } = this.state.formControls

    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id}
      ]
    }

    this.props.createQuizQuestion(questionItem)
    
    this.setState({
      rightAnswerId: 1,
      isFormValid: false,
      formControls: createFormControls()
    })
  }

  createQiuzeHandler = event => {
    event.preventDefault()
      
      this.setState({
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls()
      })
      
      this.props.finishCreateQuiz()
  }

  submitHnadler = event => {
    event.preventDefault()
  }

  changeHandler = (value, controlName) => {
    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}

    control.value = value
    control.touched = true
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((conrtolName, index) => {
      const control = this.state.formControls[conrtolName]

      return (
        <Auxilliary key={index}>
        <Input
        key={index}
        label={control.label}
        value={control.value}
        valid={control.valid}
        shouldValidate={!!control.validation}
        touched={control.touched}
        errorMessage={control.errorMessage}
        onChange={event => this.changeHandler(event.target.value, conrtolName)}
        />
        {index === 0 ? <hr /> : null}
        </Auxilliary>
      )
    })
  }

  selectChangeHandler = event => {
      this.setState({
        rightAnswerId: +event.target.value
      })
  }

  render() {

    const select = <Select
      label='Choose the rigth answer'
      value={this.state.rightAnswerId}
      onChange={ this.selectChangeHandler}
      options={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4},
      ]}
    />

    return (
      <div className={classes.QuizCreator}>
       <div>
          <h1>Create test</h1>
          <form onSubmit={this.submitHnadler}>
            { this.renderInputs() }
            { select }
            <Button 
              type='primery'
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
              >Edd question
            </Button>
            <Button 
              type='success'
              onClick={this.createQiuzeHandler}
              disabled={this.props.quiz.length === 0}
              >Create Test <a href='/' style={{position: 'absolute', height: '20px', width: '100px', left: '310px'}}/>
            </Button>
          </form>
       </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz

  }
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)