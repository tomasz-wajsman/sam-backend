# Sports Activity Manager Backend

This Express.js application is the server for the mobile and web client. It allows the user to manage their sport activities. It uses the MongoDB database system.

### Functionalities
* show the saved activities
* show the selected activity details
* add a new activity
* modify an existing activity
* delete an activity

### How to configure the server?
1. Create the file named *.env* in the server directory
2. The file must contain this content:

* PORT=8080 (server port)
* DATABASE_PROVIDER=mongoose (database provider, must be **mongoose**)
* DATABASE_HOST=localhost (MongoDB server hostname)
* DATABASE_PORT=27017 (MongoDB server port)
* DATABASE_NAME=activities (MongoDB database name)

### How to use this application?
1. Clone this repository
2. Configure the server as shown in *How to configure the server?* section
3. Start the server

### API endpoints
* **GET /** - home route
* **GET /activities** - get the list of all activities
* **GET /activities/{ID}** - get a single activity by its ID
* **POST /activities** - create an activity
* **PUT /activities/{ID}** - modify an activity
* **DELETE /activities/{ID}** - delete an activity