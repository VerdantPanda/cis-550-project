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