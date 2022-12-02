# Simple Kanban board

This is a minimalistic Kanban-style task manager I wrote to study React. Supports creating tasks and columns, moving tasks between columns, changing their color as well as the bg-color of the app. All changes are preserved in a database (within a single "user").

### Stack

- Typescript
- React
- React-beautiful-dnd
- Node.js
- Express
- MongoDB

### Live version

Live version [here](https://mytasks-react.cyclic.app/).

### Building

The [/dev](https://github.com/malisovm/mytasks_react) branch can be launched with `npm run start` + `cd backend && node server.js`. If you want to run build, remove the proxy line from package.json and uncomment lines 5-8 in server.js. The compiled version is in the [/deploy](https://github.com/malisovm/mytasks_react/tree/deploy) branch.