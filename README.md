# React slideshow component `react-uberslides`

This is a wip library project that exposes a small library for displaying aspect ratio locked slideshows.

See [Online Demo](https://villhei.github.io/react-uberslides/)

## Features

The library provides a component that you can wrap into a div of any size and it will scale your slides to that div. When focused/selected or in fullscreen, the Slideshow component will handle `ARROW_LEFT` and `ARROW_RIGHT` keyup events to call the nextSlide callback. Swipe gestures for mobile are supported too.

## How to use

See [Examples](/examples/basic/)

## Running in development

Install dependencies

```
yarn
```

Run the demo from `examples/basic`

```
yarn dev
```

Run the tests

```
yarn test
```
