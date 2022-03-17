import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import './style/style.scss';

import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


// class MyForm extends React.Component {
//   myRef = React.createRef();


//   componentDidMount() {
//     this.myRef.current.focus()
//   }



//   render() {
//     return (
//       <div>
//         <div style={{
//           'width': '600px',
//           'margin': '30px auto 0',
//           'padding': '20px',
//           'boxShadow': '10px 10px 20px rgba(0,0,0, .2)'
//         }}>
//           <Form>
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control 
//               ref={this.myRef}
//               type="email" 
//               placeholder="Enter email" />
//               <Form.Text className="text-muted">
//                 We'll never share your email with anyone else.
//               </Form.Text>
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" placeholder="Password" />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formBasicCheckbox">
//               <Form.Check type="checkbox" label="Check me out" />
//             </Form.Group>
//             <Button variant="primary" type="submit">
//               Submit
//             </Button>
//           </Form>
//         </div>
//       </div >
//     )
//   }
// }



ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <MyForm /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

