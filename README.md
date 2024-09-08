# Collections API

## User Routes

### Create user

POST `http://localhost:3001/api/login`

### Login

POST `http://localhost:3001/api/login`

The api will generate a bearer token which will be needed for other endpoints

### Get all users

GET `http://localhost:3001/api/users`

Requires token

### Get user by id

GET `http://localhost:3001/api/users/1`

Requires token

### Update user

PUT `http://localhost:3001/api/users`

### Advance update potions

PUT `http://localhost:3001/api/users/sudo/1`

Requires token and admin privilege

### Delete User

DELETE `http://localhost:3001/api/users`

Requires token
