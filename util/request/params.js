const checkActivityID = (req, res, next) => {
  const params = req.params;
  // check if the request params contain the activity ID
  const regex = new RegExp(/([0-9a-f]){23}\w+/);
  const activityID = params.activityID;
  if (activityID && regex.test(activityID)) {
    res.locals.activityID = activityID;
    next();
  } else {
    res.status(400);
    res.json({ message: 'Incorrect activity ID' });
  }
};

const checkActivityDetails = (req, res, next) => {
  const body = req.body;
  // check if activity has sufficient and correct parameters
  const activity = body.activity;

  res.locals.activity = activity;
  next();
};

module.exports = {
  checkActivityID,
  checkActivityDetails
};
