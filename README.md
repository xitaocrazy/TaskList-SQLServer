# TaskList-SQLServer
TaskList-SQLServer is a simple project that implements a task list, the main goal of the project is to practice some development skills as:

  - Design patterns (Dependency Injection, Singleton, Repository Pattern, Unity of Work, DRY, SOLID, KISS, YAGNI;
  - ORMs: EntityFramework;
  - SQL Server;
  - Unity Tests (frontend tests and backed tests);
  - API development;
  - Use of javascript frameworks

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites:
What things you need to open, configure and run the project
* [.Net 4.5](https://www.microsoft.com/pt-br/download/details.aspx?id=30653)
* [Node.js 4.2.4](https://nodejs.org/en/download/)
* A good [test runner](http://nunit.org/docs/2.5.10/runningTests.html) to execute unit tests developed with [NUnit](http://nunit.org/) (I recommend use [ReSharper](https://www.jetbrains.com/resharper/download/))
* [SQL Server](https://www.microsoft.com/pt-br/sql-server/sql-server-editions-express) - You could use LocaDB. 

### Installing
Follow the steps below to setup your environment

* Go to the project root directory in command prompt:
    - Example : cd C:\Documents\GitHub\TaskList-SQLServer
* Execute the command below to install all the node modules necessary to run the project:
    - npm install
* When finish the node modules instalation, go to 'ts' directory in command prompt. This directory contains all typeScript files.
    - Example: cd C:\Documents\GitHub\TaskList-SQLServer\ts
* Execute the command below to compile the typeScript files and generate the javascript files:
    - tsc

## Configuring
Follow the steps below to configure the project in your machine

* Open the solution in Visual Studio and open the Web.config file in TaskListApi project;
* Configure section connectionStrings to access your database;
* If you are using LocalDB, don't forget to verify if the instance is started;

## Running
* With all installed and configured, just run the project in Visual Studio.
* When you run it in the first time, the project will creates the database with initial values

## Running backend tests
As sad before, you need a runner to NUnit tests. If you are using ReSharper, you need to follow the steps below:

* Open ReSharper -> unit Tests -> Unit Tests to opne the test section;
* Run TaskListApi.Tests tests.

## Running frontend tests
Follow the steps below to run front end tests.

* Go to the project root directory in command prompt:
    - Example to Windows: cd C:\Documents\GitHub\TaskList-SQLServer
* Execute the command below to run all tests:
    - karma start

## Authors

* **Daniel Martins** - *Initial work* - [GitHub](https://github.com/xitaocrazy) - [Linkedin](www.linkedin.com/in/daniel-de-souza-martins)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details







