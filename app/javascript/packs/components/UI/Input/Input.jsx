import React from 'react'
import './Input.css'

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched
}

const Input = props => {
  const inputType = props.type || 'text'
  const htmlFor = `${inputType}${Math.random()}`
  let cls = 'Input '


  if (isInvalid(props)) {
    cls += ' invalid'
  }

  return (
      <table className={cls}>
        <tbody> 
          <tr>
              <td style={{width: '30%', textAlign: 'right'}}><label htmlFor={htmlFor}>{props.label}</label></td>

              <td> <input  
                  id={htmlFor}
                  type={inputType}
                  value={props.value}
                  onChange={props.onChange}
              /></td>

              <td style={{width: '30%'}}>
                {
                  isInvalid(props)
                    ? <span>{props.errorMessage || 'Введите верное значение'}</span>
                    : null
                }
              </td>
          </tr>
        </tbody> 
      </table>
      
  )
}

export default Input
