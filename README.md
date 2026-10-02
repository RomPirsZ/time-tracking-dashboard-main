# Frontend Mentor - Time tracking dashboard solution

This is a solution to the [Time tracking dashboard challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/time-tracking-dashboard-UIQ7167Jw). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Time tracking dashboard solution](#frontend-mentor---time-tracking-dashboard-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
    - [Useful resources](#useful-resources)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Switch between viewing Daily, Weekly, and Monthly stats

### Screenshot

![Desktop-Screenshot](/screenshots/screenshot-desktop.jpeg)

![Mobile-Screenshot](/screenshots/screenshot-mobile.jpeg)

### Links

- Solution URL: [Solution](https://github.com/RomPirsZ/time-tracking-dashboard-main)
- Live Site URL: [time-tracking-dashboard](https://rompirsz.github.io/time-tracking-dashboard-main/)

## My process

### Built with

- Semantic HTML5 markup
- CSS Grid and Flexbox
- `hsl()` color tokens matching the Frontend Mentor style guide
- [normalize.css](https://necolas.github.io/normalize.css/) for base resets
- Vanilla JavaScript (no framework, no build step)
- `fetch()` + `Promise` chain to load `data.json`
- Web Animations API (`Element.animate()`) for the value transitions
- Local [Rubik](https://fonts.google.com/specimen/Rubik) variable fonts (self-hosted) plus a Google Fonts CDN link
- Desktop-first layout with a `@media (max-width: 375px)` breakpoint

### What I learned

**Rendering the data instead of hardcoding it.** The first pass wrote the hours directly into the HTML. Rewiring it to `data.json` showed how much duplication that creates: six cards × two values × three timeframes. Moving the source of truth to a single file and letting JS render it means the markup stays as a readable static fallback while the values stay in one place.

```js
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    // render + wire up listeners
  })
  .catch((error) => console.error("Error to load JSON file:", error));
```

**Using the DOM's own data as state.** Instead of hardcoding a class per card, the script derives the class name from the JSON `title` and lets the data drive the mapping. `selfcare` needed a `replace()` because the JSON has a space in "Self Care" and class selectors don't.

```js
const selector = title.title.toLowerCase().replace("self care", "selfcare");
const currentHoursElement =
  document.querySelector(`.${selector} .current-hours`);
```

**Chaining animations with promises.** The Web Animations API returns an `Animation` object whose `finished` promise resolves when it completes, which made it possible to sequence fade-out → text swap → fade-in without `setTimeout` and without guessing durations.

```js
const anim = element.animate(outFrames, outOptions);

anim.finished.then(() => {
  element.animate(inFrames, inOptions);
  element.textContent = nextValue;
});
```

**The timeframe label is part of the requirement.** The challenge asks for "Yesterday", "Last Week" and "Last Month", so the previous-period text is rebuilt from a labels map plus the value rather than just swapped.

```js
const labels = { daily: "Yesterday", weekly: "Last Week", monthly: "Last Month" };
element.textContent = `${labels[timeframe]} - ${data.previous}hrs`;
```

**Accessibility and semantics.** `<time datetime="PT19H">` keeps the machine-readable duration next to the human-readable one, and `:focus-visible`-friendly buttons with `aria`-ready markup make the nav usable without a mouse.

**Responsive work is mostly removing constraints.** The mobile breakpoint replaced fixed heights with `min-height`, dropped the two-column `main` grid to one, turned the nav into a 3-column row, and centered the attribution.

```css
@media (max-width: 375px) {
  main { grid-template-columns: 1fr; }
  .mainCard nav { grid-template-columns: repeat(3, 1fr); }
}
```

### Continued development

- Replace the fixed `375px` breakpoint with a proper mobile-first set of breakpoints and test on real devices
- Add `aria-pressed` / `aria-selected` to the nav buttons so screen readers announce the active timeframe
- Render the cards from `data.json` entirely instead of duplicating them in HTML
- Add keyboard navigation and focus management for the card ellipsis buttons
- Introduce CSS custom properties for the palette so the theme lives in one place
- Try the design with `prefers-reduced-motion` in mind and skip the fade

### Useful resources

- [Web Animations API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
- [Using the Web Animations API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API)
- [Frontend Mentor Time tracking dashboard challenge](https://www.frontendmentor.io/challenges/time-tracking-dashboard-UIQ7167Jw)
- [Rubik - Google Fonts](https://fonts.google.com/specimen/Rubik)

## Author

- Frontend Mentor - [@RomPirsZ](https://www.frontendmentor.io/profile/RomPirsZ)
- GitHub - [@RomPirsZ](https://github.com/RomPirsZ)

## Acknowledgments

Challenge by [Frontend Mentor](https://www.frontendmentor.io?ref=challenge). Design assets and the style guide (`style-guide.md`, `design/`) come from the challenge starter.
