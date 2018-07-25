import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Collapsible from 'react-collapsible';
import QRCode from 'qrcode.react';

// Import Style
import styles from './TicketListItem.css';

function TicketListItem(props) {
  return (
    <div className='single-ticket'>
      <h3 className={'ticket-title'}>
        <Link to={`/tickets/${props.ticket.cuid}`} >
          {props.ticket.title}
        </Link>
      </h3>
      {/* <p className={styles['author-name']}><FormattedMessage id="by" /> {props.ticket.name}</p> */}
      <p className={'ticket-desc'}>{props.ticket.content}</p>
      <Collapsible trigger={<button>More</button>} lazyRender={true} triggerWhenOpen="">
            <QRCode value={props.ticket.content} />
            created 1.1.2018
      </Collapsible>

      <p className={'ticket-action'}><a href="#" onClick={props.onDelete}>Delete Ticket</a></p>

      <hr className={styles.divider} />
    </div>
  );
}

TicketListItem.propTypes = {
  ticket: PropTypes.shape({
    // name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    // slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TicketListItem;
