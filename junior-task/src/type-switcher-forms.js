// import { React, Component } from "react";
// import "./App.css";

// export class BookAddForm extends Component {
//   constructor(props) {
//     super(props);
//     state = {
//       weight: 0,
//       title: 'Weight:',
//       key: 'Book'
//     };

    // onLabelChange = (e) => {
    //   this.setState({
    //     weight: e.target.value,
    //   });
    // };

//     onSubmit = (e) => {
//       e.preventDefault();
//       this.props.onCreateItem(this.state.weight);
//       this.setState({
//         weight: 0,
//       });
//     };
//   }
//   render() {

//     return (
//       <>
//         <div className="product" key={this.state.key}>
//           <div className="product-info row">
//             <span>{this.state.title}</span>
//             <input
//               type="text"
//               value={this.state.weight}
//               onChange={this.onLabelChange}
//               placeholder="Weight in KG"
//             />
//           </div>
//         </div>
//       </>
//     );
//   }
// }
