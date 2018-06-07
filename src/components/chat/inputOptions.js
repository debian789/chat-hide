import React from 'react';
//import ItemDinamic from './itemDinamic'

export default class InputOptions extends React.Component {

  sendFile(event) {
    this.props.sendFile.call(null, event)
  }

  render() {
    return <div className="inputOption">
      <input id="file" type="file" name="file" onChange={this.sendFile.bind(this)}/>
      <label htmlFor="file">Adjuntar archivo</label>
    </div>
  }
}


//ItemListChat.defaultProps = {estiloItem: "itemListChat2"}