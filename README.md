# Customer CRUD Frontend

This project is the frontend part of a CRUD application of Customers and Locations developed in Laravel 8 and React 17. 

The backend part of the project is available in [this link](https://github.com/diogosmendonca/customer-crud-backend).

For running or compiling the frontend application use [yarn](https://yarnpkg.com/). 

First, install dependencies with `yarn install` command. Depending of the version of node.js installed, you may need to run this command with --ignore-engines parameter, so use: `yarn install --ignore-engines`.

For running the software in development mode use `yarn start` command and access http://localhost:3000/.

For building compiled static files use `yarn build` command. The static files will be generated in the build folder. After generate the compiled files, copy them to the `public` folder of [backend project](https://github.com/diogosmendonca/customer-crud-backend). Start the backend [sail](https://laravel.com/docs/8.x/sail) server for running the software in production-like mode. 

