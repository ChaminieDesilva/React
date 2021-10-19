import React, {Component} from 'react';
import { Button, Label, Col, Row, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Control, LocalForm, Errors} from 'react-redux-form';

const required = (val)=> val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component{

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

    handleSubmit(values){
        console.log("current Sate is " + JSON.stringify(values));
        alert("current Sate is " + JSON.stringify(values));
        this.toggleModal();
    }

    render(){
        return(
            <div>
                <Button  outline onClick={this.toggleModal}  ><span className="fa fa-pencil"></span> Submit Comment</Button>

                <Modal isOpen = {this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader isOpen = {this.state.isModalOpen} toggle={this.toggleModal}>Submit Comment</ModalHeader>
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
                            <Label htmlFor="name">Your Name</Label>
                            <Col >
                                <Control.text model=".name" id="name" name="name" placeholder="Your Name" 
                                className = "form-control"
                                validators = {{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                                />
                                <Errors 
                                className= "text-danger"
                                model=".name"
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
export default CommentForm;