# Project

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/sefirosweb)

[!["Storybook"](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://sefirosweb.github.io/react-crud) [![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

It´s a React compononet to be used at multiple projets

Normally you are interested to have a CRUD system for a lot of things, usually you want to make a fast and simple CRUD system,

It is made by bootstrap (react-bootstrap) you can modify colors and styles for these components

Full writed in typescript

Most of compenents are used [@tanstack/table](https://tanstack.com/table/v8/docs/guide/introduction)

# Try it!

How to use all components are in the [GitHub Pages](https://sefirosweb.github.io/react-crud/)

![image](https://raw.githubusercontent.com/sefirosweb/react-crud/master/docs/preview.gif)

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
    canSearch,
    canRefresh,

    primaryKey: 'id',
    titleOnDelete: 'name',

    createButtonTitle: 'http://localhost:6006/api/crud',
    canEdit: true,
    canDelete: true,
    crudUrl: `/api/crud`,

    columns={columns}
/>
```

Contribute to this project in [GitHub](https://github.com/sefirosweb/react-crud)

# Development

## Start docker

`Start devcontainer of vscode`

## Start storybook for develop

http://localhost:6006/

```
npm run storybook
```

## Start react app to tests modules

```
npm start
```

## Build and publish to NPM

```
npm run build-module
npm publish
```
