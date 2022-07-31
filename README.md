# Project

It´s a React compononet to be used at multiple projets

Normally you are interested to have a CRUD system for a lot of things, usually you want to make a fast and simple CRUD system,

It is made by bootstrap (react-bootstrap) you can modify colors and styles for these components

Full writed in typescript

# Start Production

Install:

```
npm install --save-dev @sefirosweb/react-crud
```
Add Bootstrap styling:\
Create a .SCSS file and import them with:
```scss
// Fonts
@import "~bootstrap/scss/bootstrap";
@import "toastr";
@import "~react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
```
# Usage

Import components whant you wish:

```js
import { Crud } from "@sefirosweb/react-crud";
...

// Columns to retrieve from backend
const columns = [
  {
    Header: "#",
    accessor: "id",
    visible: true, // Can hide this element
  },
  {
    titleOnCRUD: "Label Item Type", // Label on CRUD modal
    Header: "Item Type", // Label in table
    accessor: "name", // field retreived from backend
    editable: true, // field can be editabled
    canSearch: true, // Add filter over table for this column
  },
];

...

// Import CRUD component
<Crud
    canSearch: true,
    canRefresh: true,

    primaryKey: 'id',
    titleOnDelete: 'name',

    createButtonTitle: 'http://localhost:6006/api/crud',
    canEdit: true,
    canDelete: true,
    crudUrl: `/api/crud`,

    columns

/>
```

All components in the [Storybook](https://sefirosweb.github.io/react-crud/)

Contribute to this project in [GitHub](https://github.com/sefirosweb/react-crud)

# Start develop

## Start docker

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