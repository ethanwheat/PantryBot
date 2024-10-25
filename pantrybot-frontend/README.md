## Frontend Information:

**Documentation:**

PantryBot frontend uses React, Vite, Bootstrap, and React Router.

Vite is used to speed up development using React. Bootstrap is for easy styling. React router is used for easy implementation of routing for React applications.

[React Documentation](https://react.dev/)

[Vite Documentation](https://vite.dev/)

[React Native Bootstrap Documentation](https://react-bootstrap.netlify.app/)

[React Router Documentation](https://reactrouter.com/en/main)

**Styling Components:**

Please use these pre-styled components to create our app in the frontend:

[React Native Bootstrap Components](https://react-bootstrap.netlify.app/docs/components/accordion)

**Other Info:**

All editing should be done in the src folder. The component folder is used for components that will be reused multiple times acorss the app. The constants folder is for constants that will be used across that app but will not change. The pages folder includes all our pages. The layouts folder contains layouts that are applied to multiple pages. When adding a page, make sure to add it to the router in main.jsx.

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