# PressPlay

PressPlay is a video streaming website that lets you upload and view videos, like/dislike them, and comment on others (a la YouTube kind of service).  

Built using the MERN stack (MongoDB, ExpressJS, ReactJS, NodeJS)

## Installation
1. Clone this repository  
```bash
$ git clone https://github.com/asarj/PressPlay.git
```
2. Navigate to the `server/config` directory  
```bash 
$ cd server/config
```
3. Create a `dev.js` file  
```bash
$ touch dev.js
```
4. In the `dev.js` file, you will need to specify the URI to your MongoDB database.  
    1. This can be obtained by logging into your MongoDB account and heading to your database cluster. From here, the URI can be found at:  
    Clusters > Command Line Tools > Connect To Your Cluster > Connect Instructions > Connect your application (Make sure that Node.js is the selected driver and 3.0 or later is the selected version.)  
    2. Once you've navigated to the correct page that has your MongoDB URI, the connection string should look something like this:  
    `mongodb+srv://<username>:<password>@cluster0-jl7lm.mongodb.net/test?retryWrites`  
    where `<username>` is the username to your cluster account and `<password>` is the corresponding password to your account
    3. Copy this string and navigate back to `dev.js`, where you will paste the following code:  
    ```javascript
    module.exports = {
        mongoURI: '<insert MongoURI here>'
    }
    ```
    where `<insert MongoURI here>` is the connection string you found in step 4.2. You can also look at `dev-example.js` for a sample as to what it should look like
5. Save the `dev.js` file
6. Install the server dependencies  
    1. Navigate back to the project root directory
    ```bash
    $ cd ../../
    ```
    2. npm install the server dependencies
    ```bash
    $ npm install
    ```
7. Install the client/front-end dependencies
    1. Navigate to the client directory
    ```bash
    $ cd client/
    ```
    2. npm install the client dependencies
    ```bash
    $ npm install
    ```
8. Navigate back to the project root directory
```bash
$ cd ..
```
9. Run the application!
```bash
$ npm run dev
```
10. Visit `localhost:3000` to check it out!

## Features
### Sign Up Page
![Sign Up Page](./readme-images/signup.png)

### Sign In Page
![Login Page](./readme-images/login.png)


## In Progress / Coming Soon
- Search bar functionality
- Machine learning integration for new videos to watch
- Dedicated user pages
- Modal alerts instead of browser alerts