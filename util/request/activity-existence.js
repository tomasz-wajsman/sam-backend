const managers = require('../../managers');

const activityExists = async (req, res, next) => {
  const activityID = res.locals.activityID;
  try {
    if (await managers.activities.activityExists(activityID)) {
      // the activity exists in database
      next();
    } else {
      res.status(404);
      res.json({ message: 'The activity does not exist ' });
    }
  } catch (e) {
    res.status(500);
    res.json({ message: 'Could not check the activity' });
  }
};

module.exports = {
  activityExists
};
