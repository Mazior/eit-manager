import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Eits } from "../api/eits";

const buttonStyle = {
    margin: "10px 15px",
    maxWidth: "120px"
  }
class ListEits extends Component {
    handleEdit = (eitId) => {
        // onEdit we want to have the form on AddEits populate the fields and allow for editing
        // so we pass the eitId to the parent component so that it tells AddEit component what data is to be displayed
        this.props.handleEdit(eitId);
      }
    
      handleDelete = (eitId) => {
        // onDelete we just remove the eit from the db
        Eits.remove({_id: eitId});
      }
  render() {
    return (
        <div>
        {
          this.props.eits.length ? this.props.eits.map((eit) => (
            <div className="list-group" key={eit._id} style={{ margin: "20px 100px" }}>
              <div className="list-group-item list-group-item-action flex-column align-items-start">

                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{eit.firstname} {' '} {eit.surname} {' '} {eit.age}</h5>
                </div>

                {/* <p className="mb-1"></p> */}

                <div className="controls row">
                  <button
                    className="btn btn-outline-warning col"
                    data-toggle="modal"
                    data-target="#myModal"
                    type="button"
                    style={buttonStyle}
                    onClick={() => this.handleEdit(eit._id)}
                  >
                    Edit EIT
                  </button>

                  <button
                    className="btn btn-outline-danger col"
                    style={buttonStyle}
                    onClick={() => this.handleDelete(eit._id)}
                  >
                    Delete EIT
                  </button>
                </div>

              </div>
            </div>
          )) :
          <div className="no-eits text-center" style={{ padding: "100px 0" }}>OOOPSY: NO EITS REGISTERED AS YET</div>
        }
      </div>
    );
  }
}

export default withTracker(() => {
    return {
      eits: Eits.find({}). fetch()
    }
  })(ListEits);