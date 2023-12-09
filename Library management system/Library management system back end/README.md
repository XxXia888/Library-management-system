# Library management system(back end)

# It needs to be used with the 'Library system front end'

# Launch

## Install nodejs

1. Install nodejs，version >= 14，(NodeJs install)[https://nodejs.org/en]

## Install Docker

1. Install Docker，Go to [Docker website](https://www.docker.com/) to download and install it

2. Open CMD and input command: 'docker pull mongo:latest' to install the latest Mongo

3. Open a terminal or command line window and enter the following command to pull the Mongo image:

   ```
   docker pull mongo
   ```

4. After the image is downloaded, enter the following command to start the Mongo container:

   ```
   docker run -d -p 27017:27017 --name mongodb mongo

   ```

5. Wait a few seconds, and the Mongo container will be up and running. You can use the following command to check the container status:

   ```
   docker ps

   ```

   If you see the 'mongodb' container running, Mongo has started successfully.

6. To stop the Mongo container, use the following command:

   ```
   docker stop mongodb

   ```

## Install data visualization tools

To Navicat website (https://www.navicat.com/en/download/navicat-premium) download the appropriate version of the operating system, such as Windows or macOS.

You can use navicat to connect mongo with port 27017 enabled above.

There is a mongodb folder in the root directory of the project that contains the underlying data. After the import through navicat, you can use the start 'Library system front end', log in the Administrator(account: admin, password: admin), User(account: admin, password: user) two accounts to perform operations.

## Launch back end project

1. Download the dependency package and execute

   ```shell
   npm install
   ```

2. Run the project

   ```shell
   npm run dev
   ```

