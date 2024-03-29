---
title: Environments
has_children: false
nav_order: 7
---

# Environments

Create or replace **.env** file in the root of the project:

### Development

```bash
PROJECT_MODE=development
PROJECT_NAME=example-name
SERVER_HOSTNAME=localhost
SERVER_PORT=8000
SERVER_WEBSOCKET_PORT=8001
SWAGGER_HOSTNAME=localhost
SWAGGER_API_DOCS=true
JWT_SECRET_KEY=shhhh
MONGODB_HOSTNAME=127.0.0.1
MONGODB_PORT=27017
MONGODB_DATABASE=example-dev
MONGODB_USERNAME=
MONGODB_PASSWORD=
REDIS_HOSTNAME=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=
```

### Testing

```bash
PROJECT_MODE=testing
PROJECT_NAME=example-name
SERVER_HOSTNAME=localhost
SERVER_PORT=9000
SERVER_WEBSOCKET_PORT=9001
SWAGGER_HOSTNAME=test-api.example.com
SWAGGER_API_DOCS=true
JWT_SECRET_KEY=test123
MONGODB_HOSTNAME=mongo
MONGODB_PORT=27017
MONGODB_DATABASE=example-test
MONGODB_USERNAME=test_user
MONGODB_PASSWORD=6u5hWW8A4HBCbCUF
REDIS_HOSTNAME=redis
REDIS_PORT=6379
REDIS_PASSWORD=CDEkW6jfPQ3rKSyK
```

### Production

```bash
PROJECT_MODE=production
PROJECT_NAME=example-name
SERVER_HOSTNAME=localhost
SERVER_PORT=10000
SERVER_WEBSOCKET_PORT=10001
SWAGGER_HOSTNAME=prod-api.example.com
SWAGGER_API_DOCS=false
JWT_SECRET_KEY=prod123
MONGODB_HOSTNAME=mongo
MONGODB_PORT=27014
MONGODB_DATABASE=example-prod
MONGODB_USERNAME=prod_user
MONGODB_PASSWORD=PzKypJp8VsUDF5gZ
REDIS_HOSTNAME=redis
REDIS_PORT=6374
REDIS_PASSWORD=7pzMggTEw3MxQ76W
```
