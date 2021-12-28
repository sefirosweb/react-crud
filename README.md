# Project

This a React component for reusable on multi projects,

Normally you must have a CRUD system for a lot of things, and you want to make an a fast CRUD system,

This way help you in the front end to make a simply and fast CRUD system

It is maded by bootstrap (react-bootstrap) you can add custom colors for this project

Currently is in beta and can have a lot of changes and increase the functionalities

# Start Production

```
Caution: the first version is unstable and must have a lot of refactors, check the latest version
```

Install:

```
npm install --save-dev @sefirosweb/react-crud
```

Import components whant you wish:

```js
import { Crud } from "@sefirosweb/react-crud";

// Columns to retrieve from backend
const columns = [
  {
    primaryKey: true, // Used for UPDATE / DELETE in CRUD
    Header: "#",
    accessor: "id",
    visible: true, // Can hide this element
  },
  {
    titleOnDelete: true,
    titleOnCRUD: "Label Item Type", // Label on CRUD modal
    Header: "Item Type",
    accessor: "name",
    editable: true,
  },
];

// Declare options for crud:
const options = {
  columns,
  crudUrl: "http://localhost:6006/api/crud",
  canDelete: true,
  canEdit: true,
};

// Import CRUD component
<Crud options={options} />;
```

All components in the Storybook

Contribute to this project by Github

# Start develop

## Start docker

```
docker run --rm -it --name node-docddker -v $PWD:/home/app -w /home/app -e "NODE_OPTIONS=--openssl-legacy-provider" -p 6006:6006 -u node node:latest /bin/bash
```

or

```
npm run docker
```

## Start watcher

http://localhost:6006/

```
npm start
```

## Build and publish to NPM

```
npm run build
npm publish
```
