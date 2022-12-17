# cis-550-project

Steps:

 1. Navigate to the directory `cis-550-project/server` and run the command `npm i` in the terminal
 2. Navigate to the directory `cis-550-project/client/cis-550-project` and run the command `npm i` in the terminal
 3. Install Redis on your device
	 - If you are on MacOS then run the command `brew install redis` followed by the command `redis-server` in a new terminal
	 - Otherwise see here: https://redis.io/docs/getting-started/installation/ 
4. Create a file called `.env`
	- **NOTE:** this is not a typo. The file should be called `.env`
	- It should **NOT** be called `env.env`, `env.txt` or anything else
	- If your operating system tells you that you cannot create a file with that name then use VSCode to create the file.
5. Paste the line below into the `.env` file:
	- ATLAS_URI=mongodb+srv://user2:C4tS0upYum@cluster0.mjlo8qs.mongodb.net/?retryWrites=true&w=majority
6. Save the file and move it to the location `cis-550-project/server` such that the new path location of the file is `cis-550-project/server/.env`
7. Run the script `npm redis` in directory folder location `cis-550-project/server` in the terminal.
8. Run the script `npm start` in directory folder location `cis-550-project/server` in the terminal.
9. Run the script `npm start` in directory folder location `cis-550-project/client/cis-550-project` in the terminal.

If that doesn't work email me at ibrahimf@seas.upenn.edu and I will try to debug. 


# Server Dependencies:
- @azure/cognitiveservices-imagesearch@3.0.1
- apicache@1.6.3
- bcrypt@5.1.0
- body-parser@1.20.1
- cors@2.8.5
- dotenv@16.0.3
- express@4.18.1
- form-data@4.0.0
- fs@0.0.1-security
- http@0.0.1-security
- https@1.0.0
- mongoose@6.8.0
- morgan@1.10.0
- mysql@2.18.1 (git+ssh://git@github.com/mysqljs/mysql.git#dc9c152a87ec51a1f647447268917243d2eab1fd)
- nodemon@2.0.20
- redis@4.5.1

# Client Dependencies:
- @azure/cognitiveservices-imagesearch@3.0.1
- @azure/ms-rest-azure-js@2.1.0
- @emotion/react@11.10.5
- @testing-library/jest-dom@5.16.5
- @testing-library/react@13.4.0
- @testing-library/user-event@13.5.0
- axios@1.2.0
- grommet@2.28.0
- https@1.0.0
- react-awesome-reveal@4.1.0
- react-dom@18.2.0
- react-router-dom@6.4.3
- react-router@6.4.3
- react-scripts@5.0.1
- react@18.2.0
- styled-components@5.3.6
- web-vitals@2.1.4