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
    isFormValid: false,

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
        errorMessage: 'Минимум 5 символов',
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

  registerHandler = () => {

  }

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

    this.setState({
      formControls, isFormValid
    })
  }

  checkResponseOnMessage = (controlName, message) => {
    if (message.length > 0) {
      console.log('MESSAGE', message[0])
      const formControls = { ...this.state.formControls }
      const control = { ...formControls[controlName] }
      control.errorMessage = message[0]
      control.valid = false
      formControls[controlName] = control

      this.setState ({formControls})
    }
  }

  checkInDb = (type, value) => {
    
    let params = {}
    let field = ''

    if (type == "text"){ 
      field = 'nikname'
      params = { "user": {"nikname": value, "email": "test@test.test", "firstname": "Test", "lastname": "Test", "password": "secret" } }
    } else{
      field = 'email'
      params = { "user": {"nikname" : 'testtesttesttest', "email" : value, "firstname": "Test", "lastname": "Test", "password": "secret" } }
          }

    axios.post('http://localhost:3000/api/v1/checkindb', params)
      .then(response => {
        console.log('response', response.data)
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
                              style={{ float: 'right', margin: '-48px 60px 0 0'}}
                            >Проверить</button>
                          :
                            null) 
              
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
            onChange={event => this.onChangeHandler(event, controlName)}
          />{ valueFree }
        </React.Fragment>
      )
    })
  }

  regHandler = (event) => {
    event.preventDefault()


    const params = this.state.formControls

    this.service.createUser(params)
      .then((user) => (console.log(user)))
      .catch(function (error) {
        console.log('ОШИБКА', error);
      })

    this.setState({
      isFormValid: false
    })
  }

  render() {
    return (
      <div className='Auth'>
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
      </div>
    )
  }
}
