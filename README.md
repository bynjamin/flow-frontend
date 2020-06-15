## Run project locally

1. run `cp .env.example .env`
2. customize .env
3. set `REACT_APP_HOST = localhost`
5. run `yarn` or `yarn install`
6. run `yarn dev` to start development server in watch mode

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in normal mode.

### `yarn test:watch`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn lint:ts`

Runs linter for typescript

### `yarn bundle:report`

Launches wepback bundle analyzer

## `yarn graphql`

Downloads actual schemas from server and generates typescript types for graphql queries inside project. Types are generated inside `__generated__` folder inside each scope.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
