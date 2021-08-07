import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,CardTitle } from 'reactstrap';

class Menu extends Component {

  constructor(props) {
      super(props);
      this.state = {
        selectedDish : null
      }
  }

  onDishSelect(dish) {
    this.setState({ selectedDish: dish});
  }

  renderDish(dish) {
    if (dish != null)
        return(
            <Card>
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    else
        return(
            <div></div>
        );
  }

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
              <div  className="col-12 col-md-3 mt-5">
                <Card  key={dish.id} onClick={()=> this.onDishSelect(dish)}>
                  <CardImg width="100%" object src={dish.image} alt={dish.name} />
                
                  <CardTitle>{dish.name}</CardTitle>
                  
                </Card>
              </div>
            );
        });

        return (
          <div className="container">
            <div className="row">
              {menu}
            </div>
            <div className="row">
              <div  className="col-12 col-md-3 mt-3">
                {this.renderDish(this.state.selectedDish)}
              </div>
            </div>
          </div>
        );
    }
}

export default Menu;