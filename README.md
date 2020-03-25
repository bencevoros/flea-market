# FleaMarket

## Environment

Before running project, you need to create a `.env` file in the project root. The following properties need to declare in:

    DB_HOST=<HOST OF THE DATABASE>
    DB_PORT=<PORT OF THE DATABASE>
    DB_NAME=<DATABASE NAME>
    DB_USERNAME=<USERNAME FOR THE DATABASE>
    DB_PASSWORD=<PASSWORD FOR THE USERNAME>

## Scripts

### Development

Run `npm run start:be` for a dev backend server. The server listen on `http://localhost:3000/`. The server will automatically reload if you change any of the source files.

Run `npm run start:fe` for a dev frontend server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new frontend component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Run in production

Run `npm run start:prod` to build and run the project. The backend build artifacts will be stored in the `backend/build/`, the frontend in the `frontend/dist/` directory.


## Folder Structure

- backend/
  - build/ - Contains the compiled backend code
  - routes/ - Here combine modules routes
  - modules/
    - module/
      - module.controller.ts - Define here the business logic
      - module.model.ts - Define here the database manipulation
      - module.route.ts - Define here the endpoints for the module
      - module.entity.ts - Define here the module entity. The orm get table and column properties from here.
  - middleware/ - Here define the middleware functions e.g. auth for routes
  - server.ts - Main server file
- frontend/
  - e2e - Define here the end to end testing files
  - src/
    - app/
      - components/
        - module.component.ts - Define here the logic for the module
        - module.component.html - Define here the html for the module
        - module.component.css - Define here the css for the module
      - utils/ - Define here the shared files what is used in multiple files
      - models/ - Define here the data _models
      - services/ - Define here the services for the modules
    - assets/ - Add the asset files like pictures, global styles here
    - environments/ - Define here the environment variables
  - dist/ - The compiled frontend code
