import React from 'react';
import { Card, CardImg, List, CardText, CardBody,CardTitle } from 'reactstrap';

    function RenderComments({comments}){
        if (comments!=null) {
            const comm = comments.map((c) => {
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

    function RenderDish({dish}){
        return(
            <div key={dish.id}>
                <Card >
                    <CardImg width="100%" object src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle><h5>{dish.name}</h5></CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }

    function DishDetail({dish}){
        if (dish != null){
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish = {dish}/>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                                <h4>Comments</h4>
                                <RenderComments comments = {dish.comments}/>
                        </div>
                    </div>
                </div>

            );

        }
            
        else
            return(
                <div></div>
            );

    }

export default DishDetail;