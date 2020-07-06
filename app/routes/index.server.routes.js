var index = require('../controllers/index.server.controller');
let sessions = require('./wriec_sessions.json');

module.exports = function(app) {
  app.get('/data', function(req, res) {
    res.json(sessions);
  });
  app.route('/').get(index.render);
};