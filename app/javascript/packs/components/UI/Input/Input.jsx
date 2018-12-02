import React from 'react'
import './Input.css'

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched
}

const Input = props => {
  const inputType = props.type || 'text'
  const htmlFor = `${inputType}${Math.random()}`
  let cls = 'Input '
  let class_i = ''

  if (props.valid) {
    class_i = 'fa fa-check success'
  }

  if (isInvalid(props)) {
    cls += ' invalid'
    class_i = 'fa fa-exclamation invalid'
  }

  return (
      <table className={cls}>
        <tbody> 
          <tr>
              <td style={{width: '30%', textAlign: 'right'}}>
                <label htmlFor={htmlFor}>{props.label}  
                  <span style={{display: 'inline-block', minWidth: '15px'}}><i className={class_i} /></span>
                </label>
              </td>

              <td> <input  
                  id={htmlFor}
                  type={inputType}
                  value={props.value}
                  onChange={props.onChange}
              /></td>

              <td style={{width: '40%'}}>
                {
                  isInvalid(props)
                    ? <span>{props.errorMessage || 'Введите верное значение'}</span>
                    :
                    (props.freeMessage ) ? <span style={{color: 'green'}}>{props.freeMessage}</span> : null
                }
              </td>
          </tr>
        </tbody> 
      </table>
  )
}

export default Input
