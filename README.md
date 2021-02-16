Install dependencies in main directory

```
npm install
```

Then install dependencies in backend folder

```
cd backend
npm install
```

Create a .env file inside the 'backend' folder
Remember to create a MongoDB database and pass the connection to a variable called ATLAS_URI, eg:

```
ATLAS_URI=<mongo-connection>
```

Once the database is set up and dependencies are installed, open up two terminals. One in the main directory, and one in the 'backend' directory

In the 'backend' directory, run:

```
nodemon server
```

and in the main directory, run:

```
npm start
```
