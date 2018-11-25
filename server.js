var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    users = [];
var _ = require('underscore');

//specify the html we will use
app.use('/build', express.static(__dirname));
//bind the server to the 80 port
//server.listen(3000);//for local test
server.listen(process.env.PORT || 3000);//publish to heroku
//server.listen(process.env.OPENSHIFT_NODEJS_PORT || 3000);//publish to openshift
//console.log('server started on port'+process.env.PORT || 3000);
//handle the socket
io.sockets.on('connection', function(socket) {
    //new user login

    socket.on('login', function(nickname) {

        if (users.indexOf(nickname) > -1) {
            socket.emit('nickExisted');
        } else {
            //socket.userIndex = users.length;
            socket.nickname = nickname;
            users.push(nickname);
            socket.emit('loginSuccess');
            io.sockets.emit('system', nickname, users, 'login');
            socket.broadcast.emit('notice', nickname, users, 'login');
        };
    });
    //user leaves
    socket.on('disconnect', function() {
        if (socket.nickname != null) {
            //users.splice(socket.userIndex, 1);
            users.splice(users.indexOf(socket.nickname), 1);
            socket.broadcast.emit('system', socket.nickname, users, 'logout');
            socket.broadcast.emit('notice', socket.nickname, users, 'logout');
        }
    });

    socket.on('SayTo',function (data) {
        var toName = data;
        var toSocket;
        if(toSocket = _.findWhere(io.sockets.sockets,{nickname:toName})){
            toSocket.emit('message',data.msg);
        }
    })
    //new message get
    socket.on('postMsg', function(msg,names) {
      var toSocket;
      if(names == ''){
        socket.broadcast.emit('newMsg', socket.nickname, msg);
      }else{
        if(toSocket = _.findWhere(io.sockets.sockets,{nickname:names})){
            toSocket.emit('newMsg',socket.nickname, msg);
        }
      }

    });
    //new image get
    socket.on('img', function(imgData, color) {
        socket.broadcast.emit('newImg', socket.nickname, imgData, color);
    });
});
