import React, { Component } from 'react';
import ticket from '../imgs/ticket.png';
import Collapsible from 'react-collapsible';
import fibonacci from '../controller/fibonacci';
import qrcode from '../qrcode';
import QRCode from 'qrcode.react';

const lorem = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.".replace(",", "");

class Ticket extends Component {
  render() {
    var jsx = (
      <li>
        <div className="ticket" onClick={() => 1 + 41}>
          Ticket #{this.props.i}
          <br />
          fib({this.props.i}) = {fibonacci(this.props.i)}
          <br />
          tags: {lorem.split(" ").slice(this.props.text, this.props.text + 5).join(", ")}
          <Collapsible trigger={<button>More</button>} lazyRender={true} triggerWhenOpen="">
            <img src={ticket} alt="QR-Representation of the ticket" className="qr-small" />
            created 1.1.2018
            <br />
            {lorem.slice(0, 50)}
          </Collapsible>
        </div>
      </li>
    )
    return jsx;
  }
}
class QRExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "asdfqwer",
      qrText: "not yet parsed"
    }
  }
  qrToString() {
    const that = this;
    fetch(ticket)
      // .then(res => {that.setState({text:"did43"});return res})
      .then(res => res.blob())
      .then(blob => {
        // this.setState({ text: "didAThing" });
        console.log("asdf34234");
        var reader = new FileReader();
        // reader.onerror = console.log;
        // reader.onabort = console.log;
        reader.onload = function () {
          qrcode.callback = function (res) {
            if (res instanceof Error) {
              alert("No QR code found. Please make sure the QR code is within the camera's frame and try again.");
            } else {
              that.setState({ qrText: res });
            }
          };
          qrcode.decode(reader.result);
          console.log("res:" + reader.result);
        };
        reader.readAsDataURL(blob);
        console.log("1234");
      });
  }
  stringToQR(s) {
    return <QRCode value={s} />;
  }
  render() {
    return (
      <div>
        <button onClick={() => {
          this.qrToString(this.state.qrText)
          this.qrToString();
        }}>transfrom</button>
        <p>{this.state.text}</p>
        =>
        {this.stringToQR(this.state.text)}
        ;
        <img src={ticket} alt="QR-Representation of the ticket" className="qr-small" />
        =>
        <br />
        <p>{this.state.qrText}</p>
      </div>
    );
  }
}

class TicketList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nums: [1],
      text: "abcdef"
    }
  }
  componentDidMount() {
    this.updateTickets();
  }
  updateTickets() {
    fetch('/tickets')
      .then(res => res.json())
      .then(tickets => this.setState({ nums: tickets }));
  }
  postTicket() {
    fetch('http://localhost:3000/tickets', {
      method: 'POST',
      // headers: {
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json',
      // },
      body: 100
    }).then(this.updateTickets());
  }
  handleClick() {
    this.setState({ text: (Math.random() * 255 | 0).toString() });
    this.setState({ nums: this.state.nums.concat([9, 8, 7]) });
  }
  render() {
    return (
      <div>
        <QRExample />
        <button onClick={() => this.postTicket()}>Create New Ticket</button>
        <p>{this.state.text}</p><br />
        <button onClick={() => this.handleClick()}>More Tickets</button>
        <ul>
          {this.state.nums.map(i => { return { i: i, tOffset: i } })
            //[{ "i": 0, "tOffset": 0 }, { "i": 1, "tOffset": 1 }, { "i": 2, "tOffset": 2 }, { "i": 3, "tOffset": 3 }, { "i": 4, "tOffset": 4 }, { "i": 5, "tOffset": 5 }, { "i": 6, "tOffset": 6 }]
            .map(json => <Ticket key={json.i} i={json.i} text={json.tOffset} />)
          }
        </ul>
      </div>
    );
  }
}

export default TicketList;