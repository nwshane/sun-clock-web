## Getting Started

1. `git clone` the repository
2. `npm install`
3. `npm run dev`

## Run Tests

* `npm t`
* `npm run test-watch` - run tests every time code changes

# Explanation of Sun Clock Application

The Sun Clock web application shows the user when the sun will rise and when it
will set wherever they are currently located. It allows the user to see how many
hours of daylight and nighttime there are on that day, and how long it will be
before the next sunrise or sunset.

## Features

* Visualizes the proportion of daytime to nighttime on the current day for the
  current location.
* Shows the current time, and rotates the visualization so that the current time
  is always represented by the top of the circle.
* Displays the sunrise time, the sunset time, and whether it is day or night
  (all in textual format).

## How it works at a high level

1. The app requests the user's current location via the browser's
   [geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition).
2. The app uses the user's latitude and longitude to fetch the sunrise and
   sunset times from the [Sunrise Sunset API](https://sunrise-sunset.org/api).
3. When the sunrise and sunset times are available, React renders a D3 container
   component, which creates the Sun Clock visualization. As time changes every
   second, the container component passes the updated currentTime to d3, which
   updates the displayed time and rotates the circle.

## Technical explanation

The primary two technologies used in this application are React and D3. I used
React to separate the code into small, manageable components and to manage
state, and d3 to create the visualization as I had imagined it. I structured the
code by separating the view layer (React components) from the data-processing
code that supports the view layer.

The entire state of the application is managed by the React component SunClock.
It fetches the sunrise and sunset time from the Sunrise Sunset API, and it
continuously updates `state.currentTime` to represent the current moment. It
also sets `state.loading` and `state.error`, which it uses to inform the user of
the status of the application when the visualization is not shown.

There were many alternatives to managing state in the SunClock component. I
typically use Redux in larger applications, because doing so allows you to
create self-sufficient components that can be moved around and reused easily. It
also helps when you have a lot of state to manage. However, Redux requires a
fair amount of boilerplate code, so it is often overkill for small applications
like this one.

Another possibility was to manage the state of the application in the index page
component, but I chose not to go that route because it would have been
impossible to add other pages that use the state.

In terms of React framework, I went with NextJS in order to get a React
application up and running quickly, with dependencies like webpack working out
of the box (but also configurable). I like Next JS's structure of a separate
`pages` directory, because it feels intuitive and makes it easy to add other
pages (I wanted to add an about page, but that was low on my priorities). Next
JS also has the advantage of built-in server-side rendering, which means that
the Loading message is delivered to the user in the initial page load.

### Managing d3 code

React and d3 are both designed to control the DOM, so when you use them
together, you have to be careful that they don't interfere with one another. If
a React component calls d3 code that changes the DOM, and then the component
rerenders, d3's changes to the DOM will be removed.

My solution for combining React and d3 was to render d3 within a customized
React container component. I rendered the initial d3 visualization with
`componentDidMount`, configured the component not to rerender by making
`shouldComponentUpdate` return false, and subsequently updated the visualization
by calling a custom update method in `componentWillReceiveProps`. This approach
worked well: if you inspect the SVG path elements in the visualization, you will
see that they are not getting rerendered, but that their `d` attributes are
changing every second.

In general, I like to divide my code into many little functions to improve
readability and code reuse. If you look at the default exported function in the
`renderSunClockGraphic` file, it's very easy to see what it's doing: first, it
creates the sunClock, and second, it updates the sun clock according to the
initial state. Below that, you can see that the update method simply reuses the
`updateSunClock` function, but this time with a new state.

The `createSunClock` function is also divided into a number of functions to
optimize for code readability. I find d3 somewhat difficult to read—probably
because I am new to it—so I separated the code into functions like `createSvg`,
`createClockContainer`, etc. in order to make it more easily understandable.

A coding strategy I learned while using Redux came in handy here: I pass around
the whole state object until I actually need to get something from it. That way,
each function can decide all by itself what state it needs access to. For
example, `updateCenteredTextTime` takes `state` as an argument, and then passes
it to `getFormattedCurrentTime`, which gets the `currentTime` from state and
formats it. If `getFormattedCurrentTime` suddenly needed access to
`state.loading` (for some inexplicable reason), for example, it would be easy to
make that change.

Finally, I represented times with the [momentJS](https://momentjs.com/) library,
because it has a nicer API than the built-in JavaScript Date library. For
example, you can get a formatted time string using moment with just
`time.format('h:mm:ss a')`.

## Future Improvements

This web application has a lot of room for improvement, both in terms of the
user interface and the code. Given more time, these are the improvements I would
make:

* Integrate the sunrise and sunset times into the visualization, instead of
  rendering them as plain text.
* Allow the user to select different dates and locations for the sun clock.
* Allow the user to switch to a fixed version of the clock in which noon is
  always at the top of the circle.
* Add an about page.
* Replace moment with a library built for managing times without dates, such as
  [js-joda](https://js-joda.github.io/js-joda/) (or something custom). Each
  moment object represents both a time and a date, but all we want in this
  application is times, so the dates can cause some confusing behavior (i.e.
  1:30 AM might be after 4:30 AM if they are on different days).
* Move `renderSunClockGraphic` code into a d3 section of the components
  directory, and split up some of its functions to separate files.
* Write more tests: unit tests, integration tests, and end-to-end tests
* If the application becomes big enough, use a statically typed variant of
  JavaScript, like Flow or Typescript. (I don't find Prop Types hugely helpful,
  so I didn't spend my time on those here.)
