# .env variables
To run the application, it is necessary to create a .env file in social_server dir and add the following code to it.
```
DATABASE_URL="mongodb://${your_mongo_username}:${mongo_password}@localhost:27017/mydatabase?authSource=admin&directConnection=true"
DOCKER_URL="mongodb://${your_mongo_username}:${mongo_password}@db-1:27017/mydatabase?authSource=admin&directConnection=true"
SECRET_KEY="lolkekarbuzdogc98n287tc6wiyuwarIUH653r25E$%@#^#874g3bffsdgdsyfh87wr273tic8c9pK(#)U*($bfuevx)A_*#()&^&Y*FYS^%%#%@$Y*(*R_sk)"
MONGO_INITDB_ROOT_USERNAME="${your_mongo_username}"
MONGO_INITDB_ROOT_PASSWORD="${mongo_password}"
DOCKER_PORTS="3001:3000"
```

# Installation
1. Clone repository:

```bash
git clone https://github.com/metathen/social_client.git
git clone https://github.com/metathen/social_server.git
cd social_server
```

2. Run docker:

```bash
docker compose up
```