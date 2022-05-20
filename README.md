# Fast Food Feud

A local startup has asked Site interns to help them construct their new product - `Fast Food Feud`! They love the name and even have a tagline they workshopped: `Folks' Favorite Friendly Fuel Finder For Food Facts`. The one thing they don't have is a working application.

Here's what they have to say about their vision for the mini-app:

> Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! **Fast Food Feud** is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.

They've sourced their nutrition data, bootstrapped a React application, and even hired a designer to creat some styles. However, they quickly realized that they didn't know enough React to make this happen, so they've called on Site to fill in the gaps.

## Goals

By the end of this lab, site interns should understand...

- How React's component-based design is centered around writing functions that return `JSX`.
- The way that React enforces a one-way flow of data from parent to child - known as passing `props`.
- Iteration in `JSX` and how it's used to render lists of items.
- Strategies used to customize component styles using its `props`.
- Default `props` and how they can be overriden.
- The `useState` hook in React and how it's used to manage data that changes - simply called `state`.
- What event handlers like `onClick` are used for and how they can trigger state changes.
- Conditionally rendering JSX based on `props` or `state` values.

## Setting up the lab

Make sure to install the proper dependencies.

```bash
npm install
```

Once that's done, run the application like so:

```bash
npm run dev
```

## Application Features

### Core Features

- [ ] **Feature 1**: Passing props to the `Header` and `Instructions` components
    - `Header` component is imported in the `App` component
    - `appInfo` is passed in as a prop to the `Header` component
    - `Instructions` component is imported into the `App` component
    - instructions value of `appInfo` is passed in as a prop to the `Instructions` component
- [ ] **Feature 2**: The `Categories` column and `Restaurants` row
    - map over the `categories` array and create a `p` tag for every item.
    - Each tag has a unique `key` prop and values are not hardcoded. 
    - Find the `div` with a className of `restaurants` and create a `p` tag for each `restaurant` using iteration.
- [ ] **Feature 3**: The `Chip` component (`Default Props and Using Props to Customize Styles`)
  - Import the `Chip.jsx` component into our `App.jsx` file and replace all of the `p` tags we used to render categories with our `Chip` component.
  - Update the `JSX` in the `Chip` component's return statement to properly render the value inside of the `Chip`'s `p` tag.
  - Create a variable called `buttonClassName`.
    - If the `Chip` component's `isActive` prop is set to `false`, the `buttonClassName` variable should just equal a string containing `chip`.
    - If the `Chip` component's `isActive` prop is set to `true`, the `buttonClassName` variable should equal a string containing the className `chip` and the className `active`.
    - Then replace the existing `className` property of the `button` element with this new variable.
  - Go ahead and set the `isActive` prop to `true` by default in the `Chip` component. If we did it correctly, the buttons should change color!
       
- [ ] **Feature 4**: Using the `Chip`'s `onClick` handler to modify state (`State in React`)
  - Store state for a category the user can select. Go ahead and implement that with the `React.useState` hook.
  - Add an `onClick` event handler to our `Chip` components that will allow our users to select a category.
    - Pass an anonymous function to the `Chip`'s `onClick` prop so that each `Chip` can be used to select a different category when clicked. Then, attach the `onClick` prop to the `button` element inside of the `Chip` component.
    - To check that it is working as expected, update the `isActive` prop for each `Chip` to be `true` whenever that `Chip`'s category is equal to the one in state. Refer to the sample gif for an example of what it should look like.
    - Add an `onClick` event handler for our restaurant row and check that it works.
- [ ] **Feature 5**: Displaying Nutritional Facts (`Conditional Rendering in JSX`)
  - Once the user has selected both a category and a restaurant, filter the data to just a few menu items.
    - Right before the `return` statement of the `App.js` file, create a variable called `currentMenuItems`.
    - In that variable, store the result of calling `data.filter` and filtering each item depending on if its `.food_category` attribute is equal to the selected category and the `.restaurant` attribute is equal to the selected restaurant.
    - Iterate over the `currentMenuItems` and render a `Chip` for each one.
    - Create one more state variable for selected menu item, and give each chip an `onClick` handler that sets that menu item in state.
  - Import the `NutritionalLabel.jsx` component in the `App.jsx` component.
  - Display Nutritional Facts by conditionally render the `NutritionalLabel.jsx` component where the `{/* YOUR CODE HERE */}` comment is found below the `{/* NUTRITION FACTS */}` comment. Make sure to render it with the selected item passed in as the `item` prop.
  - Display the name of the selected menu item inside the `h4` element with a className of `item-name`.
  - Inside the `ul` element with the className of `fact-list`, iterate over the `nutritionFacts` array found in the `constants.js` file, and render a `NutritionalLabelFact.jsx` for each item in the list.
  - Each object in the array should have `id`, `label`, and `attribute` properties. The `attribute` value represents one of the properties on the `selectedMenuItem` that can be used to access its nutritional information.
  - Use the `id` property as the component's `key`.
  - Pass the `label` and `attribute` values as props to the `NutritionalLabelFact.jsx` component. Also pass the `item` prop to the `NutritionalLabelFact.jsx` component as well.
  - Render the `label` in the correct element.
  - Use the `attribute` prop to access the correct value on the `item` and render it in the correct element as well.

### Stretch Features

- [ ] Use the `appInfo` object to render different instruction messages depending on what the user has currently stored in state. Use the `keys` of the `appInfo.instructions` object to figure out the right combo!
- [ ] Add another `onClick` handler to the `Chip` component's `x` icon with a className of `close` so that when it is clicked, it deselects that item from state.
- [ ] Break sections of the `App.jsx` file into their own components. Create components for `CategoryColumn.jsx`, `RestaurantsRow.jsx`, `MenuDisplay.jsx`, and `DataSource.jsx`.
