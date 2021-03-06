import React from 'react';
import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';

// Import Components
import TicketListItem from './TicketListItem/TicketListItem';
import TicketCreateWidget from './TicketCreateWidget/TicketCreateWidget';

function TicketList(props) {
  return (
    <div>
      <div className="listView">
        {
          (props.tickets||[]).map(ticket => (
            <TicketListItem
              ticket={ticket}
              key={ticket.cuid}
              onDelete={() => props.handleDeleteTicket(ticket.cuid)}
            />
          ))
        }
      </div>
      <Collapsible trigger={<button>Add More Tickets</button>} lazyRender={true} triggerWhenOpen="">
        <TicketCreateWidget
          addTicket={(newTicket) => console.log(newTicket)}
          showAddTicket={true}
        />
      </Collapsible>
    </div>
  );
}

TicketList.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.shape({
    // name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    // slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteTicket: PropTypes.func.isRequired,
};

export default TicketList;
