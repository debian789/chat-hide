import React from 'react'
import ListChat from './ListChat'
import InputMensaje from './InputMensaje'
import uid from 'uid'
import io from 'socket.io-client'
import { URL_SERVER_SOCKET }  from '../../commons/Constans'
import request from 'superagent'
import InputOptions from './inputOptions'

export default class AppChat extends React.Component {

  constructor (props) {
    super(props)
    this.state = {mensajes: [], user: '', sala: ''}
    this.sendMensaje = this.sendMensaje.bind(this)
    this.clearMessage = this.clearMessage.bind(this)
    this.sendFile = this.sendFile.bind(this)
  }

  componentWillMount () {

    // Url de escucha de socket.io, el cliente con  el server
    this.socket = io(URL_SERVER_SOCKET)
    console.log(URL_SERVER_SOCKET)

    //Esta pendiente de recibir informacion desde el server
    this.socket.on('mensaje', (mgs) => {
      if (mgs.user !== this.state.user) {
        this.newMensaje(mgs)
      }
    })

    this.socket.on('clear', (data) => {
      this.setState({mensajes: []})
    })

    //Obtiene los parametros que se pasaron por url

    let user = this.props.location.state.nameUser
    let sala = this.props.location.state.sala

    this.setState({user: user})
    this.setState({sala: sala})

    this.socket.emit('join', sala)
  }

  sendMensaje (mensaje) {
    let mensajeEnviar = {mensaje: mensaje.mensaje, user: this.state.user, key: uid()}
    let mensajeInsertar = {mensaje: mensaje.mensaje, user: this.state.user, key: uid(), estilo: 'itemListChat'}
    this.newMensaje(mensajeInsertar)

    //Envia un mensaje al server, este se encarga de reenviarlo a todos
    this.socket.emit('mensaje', mensajeEnviar)
  }

  newMensaje (mensaje) {
    this.state.mensajes.push(mensaje)
    let mensajes = this.state.mensajes
    // mensaje.mensaje.split('.')[mensaje.mensaje.split('.').length -1 ]
    // mensaje.mensaje.split('.').indexOf("jpg")
    this.setState({mensajes: mensajes})
  }

  clearMessage (data) {
    this.socket.emit('clear', 'clear')
  }

  sendFile (event) {
    let self = this
    request
      .post(`${URL_SERVER_SOCKET}/upload`)
      .attach('file', event.target.files[0])
      .end(function (err, res) {
        if (!err) {
          self.sendMensaje({mensaje: res.body.file})

        }
      })
  }

  // <input type="file" name="file" onChange={this.sendFile}/>

  render () {
    return <div>
      <div className="contenedorChant">
        <div className="cuadroChat">
          <ListChat conten={this.state.mensajes} onClearMessage={this.clearMessage}/>
          <InputOptions sendFile={this.sendFile}/>
          <InputMensaje onSendMensaje={this.sendMensaje}/>
        </div>
      </div>
    </div>

  }
}