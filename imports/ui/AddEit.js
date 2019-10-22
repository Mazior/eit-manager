import React, { Component } from 'react';
import { Eits } from "../api/eits";

class AddEit extends Component {
  constructor(props) {
    super(props);
    this.state = {
        eit: props.eit,
        isUpdating: props.isUpdating
    }
  }

  handleChange = (event) => {
    const field = event.target.name;

    // we use square braces around the key `field` coz its a variable (we are setting state with a dynamic key name)
    this.setState({
      [field]: event.target.value
    })
  }

    // React Lifecycle method that runs when props are updated and sets them into state
    componentWillReceiveProps(nextProps) {
        this.setState({
          eit: nextProps.eit,
          isUpdating: nextProps.isUpdating
        });
      }

      handleChange = (eit) => {
        const field = eit.target.name;
    
        // onChange we take the eit in state and create a new object thats updated depending on which field has changed
        // we use square braces around the key `field` coz its a variable (we are setting state with a dynamic key name)
        const newEit = Object.assign({}, this.state.eit, {[field]: eit.target.value});
    
        // we then set new eit object into state
        this.setState({
          eit: newEit
        })
      }


  handleSubmit = (eit) => {
    eit.preventDefault();
        const { firstname, surname, age } = this.state.eit;
        if (!this.props.isUpdating) {
            Eits.insert({
            firstname,
            surname,
            age 
            });
        } else {
            Eits.update(this.state.eit._id, {
            $set: {
            firstname,
            surname,
            age 
            }
            });
    
            this.setState({
            isUpdating: false
            })
        }
    
        const newEit = {
            firstname:"",
            surname:"",
            age :""
        }
    
        this.setState({
            eit: newEit
        })
}

renderSubmitButton() {
    // renders submit button dynamically depending on whether isUpdating flag is true/false
    if(this.state.isUpdating) {
      return ( <button type="submit" className="btn btn-primary">Update EIT</button> );
    }
      return( <button type="submit" className="btn btn-primary">Add EIT</button> );
  }

  render() {
    const { eit } = this.state;

    return (
      <div>
        <div className="text-center">
          <h4>Eit Data</h4>
        </div>
        <hr />

        <div className="jumbotron" style={{ margin: "0 500px" }}>
             <form onSubmit={this.handleSubmit}>

            <div className="form-group">
              <label>Firstname:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Firstname"
                name="firstname"
                value={eit.firstname ? eit.firstname : ""}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label>Surname:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Surname"
                name="surname"
                value={eit.surname ? eit.surname : ""}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label>Age:</label>
              <input
                type="int"
                className="form-control"
                placeholder="Enter Age"
                name="age"
                value={eit.age ? eit.age : ""}
                onChange={this.handleChange}
              />
            </div>

            {this.renderSubmitButton()}

          </form>
        </div>
      </div>
    );
  }
}

export default AddEit;
