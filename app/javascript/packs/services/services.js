import 'babel-polyfill'
import axios from 'axios'

export default class Service {
  postResource = async (url, params) => {
    const res = await axios.post(url, params);
    if (res.statusText != "Created") {
      throw new (Error)(`Could not fetch ${url}, reseived ${res.statusText}`)
    }
    return await res;
  }

  createUser = async (params) => {
    const user = this._transformUser(params)
    const res = await this.postResource('http://localhost:3000/api/v1/users', user)
    return res
  }

  checkInDb = async (type, value) => {
    const user = this._transformCheckParams(type, value)
    const res = await this.postResource('http://localhost:3000/api/v1/checkindb', user)
    return res
  }

  _transformCheckParams(type, value) {
    let params = {}
    let field = ''

    return (type == "text") 
      ? 
        { "user": { "nikname": value, "email": "test@test.test", "firstname": "Тест", "lastname": "Тест", "password": "secret" } }
      :
        { "user": { "nikname": 'testtesttesttest', "email": value, "firstname": "Тест", "lastname": "Тест", "password": "secret" } }
  }
  
  _transformUser(formControls) {
    return  { "user": 
              { "nikname": formControls.nikname.value, 
                "firstname": formControls.firstname.value, 
                "lastname": formControls.lastname.value, 
                "email": formControls.email.value,
                "password": formControls.password.value
              }
            }
  }
}
