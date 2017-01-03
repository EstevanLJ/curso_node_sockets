module.exports.iniciaChat = function(app, request, response){

  var dadosForm = request.body;

  request.assert('apelido', 'Nome ou apelido é obrigatório!').notEmpty();
  request.assert('apelido', 'Nome ou apelido deve conter entre 3 e 20 caracteres').len(3, 20);

  var errors = request.validationErrors();

  if(errors) {
    response.render('index', { validacao : errors, value : {apelido : dadosForm.apelido } });
    return;
  }

  app.get('io').emit('msgParaCliente', {
    apelido: dadosForm.apelido,
    mensagem: 'Acabou de entrar no chat!'
  });


  response.render('chat', {dadosForm : dadosForm});

}
