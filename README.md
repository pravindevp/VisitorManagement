# Visitor Management System (Master Screens)

The Visitor Management System is a web-based application developed using React, .NET, and SQL. It is designed to help organizations efficiently manage and track visitors to their premises. This README provides an overview of the project's master screens, installation instructions, and other essential information for users and contributors.

## Installation

1.Clone the repository to your local machine:

git clone https://github.com/your-username/visitor-management-system.git

2.Navigate to the client and server directories and install the required dependencies.

```bash
cd client
npm install
 ```

```bash
cd server
dotnet restore
 ```

3.Configure the database connection in the appsettings.json file in the server directory.

4.Create the necessary database tables and seed initial data.

```bash
cd server
dotnet ef database update
 ```
5.Start the client and server applications.
```bash
# In the client directory
npm start

# In the server directory
dotnet run
 ```

6.The web application should now be accessible in your browser at http://localhost:3000.



## Usage

As of the current project state with only the master screens, you can use the Visitor Management System for the following purposes:

Visitor Registration:
Open your web browser and navigate to the URL where the application is running (usually http://localhost:3000).
Visitors can register using the provided web form. They can provide their details, purpose of the visit, and contact information.
Please note that check-in/check-out functionality and additional features are still under development. You can utilize the existing master screens for visitor registration, and further functionality will be added in future updates.

This updated usage section correctly reflects the limited functionality of the current project state.

## Contributing

We welcome contributions to complete the project and add the missing functionality. 
