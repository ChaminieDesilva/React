import React, { Component } from 'react';
import { Card, CardImg, List, CardText, CardBody,CardTitle } from 'reactstrap';

class DishDetail extends Component{

    constructor(props) {
        super(props);

    }

    renderComments(dish){
        if (dish!=null && dish.comments!=null) {
            const comm = dish.comments.map((c) => {
                return(
                    <div key={c.id}>
                        <List type="unstyled">
                            <li>{c.comment}</li>
                            <li>--{c.author}, {new Date(c.date).toDateString()}</li>
                        </List>
                    </div>
                )
            });
            return(<div>{comm}</div>);
        }

        else{
            return (<div></div>);
        }
    }

    render(){
        if (this.props.dish != null){
            return(
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Card >
                            <CardImg width="100%" object src={this.props.dish.image} alt={this.props.dish.name} />
                            <CardBody>
                                <CardTitle><h5>{this.props.dish.name}</h5></CardTitle>
                                <CardText>{this.props.dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            {this.renderComments(this.props.dish)} 
                    </div>
                </div>

            );

        }
            
        else
            return(
                <div></div>
            );

    }

}
export default DishDetail;