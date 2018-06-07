import React  from 'react'
import { Link } from "react-router-dom";



export default class Ingreso extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      nameUser: '',
      messajeError: '',
      sala: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSala = this.handleSala.bind(this)
  }

  handleChange (event) {
    event.preventDefault()
    if (event.target.value) {
      this.setState({nameUser: event.target.value})
      this.setState({messajeError: ''})
    } else {
      this.setState({nameUser: ''})
    }
  }

  handleSala (event) {
    event.preventDefault()
    if (event.target.value) {
      this.setState({sala: event.target.value})
    } else {
      this.setState({sala: ''})
    }
  }

  handleClick (event) {
    if (!this.state.nameUser) {
      event.preventDefault()
      this.setState({messajeError: <span className="validacionName"> falta ingresar un nombre</span>})

    }
  }

  render () {
    return <div>
      <h1>Chat</h1>
      <div className="inicioSession">
        <input type="text" placeholder="Nombre" onChange={this.handleChange}/>
        <input type="text" placeholder="Palabra clave" onChange={this.handleSala}/>

        <Link
          to={{
            pathname: '/chat',
            query: {showAge: true},
            state: {nameUser: this.state.nameUser, sala: this.state.sala}
          }}

          onClick={this.handleClick}>

          <button> Ingresar</button>
        </Link>
        {
          this.state.messajeError
        }

      </div>
    </div>
  }
}

