import React, { Component } from 'react'
import './Auth.css'
import Button from '../UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
import axios from 'axios'
import Service from '../../services/services'

export default class Auth extends Component {
  service = new Service()

  initialState = {
    finished: false,
    isFormValid: false,
    email: null,
    nikname: null,

    formControls: {
      nikname: {
        value: '',
        type: 'text',
        label: 'Никнейм:',
        errorMessage: 'только латинские буквы и цифры, начинаться должен с латинской буквы',
        valid: false,
        touched: false,
        validation:{
                required: true,
                isLatin: true
              }
      },

      firstname: {
        value: '',
        type: 'text',
        label: 'Имя:',
        errorMessage: 'Допустимы только русские буквы',
        valid: false,
        touched: false,
        validation:{
                required: true,
                isRussian: true
              }
      },

      lastname: {
        value: '',
        type: 'text',
        label: 'Фамилия:',
        errorMessage: 'Допустимы только русские буквы',
        valid: false,
        touched: false,
        validation:{
                required: true ,
                isRussian: true
              }
      },

      email: {
        value: '',
        type: 'email',
        label: 'Электронная почта:',
        errorMessage: 'Введите корректный Email',
        valid: false,
        touched: false,
        validation:{
                required: true,
                email: true
              }
      },

      password: {
        value: '',
        type: 'password',
        label: 'Пароль:',
        errorMessage: 'Пожалуйста, выдумайте пароль длинее 5 символов',
        valid: false,
        touched: false,
        validation:{
                required: true,
                minLength: 5
              }
      }
    }
  }

  state = this.initialState
 
  submitHandler = (event) => {
    event.preventDefault()
  }

  validateControl(value, validation) {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    if (validation.isRussian) {
      isValid =   /^[а-яА-Я]+$/.test(value) && isValid
    }

    if (validation.isLatin) {
      isValid = /^[a-zA-Z]+[a-zA-Z0-9]*$/.test(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({ [controlName]: null })
    this.setState({
      formControls, isFormValid
    })
  }

  checkResponseOnMessage = (controlName, message) => {
    if (message.length > 0) {
      const formControls = { ...this.state.formControls }
      const control = { ...formControls[controlName] }
      control.errorMessage = message.join()
      control.valid = false
      formControls[controlName] = control
      this.setState ({formControls})
    } else {
      const free = `${controlName} свободен`
      if (controlName == 'nikname' || controlName == 'email'){
            this.setState({ [controlName]: free })
        }
    }
  }

  checkInDb = (type, value) => {
    let field = ''

    field = (type == "text") ? 'nikname' : 'email'

    this.service.checkInDb(type, value)
      .then(response => {
        this.checkResponseOnMessage(field, response.data)
      })
      .catch((error) => {
        console.log('ERROR', error);
      });
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName) => {
      const control = this.state.formControls[controlName]
      const valueFree = (  
        ((control.type == "email" || control.label == "Никнейм:") && control.valid)
        ?
          <button
            onClick={() => this.checkInDb(control.type, control.value)}
            style={{ float: 'right', margin: '-49px 120px 0 0'}}
          >
            Проверить
          </button>
        :
          null) 
      let freeMessage = this.state[controlName] || null
              
      return (
        <React.Fragment>
          <Input
            key={controlName}
            type={control.type}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            shouldValidate={!!control.validation}
            errorMessage={control.errorMessage}
            freeMessage={freeMessage}
            onChange={event => this.onChangeHandler(event, controlName)}
          />{ freeMessage ? null : valueFree }
        </React.Fragment>
      )
    })
  }

  finishPage = () => {
    this.setState({
      ...this.initialState
    })
    this.setState({ finished: true })
  }

  regHandler = (event) => {
    event.preventDefault()
    const params = this.state.formControls

    this.service.createUser(params)
      .then((user) => this.finishPage())
      .catch(function (error) {
        console.log('ОШИБКА', error);
      })
  }



  render() {
    const regForm = this.state.finished
      ?
        <h1>Регистрация Завершена.</h1>
      :
        <div>
          <h1>Регистрация:</h1>
        
          <form onSubmit={this.submitHandler} className='AuthForm'>
            { this.renderInputs() }

            <Button
              type='primary'
              onClick={this.regHandler}
              disabled={!this.state.isFormValid}
            >
              Готово
            </Button>
          </form>
        </div>
  
    return (
      <div className='Auth'>
        { regForm }
      </div>
    )
  }
}
