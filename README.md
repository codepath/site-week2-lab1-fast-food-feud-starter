# Fast Food Feud

Week 2 - React Lab #1

## Intro

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

- Core Features

  - **Feature 0**: The `App` component (`Explore a React app`)
    - Exploring a React App
      - Go ahead and open up the `App.jsx` file in the root of the `src` directory.
        - The `.jsx` extension is used to signify that we're writing React code. Since `.jsx` is compiled down to vanilla JavaScript, it's not strictly necessary to add that part. But it is a commonly seen convention, so we do it here.
        - This component is where all the magic happens. Take a look at what's been scaffolded out already.
        - There's a lot going on here! Don't worry, we'll cover the app piece by piece.
        - This file contains a section of code that looks _very much_ like HTML with some _Javascript_ code sprinkled in. This syntax is called JSX. It lets us write code that looks nearly identical to HTML, but allows us to mix in vanilla JavaScript and other neat things.
      - Check out the `main.jsx` file at the root of the `src` directory as well. This is where our React app is actually mounted to the DOM in the browser. There's also some live testing configuration happening here. Don't worry about that part. We'll use those tests to guide the code we write in this lab.
        - So where does the app actually go? Open up the `index.html` file located at the root directory and notice the `div` element with an `id` of `root`?. That's where our app actually gets rendered into!
        - The `script` tag imports our `main.jsx` file and React handles the rest.
        - Take a second and dig through some of the files. Don't worry about understanding all of it right away. We'll get to everything in due time.
  - **Feature 1**: Passing props to the `Header` and `Instructions` components (`JSX and passing props`)
    - JSX and passing props
      - Open up the `Header.jsx` and take a look at this component. It's simply a function that returns something that looks something like `HTML`. See the [docs](https://beta.reactjs.org/learn/javascript-in-jsx-with-curly-braces) for more info.
      - The `Header` function takes in a single argument called `props` (like all React components).
      - It then uses attributes of the `props` object to customize what is rendered inside of the `JSX` the `Header` component returns.
      - Start off by heading into the `App.jsx` component and importing the `Header` component.
      - Render it inside of the `App` component in the correct location. There should be a comment to guide you.
      - Then do your best to pass values from the `appInfo` object into the `Header` component as `props`.
      - It should be clear from the className attribute of each JSX element in the `Header` component what prop it expects to render.
      - Once it's displaying all of the values it's supposed to, do the same for the `Instructions` component.
      - To see if the code matches what is expected, click on the circular button in the top right of the screen. That should open up a live test report that will explain what tests are passing, and which ones still need to be adjusted. Click on any test to see an explanation of what error is currently causing it to fail.
      - Read the React [docs](https://beta.reactjs.org/learn/passing-props-to-a-component) on props for more info.
  - **Feature 2**: The `Categories` column and `Restaurants` row (`Iteration in JSX`)
    - The `Categories Column`
      - If we open up our `App.jsx` file again, we can see that at the very beginning of the return statement, there is a block of `JSX` with the `className` property of `CategoriesColumn`.
      - Find the comment that says `YOUR_CODE_HERE` and remove it.
      - Use your knowledge of iteration in `JSX` to map over the `categories` array and create a `p` tag for every item.
        - Don't forget to give each tag a unique `key` prop!
        - Don't hardcode the values!
      - These are each of the topics the `Fast Food Feud` application will allow users to explore. Notice how they form a nice column thanks to our `flex` styles found in `App.css`?
      - This probably doesn't look amazing yet, but that's ok. We'll get to it.
      - See the [docs](https://beta.reactjs.org/learn/rendering-lists) for more info
    - The `Restaurants Row`
      - Let's try this one more time, with different data.
      - Find the `div` with a className of `restaurants` and create a `p` tag for each `restaurant` using iteration.
  - **Feature 3**: The `Chip` component (`Default Props and Using Props to Customize Styles`)
    - Component reuse via `props`
      - Now that we have both the categories and restaurants listed in our application, let's start thinking about making them look nice.
      - We saw in our `Header` and `Instructions` components how we could use `props` to customize what our components render. But they can do a lot more than that.
      - Props are most useful when we want to reuse and customize a component without copy-pasting our code over and over. That's where `props` shine, since they essentially allow us to use our components as templates that can be customized with specified `PROP`erties. Let's see that in action.
    - Filling out the `Chip` component
      - Import the `Chip.jsx` component into our `App.jsx` file and replace all of the `p` tags we used to render categories with our `Chip` component.
      - Make sure to see what props it needs to render the proper value.
      - Update the `JSX` in the `Chip` component's return statement to properly render the value inside of the `Chip`'s `p` tag.
    - Customizing component styles with props
      - Interpolating a value into the `className` string
        - Notice how the `Chip.jsx` component has its prop object destructured already? The `label` and `isActive` props are set to a default value, which is nice when we want to standardize the basic version of a component.
        - Another useful tactic is to use a component's prop values to determine the `className` of certain elements. Before the `Chip` components' return statement, create a variable called `buttonClassName`.
          - If the `Chip` component's `isActive` prop is set to `false`, the `buttonClassName` variable should just equal a string containing `chip`.
          - If the `Chip` component's `isActive` prop is set to `true`, the `buttonClassName` variable should equal a string containing the className `chip` and the className `active`.
          - Then replace the existing `className` property of the `button` element with this new variable.
        - Go ahead and set the `isActive` prop to `true` by default in the `Chip` component. If we did it correctly, the buttons should change color!
        - Because React components are just Javascript functions, we can supply them with default arguments the same way that we do with normal functions. But we can also override them.
        - Now go check the `react-devtools` to investigate the props of your components. (This is always good practice and something we should get familiar doing!)
      - Overriding the `isActive` prop
        - Right now, we're automatically setting the `isActive` prop to `true` for all `Chip` components. But what we actually want to do is set them to `true` only when they're selected.
        - To get an idea of how that should work, set the `isActive` prop back to `false` by default
        - Then, go to where the category `Chip` components are being created through iteration.
        - Go ahead and only set the `isActive` prop to `true` on the type of category ("Burgers")
        - Do the same with the restaurant `Chip` components, but only for the restaurant ("In-N-Out Burger")
        - There should now be only one active category `Chip` and one active restaurant `Chip`!
        - This doesn't seem like a great approach though. Wouldn't it be nice if there were a better way to determine if the user had selected a category or restaurant?
  - **Feature 4**: Using the `Chip`'s `onClick` handler to modify state (`State in React`)
    - Using the `React.useState()` hook to store values that will change over time in our application.
      - Components often need to change what’s on the screen as a result of an interaction.
      - React provides a convenient mechanism to keep a record of what's changed in an application after each user interaction. It's known as **`state`**.
      - > NOTE: Think of `props` as data in components that _doesn't_ change, and `state` as data in components that _does_ change.
      - To create state in any component, we'll use a special function known as a **hook** - in particular, the `useState` hook.
        - See this interactive [example](https://beta.reactjs.org/learn/state-a-components-memory#adding-a-state-variable) to get a handle on how to the `useState` hook works.
      - The `useState` returns an array containing two things - a state **value** and a state **setter** function.
        - Check out the React [docs](https://reactjs.org/docs/hooks-state.html#whats-a-hook) for more info.
      - State is an immutable (unchangeable) value, which means when we are interacting with it, we never modify state directly. Remember to always use the setter function to update state values.
      - Let's begin by storing state for a category the user can select. Go ahead and implement that with the `React.useState` hook.
    - Handling events in React
      - Because state is closely associated with interactivity (and things changing), we need a way to listen for events - like when a user interacts with elements in the app.
      - This is where event handlers come in. React event handlers are similar to HTML event handlers, except for a few key differences:
        - When using React, you generally don’t need to call `addEventListener` to add listeners to a DOM element after it is created.
        - Instead, just provide a listener when the element is initially rendered.
        - React events are named using camelCase, rather than lowercase.
        - With JSX you pass a function as the event handler, rather than a string.
          - The React [docs](https://beta.reactjs.org/learn/responding-to-events#adding-event-handlers) on event handlers covers more detail on this subject.
          - This [section](https://beta.reactjs.org/learn/responding-to-events) includes interactive examples on how to use event handlers in React.
      - Let's add an `onClick` event handler to our `Chip` components that will allow our users to select a category.
        - Pass an anonymous function to the `Chip`'s `onClick` prop so that each `Chip` can be used to select a different category when clicked. Then, attach the `onClick` prop to the `button` element inside of the `Chip` component.
        - > NOTE: Remember that calling a function directly in the `onClick` handler will execute immediately upon being rendered to the screen. Instead, pass a function that will be called _only_ when the user clicks on the element!
        - To check that it is working as expected, update the `isActive` prop for each `Chip` to be `true` whenever that `Chip`'s category is equal to the one in state. Refer to the sample gif for an example of what it should look like.
      - Now go ahead and and do the same thing for our restaurant row.
  - **Feature 5**: Displaying Nutritional Facts (`Conditional Rendering in JSX`)
    - Render menu items
      - Once the user has selected both a category and a restaurant, we can use those to filter the data to just a few menu items.
        - Right before the `return` statement of the `App.jsx` file, create a variable called `currentMenuItems`.
        - In that variable, store the result of calling `data.filter` and filtering each item depending on if its `.food_category` attribute is equal to the selected category and the `.restaurant` attribute is equal to the selected restaurant.
        - Finally, iterate over the `currentMenuItems` and render a `Chip` for each one.
        - Make sure to pass the correct props to each `Chip` component here as well.
        - Create one more state variable for the selected menu item, and give each `Chip` an `onClick` handler that sets that menu item in state.
    - Display Nutritional Facts
      - Finally, go ahead and import the `NutritionalLabel.jsx` component in the `App.jsx` component.
      - Now open the the `NutritionalLabel` component and check it out.
      - Two things need to happen there.
    - Conditionally render the `NutritionalFacts` component
      - First, it needs to accept an `item` prop that should be equal to the `selectedMenuItem` state variable.
      - However, that variable is not always a valid value. Therefore, we need to _conditionally render_ the `NutritionalLabel` component only.
      - That means it should only show up on the screen when that `selectedMenuItem` state variable is set to an actual menu item.
      - See this section in the React [docs](https://beta.reactjs.org/learn/conditional-rendering) with good interactive examples on how to conditionally render JSX in components.
      - Go ahead and conditionally render the `NutritionalLabel.jsx` component where the `{/* YOUR CODE HERE */}` comment is found below the `{/* NUTRITION FACTS */}` comment.
      - Make sure to render it with the selected item passed in as the `item` prop.
    - Ensure the `NutritionalLabel.jsx` and `NutritionalLabelFact.jsx` components render the proper values
      - Now that that the ``NutritionalLabel.jsx` component has the correct `item` prop, make sure to display the name of the selected menu item inside the `h4` element with a className of `item-name`.
      - Inside the `ul` element with the className of `fact-list`, iterate over the `nutritionFacts` array found in the `constants.js` file, and render a `NutritionalLabelFact.jsx` for each item in the list.
      - Each object in the array should have `id`, `label`, and `attribute` properties. The `attribute` value represents one of the properties on the `selectedMenuItem` that can be used to access its nutritional information.
      - Use the `id` property as the component's `key`.
      - Pass the `label` and `attribute` values as props to the `NutritionalLabelFact.jsx` component. Also pass the `item` prop to the `NutritionalLabelFact.jsx` component as well.
      - Render the `label` in the correct element.
      - Then, use the `attribute` prop to access the correct value on the `item` and render it in the correct element as well.
      - That should be it! Try clicking on a category, restaurant, and menu item to see its nutritional info! If all worked well, it should pop up in a realistic label on the right.
  - At this point, the app should work! Congratulations!

- Stretch Goals
  - Use the `appInfo` object to render different instruction messages depending on what the user has currently stored in state. Use the `keys` of the `appInfo.instructions` object to figure out the right combo!
  - Add another `onClick` handler to the `Chip` component's `x` icon with a className of `close` so that when it is clicked, it deselects that item from state.
  - Break sections of the `App.jsx` file into their own components.
    - Create components for `CategoryColumn.jsx`, `RestaurantsRow.jsx`, `MenuDisplay.jsx`, and `DataSource.jsx`.
    - When you're finished, the JSX for the `App.jsx` file should have a return statement that looks something like the following code segment (with all of the props taken out):

```jsx
return (
  <main className="App">
    <CategoriesColumn />

    <div className="container">
      <Header />
      <RestaurantsRows />
      <Instructions />
      <MenuDisplay />
      <DataSource />
    </div>
  </main>
)
```

- Resources
  - [react beta docs](https://beta.reactjs.org/) - this resource has interactive code snippets that explain how react hooks work in detail!
  - [passing props to components](https://beta.reactjs.org/learn/passing-props-to-a-component)
  - [iteration in JSX](https://beta.reactjs.org/learn/rendering-lists)
  - [responding to events](https://beta.reactjs.org/learn/responding-to-events)
  - [conditional rendering](https://beta.reactjs.org/learn/conditional-rendering)
