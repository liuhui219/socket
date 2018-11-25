import '../public/index.css';
import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import Left from './left/index.js';
import Right from './right/index.js';
import io from 'socket.io-client/dist/socket.io';
import 'antd/dist/antd.css';
import { notification,Icon } from 'antd';
global.socket = io('http://localhost:3000');

export default class Mian extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isshow:true,
      user:[],
    };
  }
  componentWillMount(){
    var that = this;

    socket.on('connect', function(){
      socket.on('notice', function(nickName, userCount, type) {
          var msg = nickName + (type == 'login' ? ' 加入聊天' : ' 离开房间');
          notification.open({
            message: '新通知11',
            description: msg,
            icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
          });
      });
    });
    socket.on('loginSuccess', function() {
      that.setState({
        isshow:false,
      })
    });
    socket.on('system', function(nickName, userCount, type) {
        that.setState({
          user:userCount,
        })
    });




  }
  componentDidMount(){
    var that = this;

  }
  login(){
    var that = this;
    var nickName = this.refs.myInput.value;
    if (nickName.trim().length != 0) {
        socket.emit('login', nickName);
        console.log(that.socket)
    } else {
        nickName.focus();
    };
  }


  render() {
    return (
      <div className="main">
        {this.state.isshow ? <div className='inputs'>
          <li>
            用户名：<input ref="myInput" type="text" />
          </li>
          <li onClick={this.login.bind(this)}>登录</li>
        </div> : null}
        {!this.state.isshow ? <Left user={this.state.user}/> : null}
        {!this.state.isshow ? <Right /> : null}
      </div>
    );
  }
}
