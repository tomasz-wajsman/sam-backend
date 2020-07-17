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
    res.json({ messages: ['Missing or incorrect activity ID'] });
  }
};

const checkActivityDetails = (req, res, next) => {
  let correct = true;
  const body = req.body;
  // check if activity has sufficient and correct parameters
  const activity = body.activity;

  const messages = [];

  // activity name
  const name = activity.name;
  if (!name) {
    correct = false;
    messages.push('Activity name was not provided');
  } else if (name === '') {
    correct = false;
    messages.push('Activity name is empty');
  }

  // category name
  const category = activity.category;
  if (!category) {
    correct = false;
    messages.push('Activity category was not provided');
  } else if (category === '') {
    correct = false;
    messages.push('Activity category is empty');
  }

  // start date
  const startDate = activity.start_date;
  if (!startDate) {
    correct = false;
    messages.push('Start date was not provided');
  } else if (Date.parse(startDate) < 0) {
    correct = false;
    messages.push('Start date is negative');
  }

  // end date
  const endDate = activity.end_date;
  if (!endDate) {
    correct = false;
    messages.push('End date was not provided');
  } else if (Date.parse(endDate) < 0) {
    correct = false;
    messages.push('End date is negative');
  }

  // check dates
  if (Date.parse(startDate) >= Date.parse(endDate)) {
    correct = false;
    messages.push('The start date is same or after end date');
  }

  // distance if provided
  const distance = activity.distance;
  if (distance) {
    const distanceNum = Number.parseFloat(distance);
    if (Number.isNaN(distanceNum)) {
      correct = false;
      messages.push('Incorrect distance');
    } else if (distanceNum <= 0) {
      correct = false;
      messages.push('Zero or negative distance');
    }
  }

  if (correct) {
    res.locals.activity = activity;
    next();
  } else {
    res.status(400);
    res.json({ messages });
  }
};

module.exports = {
  checkActivityID,
  checkActivityDetails
};
