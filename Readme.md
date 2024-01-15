# README - Node Exercise for PCCW Global

## Development Environment Setup

To set up and run the application, follow these steps:

### Initial Setup and Running the Application
1. **Build and Start the Application**:
   - Open your terminal.
   - Navigate to the root directory of the project.
   - To build and start all the necessary applications at once, run the following command at the beginning:
     ```
     docker-compose up --build
     ```
     This command builds and starts all the containers required for the application, and it needs to be run only once at the beginning.

### Step 2: Importing the Postman Collection
- Open Postman.
- Import the `PCCW-GLOBAL.postman_collection.json` file. This file contains the API requests you will need to interact with the backend.

## Using the Application

### Populating the Database
Before using the application, the database needs to be populated:

1. **Run the FeedDB Endpoint**:
   - In Postman, execute the request to `{{local_url}}/api/v1/feed/feedDB`.
   - This endpoint will import data from the `seed.xlsx` file into the database.
   - If you encounter any errors during this process, restart the PostgreSQL and API containers, and then try again.

### Accessing the Frontend
After populating the database, you can access the application's frontend:

1. **Visit the Web Application**:
   - Navigate to `http://localhost:3000/` in your web browser.

### Viewing Message Exchanges
To see users exchanging messages:

1. **Use URL Parameters for Specific Data**:
   - Access `http://localhost:3000/?currentUserId=1&userID1=1&userID2=3` to view messages exchanged between specified users.
   - Modify the values of `currentUserId`, `userID1`, and `userID2` in the URL as needed.

### Additional Information
- Please refer to this README for any special instructions or assumptions made during the development.
- For further queries or issues not covered here, feel free to reach out for support.
