'use strict';

const io = require('socket.io');

exports.init = (io, socket) => {
  socket.on('backEnd', data => {
    console.log('FR: FrontEnd\n', data);
  });

  let testBackEnd = 'FrontEnd, BackEnd: TEST';
  socket.emit('mainCtrl', testBackEnd);



};
