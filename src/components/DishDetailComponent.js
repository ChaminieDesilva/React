import React, { Component } from 'react';
import { Card, CardImg, List, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Label, Col, Row, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isModalOpen: false
        };
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);

    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}  ><span className="fa fa-pencil"></span> Submit Comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader isOpen={this.state.isModalOpen} toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Col>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Col >
                                    <Control.text model=".author" id="author" name="author" placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment" >Your Comment</Label>
                                <Col >
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}


function RenderComments({ comments, postComment, dishId }) {
    if (comments != null) {

        const comm = comments.map((c) => {
            return (
                <Fade in>
                    <div key={c.id}>
                        <List type="unstyled">
                            <li>{c.comment}</li>
                            <li>--{c.author}, {new Date(c.date).toDateString()}</li>
                        </List>
                    </div>
                </Fade>
            );
        });

        return (<div>
            {comm}
            <CommentForm dishId={dishId} postComment={postComment} />
        </div>);
    }

    else {
        return (<div></div>);
    }
}

function RenderDish({ dish }) {
    return (
        <div key={dish.id}>
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card >
                    <CardImg width="100%" object src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle><h5>{dish.name}</h5></CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    )
}

function DishDetail(props) {

    if (props.isLoading) {
        return (
            <div className='container'>
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMes}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return (
            <div className="container">

                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active >{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <Stagger in>
                            <RenderComments
                                comments={props.comments}
                                postComment={props.postComment}
                                dishId={props.dish.id}
                            /></Stagger>
                    </div>
                </div>
            </div>

        );

    }

    else
        return (
            <div></div>
        );

}

export default DishDetail;