import 'babel-polyfill'
import axios from 'axios'

export default class Service {

  // getResource = async (url) => {
  //   const res = await axios.get(url);
  //   if (res.statusText != "OK") {
  //     throw new (Error)(`Could not fetch ${url}, reseived ${res.statusText}`)
  //   }
  //   return await res;
  // }

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
    
    if (type == "text"){
              return { "user": {"nikname": value, "email": "test@test.test", "firstname": "Test", "lastname": "Test", "password": "secret" } }
    } else { 
              return { "user": {"nikname" : 'testtesttesttest', "email" : value, "firstname": "Test", "lastname": "Test", "password": "secret" } }
          }
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

  // _transformQuestion(qu) {
  //   return ({
  //     question: qu.title,
  //     rightAnswer: qu.rightAnswer,
  //     id: qu.id,
  //     answers: [
  //       { text: qu.answer1, id: 1 },
  //       { text: qu.answer2, id: 2 },
  //       { text: qu.answer3, id: 3 },
  //       { text: qu.answer4, id: 4 }
  //     ]
  //   })
  // }

  // _transformPostQuestion(qu) {
  //   return ({ "question": 
  //             { 
  //               "title": qu.question,
  //               "answer1": qu.answers[0].text, 
  //               "answer2": qu.answers[1].text, 
  //               "answer3": qu.answers[2].text, 
  //               "answer4": qu.answers[3].text,
  //               "rightAnswer": qu.rightAnswer 
  //             }
  //           })
  // }
}
