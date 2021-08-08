import { Component } from 'react';
import { Navbar, NavbarBrand} from 'reactstrap';
import Menu from './components/MenuComponent';
import './App.css';
import { DISHES } from './shared/dishes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    };
  }
  render() {
    return (
      <div>
        <Navbar navbar-light color = "dark">
          <div className="container">
            <NavbarBrand href="/">
              My Restaurant :)
            </NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes}/>
      </div>
    );
  }
}

export default App;
