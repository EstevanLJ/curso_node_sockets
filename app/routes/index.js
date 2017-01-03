module.exports = function (app) {
  app.get('/', function(request, response) {
    app.app.controllers.index.index(app, request, response);
  })
}
