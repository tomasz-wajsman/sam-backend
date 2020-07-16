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

module.exports = {
  checkActivityID
};
