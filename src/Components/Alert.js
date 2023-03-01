import React from 'react'

function Alert(props) {

  function capitalizeFirstLetter() {
    var string = props.alert.type
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>
      {props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
            <strong>{capitalizeFirstLetter()}</strong>: {props.alert.msg}
        </div>}
    </>
  )
}

export default Alert
