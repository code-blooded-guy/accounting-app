import redisAdapter from 'socket.io-redis';
// Constants
import {
  SERVER_WEBSOCKET_PORT,
  REDIS_HOSTNAME,
  REDIS_PORT,
  REDIS_PASSWORD
} from '@/constants/config.constant';
// Business
// import UserBusiness from '@/business/users.business';
// Utils
import autoload from '@/utils/autoload.util';
import { mws } from '@/utils/middleware.util';


// const PORT = require('net').isIP(REDIS_HOSTNAME) ? `:${REDIS_PORT}` : '';

// io.adapter(
//   redisAdapter(
//     REDIS_PASSWORD
//       ? `redis://:${REDIS_PASSWORD}@${REDIS_HOSTNAME}${PORT}/1`
//       : `redis://${REDIS_HOSTNAME}${PORT}/1`
//   )
// );
// io.eio.pingTimeout = 120000; // 2 minutes
// io.eio.pingInterval = 5000; // 5 seconds
global.onlineUsers = new Map();
const connect = (server) =>
new Promise((resolve) => {
  const io = require('socket.io')(server,{ 
    cors: {
      origin: "http://localhost:3000"
    }
  });
    console.log(`✅ Socket: initiated!`);
    // connection
    io.on('connection', (socket) => {
      // console.log(`❕Socket: client connected! (${socket.id})`);
      
      global.chatSocket = socket;
      socket.on('add-user', (user_id) => {
        global.onlineUsers.set(user_id, socket.id);
        // console.log(user_id,'user_id',socket.id,', socket.id')
        
      });


      socket.on('send-msg', (data) => {
        global.onlineUsers = new Map();
        console.log(data,'dataaaaaaaa')
        console.log(global.onlineUsers,'onlineUsers');

        const sendUserSocket = global.onlineUsers.get(data.to);
        // console.log(global.onlineUsers,'sendUserSocket');
        // console.log(`global.onlineUsers=${JSON.stringify(Array.from(global.onlineUsers.entries()))}`,'second console');

        // if (sendUserSocket) {
          console.log(sendUserSocket,'sendUserSocket')
          socket.to(sendUserSocket).emit('msg-recieve', data);
          console.log(socket.to(sendUserSocket).emit('msg-recieve', data));
        // }
      });

      // disconnect
      socket.on('disconnect', (reason) => {
        console.log(`❕Socket: client disconnected! (${socket.id}) ${reason}`);
        // UserBusiness.removeSocket(socket);
      });
      // socket.set("pingTimeout", 63000);
      // autoload
      autoload.sockets(socket, io);
      resolve();
    });

    // middleware
    io.use(async (socket, next) => {
      socket.onAny(async (event) => {
        console.log(`Socket: event: ${event} (${socket.id})`);
      });

      const _next = await mws(socket, next);
      // UserBusiness.setSocket(socket);
      return _next;
    });
  });

// global.onlineUsers = new Map();
// const connect = (server) =>
// new Promise((resolve) => {
//   const io = require('socket.io')(server,{ 
//     cors: {
//       origin: "http://localhost:3000"
//     }
//   });
//     console.log(`✅ Socket: initiated!`);
//     // connection
//     io.on('connection', (socket) => {
//       // console.log(`❕Socket: client connected! (${socket.id})`);
      
//       global.chatSocket = socket;
//       socket.on('add-user', (user_id) => {
//         global.onlineUsers.set(user_id, socket.id);
//         console.log(user_id,'user_id',socket.id,', socket.id')
//       });


//       socket.on('send-msg', (data) => {
//         console.log(data,'dataaaaaaaa')
//         console.log(global.onlineUsers,'onlineUsers');

//         const sendUserSocket = global.onlineUsers.get(data.to);
//         console.log(global.onlineUsers,'sendUserSocket');
       
//         if (sendUserSocket) {
//           console.log(sendUserSocket,'sendUserSocket')

//           console.log(data.msg,'data.msg')
//           socket.to(sendUserSocket).emit('msg-recieve', data.msg);
//         }
//       });
//     });
// });


// const connections = () => io.engine.clientsCount;

export { connect };
