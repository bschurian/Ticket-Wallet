import React, { Component } from 'react'
import QrReader from 'react-qr-reader'

export default class QRCam extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 300,
	  result: 'No result',
	  handleScan: props.handleScan
    }
  }
  render(){
    return(
      <div>
        <QrReader
          delay={this.state.delay}
          onError={(err)=>console.error(err)}
          onScan={this.state.handleScan}
          style={{ width: '100%' }}
          />
      </div>
    )
  }
}