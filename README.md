# Collections API

## Users Routes

### Create user

POST `http://localhost:3001/api/users`

### Login

POST `http://localhost:3001/api/login`

The api will generate a bearer token which will be needed for other endpoints

### Get all users

GET `http://localhost:3001/api/users`

Requires token

### Get user by id

GET `http://localhost:3001/api/users/:id`

Requires token

### Update user

PUT `http://localhost:3001/api/users`

### Advance update potions

PUT `http://localhost:3001/api/users/sudo/:id`

Requires token and admin privilege

### Delete User

DELETE `http://localhost:3001/api/users`

Requires token

## Collections Routes

### Create Collection

POST `http://localhost:3001/api/collections`

Requires token

### Get all collections

GET `http://localhost:3001/api/collections`

Requires token

### Get collection by id

GET `http://localhost:3001/api/collections/:id`

### Update Collection

PUT `http://localhost:3001/api/collections/:id`

Requires token

### Delete Collection

DELETE `http://localhost:3001/api/collections/:id`

Requires token

## Fields Routes

### Create Field

POST `http://localhost:3001/api/fields/:id`

The id must reference the collection of the field

Requires token

### Get All Fields

GET `http://localhost:3001/api/fields/from/:id`

The id must reference the collection of the fields

### Get field by id

GET `http://localhost:3001/api/fields/from/:id`

### Update Field

PUT `http://localhost:3001/api/fields/:id`

Requires token

### Delete Field

DELETE `http://localhost:3001/api/fields/:id`

Requires token
