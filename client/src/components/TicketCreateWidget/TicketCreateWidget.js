import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qrcode from '../../qrcode';

// Import Style
import styles from './TicketCreateWidget.css';

export class TicketCreateWidget extends Component {
  constructor(props) {
    super(props);
    this.state = { qrText: "No QR-Text", title: "No Title" };
  }
  addTicket = () => {
    const titleRef = this.refs.title;
    const contentRef = this.refs.content;
    if (titleRef.value && contentRef.value) {
      // this.props.addTicket( titleRef.value, contentRef.value);
      this.setState({title:titleRef.value});
      this.openQRCamera(contentRef.files[0]);
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
          that.sendNewTicket()
        }
      };
      qrcode.decode(reader.result);
      
    };
    reader.readAsDataURL(file);
  }
  sendNewTicket() {
    fetch('/users/' + JSON.parse(sessionStorage.getItem("userData")).googleid + '/tickets',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          title: this.state.title,
          content: this.state.qrText
        })
      }).then(console.log).catch(console.error);
  }
  render() {
    const cls = `${styles.form} ${(this.props.showAddTicket ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}>Add Ticket</h2>
          <label>Name: </label>
          <input placeholder='Name' className={styles['form-field']} ref="title" />
          <label>QR-Code:</label>
          <input
            type='file' label='Upload' accept='image/*'
            ref={(ref) => { this.refs.content = ref }}
          />
          <a className={styles['ticket-submit-button']} href="#" onClick={this.addTicket}>submit</a>
        </div>
      </div>
    );
  }
}

TicketCreateWidget.propTypes = {
  addTicket: PropTypes.func.isRequired,
  showAddTicket: PropTypes.bool.isRequired,
};

export default TicketCreateWidget;
