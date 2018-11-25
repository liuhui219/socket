import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import './css/style.css';
var Data = [];
class Right extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true,Data:[],};
  }

  componentDidMount(){
    Data = [];
    var that = this;
    socket.on('newMsg', function(user, msg) {
        console.log(msg)
        Data.push({'type':1,'msg':msg,user:user,time:new Date().toTimeString().substr(0, 8)});
        that.setState({Data:Data});
    });

  }
  sent(){
    var msg = this.refs.textarea.value;

      socket.emit('postMsg', msg,this.props.todolist);
      Data.push({'type':0,'msg':msg,user:'我',time:new Date().toTimeString().substr(0, 8)});
      this.setState({Data:Data});
      this.refs.textarea.value = '';
  }
  render() {
    return (
      <div className='Right_main'>
        <div className="Right_content">
          {this.state.Data.map((info,i)=>{
            if(info.type == 0){
              return <div style={{flex:1,flexDirection:'column'}} key={i}>
                 <ul style={{flex:1,justifyContent:'center',alignItems:'center',}}>
                   <li className="IsMe">{info.time}</li>
                 </ul>
                 <ul className="MeMsg">
                   <li>{info.msg}</li>
                   <li style={{marginLeft:15,marginRight:15}}>{info.user}</li>
                 </ul>
              </div>
            }
            if(info.type == 1){
              return <div style={{flex:1,flexDirection:'column'}} key={i}>
                 <ul style={{flex:1,justifyContent:'center',alignItems:'center',}}>
                   <li className="IsMe">{info.time}</li>
                 </ul>
                 <ul className="GustMsg">
                   <li style={{marginLeft:15,marginRight:15}}>{info.user}</li>
                   <li>{info.msg}</li>
                 </ul>
              </div>
            }

          })}
        </div>
        <div className="Right_msg">
          <div className='Msg_sub'>
          </div>
          <div className='Msg' >
              <textarea ref='textarea' className="Msg_text"></textarea>
          </div>
          <div className='Msg_sent'>
            <button className='sent' onClick={this.sent.bind(this)}>发送</button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return { todolist: state.todolist };
};
export default connect(mapStateToProps)(Right);
