**Required Settings:**
•	MongoDB should be installed.
•	NodeJS should be installed with Node Package Manager.

**Application Details:**
•	Database Server: MongoDB.
•	Application Server: Express
•	Frontend technology: HTML handlebars
•	Backend technology: Nodejs
•	Packages used: Multer, Express, handlebars, MongoDB

**Recommended IDE:** Visual Studio (Other IDEs works fine as well)

**How to run the Application?**
1.	Unzip the file
2.	Open the terminal in Visual studio code or open CMD
3.	Run Command “npm Install”
4.	Run Command “npm start”
5.	Application will start running on http://localhost:3000/

**Implementation Details:**
•	The website uses Multer NPM package to upload the file in the MongoDB database
•	The file is also stored on the local file location at public/files folder into the application
•	The User Form have validation to make sure all the inputs are correct, and all fields are mandatory.
•	There is both client-side and server-side validations for form inputs.
•	User cannot upload file with same email-address. User should use different email address in order to upload a file.
•	Once the file is uploaded, the user will be redirected to the page where he can see the details of the form input and the link to the uploaded file. 

