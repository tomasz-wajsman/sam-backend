const home = require('./home');

const ActivitiesRouter = require('./activities');

module.exports = {
  routes: [
    home,
    ActivitiesRouter
  ]
};
