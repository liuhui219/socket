import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import './css/style.css';
class Left extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  To(data){
    this.props.dispatch({ type: 'INCREMENT' ,text:data})
  }
  render() {
    return (
      <div className='Left_main'>
        {this.props.user.map((data,i)=>{
          return <li onClick={this.To.bind(this,data)} key={i}>{data}</li>
        })}
      </div>
    );
  }
}
export default connect()(Left);
