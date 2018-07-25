import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import Style
import styles from './TicketCreateWidget.css';

export class TicketCreateWidget extends Component {
  addTicket = () => {
    const titleRef = this.refs.title;
    const contentRef = this.refs.content;
    if (titleRef.value && contentRef.value) {
      // this.props.addTicket( titleRef.value, contentRef.value);
      console.log(this.props);
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddTicket ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}>Add Ticket</h2>
          <input className={styles['form-field']} ref="title" />
          <textarea placeholder='QR-Code' className={styles['form-field']} ref="content" />
          <a className={styles['ticket-submit-button']} href="#" onClick={this.addTicket}>submit</a>
        </div>
      </div>
    );
  }
}

TicketCreateWidget.propTypes = {
  addTicket: PropTypes.func.isRequired,
  showAddTicket: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(TicketCreateWidget);
