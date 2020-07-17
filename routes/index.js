const home = require('./home');

const ActivitiesListRouter = require('./activities/list');
const ActivitiesItemRouter = require('./activities/item');

module.exports = {
  routes: [
    home,
    ActivitiesListRouter,
    ActivitiesItemRouter
  ]
};
