const home = require('./home');

const activitiesListGet = require('./activities/activities-list');
const activitiesItemGet = require('./activities/activities-item');

module.exports = {
  routes: [
    home,
    activitiesListGet,
    activitiesItemGet
  ]
};
