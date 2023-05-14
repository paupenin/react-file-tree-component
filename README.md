# File Tree Component for AllInBits

## Objective

Create a file tree component that allows the user to browse a directory structure and interact with files and folders.

### Requirements

- ✅ The component should display a directory tree structure that the user can navigate.
- ✅ The user should be able to open and close directories by clicking on them.
- ✅ The component should display files and folders differently.
- ✅ The user should be able to select a file or folder, the selected item should be highlighted.
- ✅ The component should provide a way to expand/collapse all directories.
- Bonus:
    - ✅ Implement a feature to allow users to create a new file or folder within the file tree.
    - ✅ Implement drag-and-drop functionality that allows the user to move files and folders within the directory tree structure.

### Data Mockup

```javascript
const data = {
  name: 'project',
  kind: 'directory',
  children: [
    {
      name: 'src',
      kind: 'directory',
      children: [
        {
          name: 'index.js',
          kind: 'file',
          size: '1KB',
          modified: '2022-03-08 11:30:00'
        },
        {
          name: 'components',
          kind: 'directory',
          children: [
            {
              name: 'Button.jsx',
              kind: 'file',
              size: '2KB',
              modified: '2022-03-07 15:00:00'
            },
            {
              name: 'Card.jsx',
              kind: 'file',
              size: '3KB',
              modified: '2022-03-06 10:00:00'
            }
          ]
        },
        {
          name: 'styles',
          kind: 'directory',
          children: [
            {
              name: 'index.css',
              kind: 'file',
              size: '1KB',
              modified: '2022-03-07 09:00:00'
            },
            {
              name: 'components.css',
              kind: 'file',
              size: '2KB',
              modified: '2022-03-06 12:00:00'
            }
          ]
        }
      ]
    },
    {
      name: 'public',
      kind: 'directory',
      children: [
        {
          name: 'index.html',
          kind: 'file',
          size: '1KB',
          modified: '2022-03-08 10:00:00'
        },
        {
          name: 'favicon.ico',
          kind: 'file',
          size: '5KB',
          modified: '2022-03-07 16:00:00'
        }
      ]
    },
    {
      name: 'package.json',
      kind: 'file',
      size: '1KB',
      modified: '2022-03-08 12:00:00'
    },
    {
      name: 'README.md',
      kind: 'file',
      size: '2KB',
      modified: '2022-03-08 13:00:00'
    }
  ]
};
```

## Installation

### `npm install`

Install all project dependencies, this command is required to be able to run the project.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Design decisions

- Decided to use "CSS files" for separation of concerns between presentation and business logic. Although other patterns provide superior code organization and reusability, they require additional setup beyond the default "create react app" tool.
- Using CSS BEM naming convention for classes to ensure consistency and redability.
- Using SVG as a component for icons since it's the best practice when using "create react app".
- Using app-level folders like `assets`, `data`, `types`, and `views` abstracts logic from components and improves overall app architecture. Components could be self-contained with little effort for reusability.
- Created global store `store/FileTree` using Context with a Reducer pattern to manage state across components without prop-drilling.
- Decided to use a global store instead of a self-contained context in `components/explorer/FileTree` component to be able to consume the state outside of the component as showcased in `components/editor/FileEditor` component.
- Decided to extract `store/FileTree` reducer actions into interfaces and types in `store/FileTree/actions.ts` file to have self-documented code while leveraging Typescript features.
- Decided to have multiple stores (just exists one right now) with multiple states and reducers in the store to improve performance and have a more Redux-like codebase which may allow for an easy transition into Redux if desired.
- Decided to divide `store/FileTree` state into:
  - `rootItem`: Keeps same structure as provided mock data, it loads mock data as initial data.
  - `selectedPath`: Current selected path as a string, ex: 'project/README.md'. This was prefered over a key in `rootItem` objects to avoid modifying mock data structure.
  - `expandedDirectories`: Array to keep track of which directory paths are expanded. This was prefered over a key in `rootItem` objects to avoid modifying mock data structure.
- Decided to reuse reducer in `TOGGLE_DIRECTORY` action to `SELECT_ITEM`, this avoids multiple actions causing unnecessary re-rendering. This pattern could be avoided by using Redux or by implementing something similar to what Redux does.
- Decided to extract reusable pieces of functionality for file structure and dates into `utils` folder to keep components and reducer easier to read.
- Decided to implement draggable using HTML5 events to keep the application lightweight and easier to review.


## Potential improvements

- Implement a Burger menu sidebar File Tree panel for mobile devices.
- Consider using a more advanced styling pattern, such as "Styled Components" or a UI component library like "MUI" to achieve better code organization and expanded styling capabilities.
- Implement a more robust state-management library like Redux.
Improve and simplify FileTree operations, and extract related functionality from `store/FileTree/reducer` into utils. I'd like to develop operations in the FileTree similar to what you'd find in a CLI: `mkdir`, `mv`, `cp`, `rm`, `rmdir`.
- Change mock data in `data/fileTreeData.ts` to reorder `project/src/index.js` since it appears before folders, alternatively implement a deep reorder function for initial state.
- Implement drag&drop funcionality with a library which will have a higher compatibility, would be less prone to errors, and would not require to trick it with `setTimeout`.
- Add unit tests for `utils` and `reducers`.
- Add feature tests to `components`.
- Install `StoryBook` and create stores for `components` and `views`.
- Improve `FileEditor` component to show diferent content based on selected file extension, make it editable, and remove unescaped HTML warnings.
