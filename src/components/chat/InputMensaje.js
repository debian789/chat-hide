import React from 'react'

export default class InputMensaje extends React.Component {

  sendData (event) {
    if (event.target.value) {      
      this.props.onSendMensaje.call(null, {mensaje: event.target.value})
      event.target.value = ''
    } else {
      if (this.textInput.value) {
        this.props.onSendMensaje.call(null, {mensaje: this.textInput.value})
        this.textInput.value = ''
      }
    }

  }

  focus (event) {
    this.sendData(event)
    event.preventDefault()
  }

  onClick (event) {
    //13 Corresponde a la tecla Enter
    if (event.keyCode === 13) {
      this.sendData(event)
    }
  }

  render () {
    return <div className="inputChat">
      <input
        type="text"
        placeholder="Aa ... "
        onKeyDown={this.onClick.bind(this)}
        ref={(input) => {
          this.textInput = input
        }}
      />
      <button onClick={this.focus.bind(this)}> &#62; </button>
    </div>
  }
}