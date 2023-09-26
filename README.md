## Programming challenge 2023
---
## Topic
This project is about building a user-friendly virtual-assistant application to help senior citizens easily enter their groceries into a shopping list. The main functions implemented in this project including:
- Application lets user “log in” by entering their name 
- Application shows a shopping list for the user 
- Application provides a way to add one or more items to their shopping list through textual entry and through narration 
- Application should match items added by user to an item database 
- Application allows users to print or share their list 

## How to run the code

- The list of the top-level dependencies I mainly used in this project could be seen in the "requirements.txt" file. I have also created a venv environment in backend folder with all the dependecies needed for flask. Since the node_modules which contains all the external libraries and dependencies of ReactJs is too large, I did not commit it to GitHub.

- In this project, I applied ReactJS for front end and Flask for simulating backend API. The database I used to store data is MySQL. Before running the code, please change the MySQL link inside App.py to your username and password.


- The database schema is designed in initial_db.py under backend folder and the data inserted into the database is designed in add_data.py folder. Before run the code, you need to first run "create database shoplistapp" command in MySQL and then run "initial_db.py" and "add_data.py". 


- The ReactJS is running on port 3000 and the Flask is running on port 8000. To run the code, run "yarn start" or "npm start" under the repository and run python3 App.py under the backend folder. 


## Implementation
- I have recorded a video which showing all the functions implemented in this project for your reference. 
Here is the Google Drive link of the video: https://drive.google.com/file/d/1ntrTR0dRLRxm-a1Hnqu0RjAD0Rju924E/view?usp=sharing
