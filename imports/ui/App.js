import React, { Component } from 'react';
import AddEit from './AddEit';
import ListEits from './ListEits';
// import { withTracker } from 'meteor/react-meteor-data';
import { Eits } from "../api/eits";


class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isUpdating: false,
        eit: {}
      }
    }
  
    handleEdit = (eitId) => {
      // find the event that requires editing
      const eit = Eits.findOne({_id: eitId});
  
      // set it into state also sets a flag `isUpdating` that will allow a dynamic form on AddEit component
      this.setState({
        eit,
        isUpdating: true
      })
    }
  
    render() {
      return (
        <div>
         
          <AddEit
            eit={this.state.eit}
            isUpdating={this.state.isUpdating}
          />
          
          <ListEits handleEdit={this.handleEdit} />
        </div>
      );
    }
  }
  
  export default App;
// class App extends Component {
//     render() {
//       return (
//         <div>
//           <AddEit />

//           <ListEits {...this.props} />

//           {/* <pre>DB Stuff: {JSON.stringify(this.props, null, ' ')} </pre> */}
//         </div>
//       );
//     }
//   }
  
//   // Wrap `EventApp` with the HOC withTracker and call the new component we get `App`
// //   const App = withTracker(() => {
// //     return {
// //       eits: Eits.find({}). fetch()
// //     }
// //   })(EitApp);


// export default App;