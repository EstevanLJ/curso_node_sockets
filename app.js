var app = require('./config/server');

var server = app.listen(8080, function () {
  console.log("Servidor Online!");
});

/* O socket.io também escutará na 8080 */
var io = require('socket.io').listen(server);

app.set('io', io);

/* Criar a conexao com o WebSocket */
io.on('connection', function(socket){
  console.log("Cliente conectado!");

  socket.on('disconnect', function(){
    console.log("Cliente desconectado!");
  })

  socket.on('msgParaServidor', function (data) {
    /* Envia para o cliente que disparou o evento */
    socket.emit('msgParaCliente', {
      apelido: data.apelido,
      mensagem: data.mensagem
    });

    /* Envia para todos os clientes */
    socket.broadcast.emit('msgParaCliente', {
      apelido: data.apelido,
      mensagem: data.mensagem
    });

    /* Atualizar participantes */
    if(parseInt(data.mensagem_apelido_atualizado) == 0) {
      socket.emit('participantesParaCliente', {
        apelido: data.apelido
      });

      /* Envia para todos os clientes */
      socket.broadcast.emit('participantesParaCliente', {
        apelido: data.apelido
      });
    }


  });


});
