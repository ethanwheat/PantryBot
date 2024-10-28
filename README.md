# PantryBot

Description

## Tech Stack

**Frontend:** React, Vite, Bootstrap

**Server:** Node, Express

**Database:** MongoDB

## Frontend Information:

**Documentation:**

PantryBot frontend uses React, Vite, Bootstrap, React Router, React Hook Form, and JS-Cookie.

Frontend uses React.

[React Documentation](https://react.dev/)

Vite is used to speed up development using React.

[Vite Documentation](https://vite.dev/)

Bootstrap is for easy styling.

[Bootstrap Documentation](https://getbootstrap.com/)

[React Bootstrap Documentation](https://react-bootstrap.netlify.app/)

React router is used for easy implementation of routing for React applications.

[React Router Documentation](https://reactrouter.com/en/main)

React hook form is used for form validation.

[React Hook Form Documentation](https://www.react-hook-form.com/)

JS-Cookie is used to create and get cookies.

[JS-Cookie Documentation](https://github.com/js-cookie/js-cookie)

**Styling Components:**

Use these pre-styled components to create our app in the frontend:

[React Bootstrap Components](https://react-bootstrap.netlify.app/docs/components/accordion)

**Other Info:**

Most editing should be done in the src folder. The only time you will need to edit outside the src folder is when editing enviromental variables. Images should be placed in the assets folder and enviromental variables should be placed or edited in the .env file. The component folder is used for components that will be reused multiple times acorss the app. The constants folder is for constants that will be used across that app but will not change. The pages folder includes all our pages. The layouts folder contains layouts that are applied to multiple pages. When adding a page, make sure to add it to the router in main.jsx. The app.scss contains information about our theme, I don't think we will have to edit this file much as bootstrap already includes most of our styling. The only change I added to this file was overriding the bootstap primary color of blue to our primary color of green.

## Frontend Installation

Install the latest version of NodeJS:

[Install Link](https://nodejs.org/en)

Change directory to pantrybot-frontend folder:

```bash
  cd pantrybot-frontend
```

Install node packages:

```bash
  npm install
```

Run development server:

```bash
  npm run dev
```

## Backend Installation

Install the latest version of NodeJS:

[Install Link](https://nodejs.org/en)

Change directory to pantrybot-backend folder:

```bash
  cd pantrybot-backend
```

Install node packages:

```bash
  npm install
```

Add a .env file and populate the following fields:

```bash
  MONGO_URI=<uri_here>
  JWT_SECRET=<secret_here>
```

Start the server:

```bash
  node index.js
```

## Authors

- Gavin Kirwan [@gkirwan](https://www.github.com/gkirwan43)
- Ethan Wheat [@ethanwheat](https://github.com/ethanwheat)
- Add your name and github link here
