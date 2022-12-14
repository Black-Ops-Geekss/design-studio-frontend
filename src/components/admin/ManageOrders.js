import axios from 'axios';
import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styling/Order.css';
import Container from 'react-bootstrap/Container';


export default class ManageOrders extends Component {
  constructor ( props ) {
    super( props );
    this.state = {
      ordersArray: [],
    };
  }

  RenderOrders = async () => {
    const res = await axios.get( `${process.env.REACT_APP_SERVER}/sendOrders` );
    this.setState( { ordersArray: res.data } );
  };

  componentDidMount () {
    this.RenderOrders();
  }


  deleteOrder = async ( id ) => {

    let adminAnswer = prompt( "Type `DELETE` to confirm" );

    if ( adminAnswer === "DELETE" ) {
      await axios.delete( `${process.env.REACT_APP_SERVER}/deleteOrder/${id}` );
      this.RenderOrders();
    }
  };

  confirmOrder = async ( id ) => {

    let adminAnswer = prompt( "Type `CONFIRM` to confirm that order is delivered" );

    if ( adminAnswer === "CONFIRM" ) {
      await axios.delete( `${process.env.REACT_APP_SERVER}/deleteOrder/${id}` );
      this.RenderOrders();
    }
  };

  render () {
    return (
      <>
        {this.state.ordersArray.length === 0 ?(
          <div className='empty'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Hourglass_icon.png" alt="empty" />
          <h1>
            You Don't Have Any Orders Right Now
          </h1>
          </div>
        ) : (
          <div >
            <Container className='orders'>
              {this.state.ordersArray.filter( filterDesign => filterDesign.items !== null ).map( design => (
                <Card style={{ width: '20rem' }} className="card-order">
                  <Carousel fade>
                    {design.items.map( url => (
                      <Carousel.Item>
                        <img
                          className="d-block"
                          src={url}
                          alt="imageOrder"
                          height="300"
                          width="400"
                        />
                      </Carousel.Item >
                    ) )}
                  </Carousel >
                  <Card.Body className='card-body-order'>
                    <Card.Title>{design.name}</Card.Title>
                    <Card.Text>
                      Phone: {design.phone}<br />
                      Email: {design.email}<br />
                      City: {design.location}
                    </Card.Text>
                    <Button onClick={() => this.deleteOrder( design._id )} className="button-card-2">Delete order</Button>
                    <Button onClick={() => this.confirmOrder( design._id )} className="button-card-2" style={{ marginLeft: '25px' }}>Confirm Order</Button>
                  </Card.Body>
                </Card>
              ) )}
            </Container>
          </div>
        )}
      </>
    );
  };
};