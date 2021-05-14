# Chatapp
![chatapp](https://raw.githubusercontent.com/MartinNevlaha/Chatapp/main/client/public/logo180.png)

Chat App is a small social media app with chat and video calling options. ReactJs is used on client side, nodejs and express framework are used on server side. As DB was is used PostgreSql with Sequelize ORM. Chat uses socket io and video call use Peer to Peer connection with socket io signaling server and custom ICE servers. Redis is used as the cache layer.

# PostgreSql database ERD diagram
![ERD diagram](https://raw.githubusercontent.com/MartinNevlaha/Chatapp/main/server/Chatapp%20ERD%20diagram.png?raw=true);

# Live demo

  Demo is available [here](https://nevy.sk)

# Deploying steps:

 ## Client

  <span style="color:red">For proper functionality it necessary to use HTTPS protocol !!!<span>


 1. Environment variables
    Create .env file in root client directory

    Content of .env:
    ```env
    REACT_APP_ENV_DEPL=production || development
    REACT_APP_WS_CONNECTION_SERVER=ws(s)://your_url
    REACT_APP_BACKEND_URL=http(s)://your_url
    INLINE_RUNTIME_CHUNK=false(optional)
    REACT_APP_STUN_SERVER=your_stun_server
    REACT_APP_TURN_SERVER=turn.server 
    REACT_APP_TURN_SERVER_USERNAME=username
    REACT_APP_TURN_SERVER_PASSWORD=password
    ```
    As you can see you need to provide Stun and Turn servers, because application use WebRTC technology. For more please click [here](https://blog.ivrpowers.com/post/technologies/what-is-stun-turn-server/).
  
1. Install packages
     
     ```packages
     npm install || yarn install
     ```

  1. Production build
     
     ```build
     npm run build || yarn build
     ```
  ## Server

  1. Environment variables 
   
     Create .env file in root client directory

     Content of .env:
     ```env
     NODE_ENV=production || development
     APP_URL=http(s)://your_url
     PORT=your_port
     DATABASE=your_postgresql_database_name
     DB_USERNAME=your_postgresql_database_username
     DB_PASSWORD=your_postgresql_database_password
     DB_HOST=your_postgresql_host
     JWT_SECRET=your_some_salt_for_jwt_token
     JWT_SECRET_MAIL_ACTIVATED=your_some_salt_for_activation_mail_token
     MAIL_USER=your_google_mail_account
     MAIL_PASSWORD=password_to_provided_google_mail_account
     REDIS_HOST=your_redis_host
     REDIS_PORT=your_redis_port
     REDIS_PASSWORD=your_redis_password
     ```
  
  2. Install packages
  
     ```packages
     npm install || yarn install
     ```
  
  3. Run PostgreSql DB migrations

     simply run command

     ```sequelize
     npx sequelize-cli db:migrate || sequelize db:migrate (if you have installed sequelize cli globally)
     ``` 
  4. Run server with command ```npm start``` or recommended use [pm2](https://pm2.keymetrics.io/), [forever](https://github.com/foreversd/forever), [StrongLoop Process Manager](http://strong-pm.io/) or simply use default process manager for Linux [SystemD](https://www.axllent.org/docs/nodejs-service-with-systemd/)


Please feel free to contact me if you need any further information.
