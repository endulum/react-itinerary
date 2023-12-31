# React Itinerary

Exploration of React's features through a To-Do application.

## Goals
* [x] Pass stateful itinerary data as props to components
* [x] Pass callbacks to components to change itinerary data
* [ ] Store itinerary data locally whenever it changes
* [x] Use a reducer to manage stateful itinerary data
* [x] Use Context to deeply deliver ~~itinerary data~~ (currently just the dispatch)
* [x] Use Router to navigate between itinerary lists as pages
* [x] Use testing to fortify confidence in app functionality
 
## To Do
- is context actually necessary? possibly remove, and reserve context use for larger-scale projects
- use enter key to submit info when editing task/lists
- after delete, redirect to list overview
- explore styling
- reformat dom structure for styling and adjust tests as needed

## Resources
### Testing
- [**The Odin Project:** Introduction to React Testing](https://www.theodinproject.com/lessons/node-path-react-new-introduction-to-react-testing)
- [**The Odin Project:** .test.jsx Example](https://github.com/TheOdinProject/theodinproject/blob/0886578d5b27a967e6bba2b31f212efe284d9413/app/javascript/components/project-submissions/components/__tests__/submissions-list.test.jsx)
- [**Robin Wieruch:** React Testing Library](https://www.robinwieruch.de/react-testing-library/)
- [**Robin Wieruch:** Vitest with React Testing Library](https://www.robinwieruch.de/vitest-react-testing-library/)

### Routing
- [**Robin Wieruch:** React Router 6](https://www.robinwieruch.de/react-router/)

### Context
- [**react.dev:** Scaling Up with Reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context)
- [**Robin Wieruch:** React State Hooks: useReducer, useState, useContext](https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext/)

### PropTypes
- [**The Odin Project:** Type Checking With PropTypes](https://www.theodinproject.com/lessons/node-path-react-new-type-checking-with-proptypes)
- [**react.dev:** PropTypes Validators](https://legacy.reactjs.org/docs/typechecking-with-proptypes.html#proptypes)
