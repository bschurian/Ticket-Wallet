import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './TicketCreateWidget.css';

export class TicketCreateWidget extends Component {
  addTicket = () => {
    const nameRef = this.refs.name;
    const titleRef = this.refs.title;
    const contentRef = this.refs.content;
    if (nameRef.value && titleRef.value && contentRef.value) {
      this.props.addTicket(nameRef.value, titleRef.value, contentRef.value);
      nameRef.value = titleRef.value = contentRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddTicket ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewTicket" /></h2>
          <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} ref="name" />
          <input placeholder={this.props.intl.messages.ticketTitle} className={styles['form-field']} ref="title" />
          <textarea placeholder={this.props.intl.messages.ticketContent} className={styles['form-field']} ref="content" />
          <a className={styles['ticket-submit-button']} href="#" onClick={this.addTicket}><FormattedMessage id="submit" /></a>
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
