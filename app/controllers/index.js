module.exports.index = function(app, request, response){

    response.render('index', { validacao : [], value : {apelido : '' } });

}
