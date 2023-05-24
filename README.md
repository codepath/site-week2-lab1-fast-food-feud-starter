# Fast Food Feud

A local startup needs your help to create a web app for their new product - **Fast Food Feud 🍔**! They love the name and even have a tagline they workshopped: *Folks' Favorite Friendly Fuel Finder for Food Facts*. The one thing they don't have is a working web app.

Here's what they have to say about their vision for their web app:

> Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! ***Fast Food Feud*** is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.

They've sourced their nutrition data, bootstrapped a React application, and even hired a designer to create some styles. However, they quickly realized that they don't know enough React to make this happen, so they're hoping you can help fill in the gaps.

Follow the instructions available on the [course portal](https://courses.codepath.org/courses/summer_internship_for_tech_excellence/unit/2#!lab1)


## Setting up the lab

**Step 1** - Install the required dependencies:

```bash
npm install
```

**Step 2** - Run the app:

```bash
npm run dev
```

## ✅ Application Features

### Core Features

- [ ] The website displays the title, tagline description, data source, and instructions in the `Header` and `Instructions` component
- [ ] Categories are displayed in a column and restaurants are displayed in a row.
- [ ] The `Chip` component updates based on the restaurant and category selected by the user.
- [ ] When a menu item is selected, the `NutritionalLabel` component is displayed with the nutritional facts of the item.

### Stretch Features

- [ ] Display different instructions depending on state.
- [ ] Add additional `onClick` handlers to `Chip`.
- [ ] Refactor the `App.jsx` file into separate components (`CategoryColumn.jsx`, `RestaurantsRow.jsx`, `MenuDisplay.jsx`, and `DataSource.jsx`).
