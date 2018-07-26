import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qrcode from '../../qrcode';
import QRCam from './QR-Cam';
import Collapsible from 'react-collapsible';

// Import Style
import styles from './TicketCreateWidget.css';

export class TicketCreateWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrText: "No QR-Text",
      title: "No Title",
      // qrCamClosed:true
    };
  }
  addTicket = () => {
    const titleRef = this.refs.title;
    if (titleRef.value && this.state.qrText) {
      // this.props.addTicket( titleRef.value, contentRef.value);
      this.setState({ title: titleRef.value });
      this.sendNewTicket(titleRef.value);
    }
  };
  openQRCamera(file) {
    const that = this;
    var reader = new FileReader();
    reader.onload = function () {
      qrcode.callback = function (res) {
        if (res instanceof Error) {
          alert("No QR code found. Please make sure the QR code is within the camera's frame and try again.");
        } else {
          that.setState({ qrText: res });
        }
      };
      qrcode.decode(reader.result);

    };
    reader.readAsDataURL(file);
  }
  //param title beacause setstate appears to be async and not fast enough to complete before fetch
  sendNewTicket(title) {
    fetch('/users/' + JSON.parse(sessionStorage.getItem("userData")).googleid + '/tickets',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          title: title,
          content: this.state.qrText
        })
      }).then(console.log).catch(console.error);
  }
  render() {
    const handleScanUnbound = function (content) {
      if (content !== null) { this.setState({ qrText: content }); }
    };
    const handleScan = handleScanUnbound.bind(this);
    const cls = `${styles.form} ${(this.props.showAddTicket ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}>Add Ticket</h2>
          <label>Name: </label>
          <input placeholder='Name' className={styles['form-field']} ref="title" />
          <label>QR-Code:</label>
          <input
            type='file' label='Upload' accept='image/*' onChange={() =>
              this.openQRCamera(this.refs.content.files[0])
            }
            ref={(ref) => { this.refs.content = ref }}
          />
          <Collapsible
            trigger={<button>Take a Picture</button>}
            onClose={() => this.setState({ qrCamClosed: true })}
            onOpen={() => { console.log(99); this.setState({ qrCamClosed: false }); }}>
            {!this.state.qrCamClosed ? <QRCam handleScan={handleScan} /> : ''}
          </Collapsible>
          <p>{"" + this.state.qrText}</p>

          <a className={styles['ticket-submit-button']} href="#" onClick={this.addTicket}>submit</a>
        </div>
      </div >
    );
  }
}

TicketCreateWidget.propTypes = {
  addTicket: PropTypes.func.isRequired,
  showAddTicket: PropTypes.bool.isRequired,
};

export default TicketCreateWidget;
