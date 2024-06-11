
# PayTM

Here I am building a basic version of PayTM using the following tech stack.

## Techstack

### Backend:
<u>Node.js</u> : Runtime environment to run javascript code.

<u>Express</u> : Framework to create/handle backend API endpoints.

<u>Mongoose</u> : To connect to MongoDB database.

<u>MongoDB</u> : Database.

### Frontend:

<u>React</u> : As a frontend framework.

## Note

To utilize transactions, MongoDB must be configured as a replica set or a sharded cluster. Transactions are not supported on standalone deployments. If you are using a database hosted on Atlas, you do not need to worry about this as every Atlas cluster is either a replica set or a sharded cluster. If you are hosting your own standalone deployment, follow <a href="https://docs.mongodb.com/manual/tutorial/convert-standalone-to-replica-set/">these instructions</a> to convert your instance to a replica set.


