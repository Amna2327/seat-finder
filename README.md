# Computer Lab Seat Finder

**Assignment 1: Client-side Web Application**
**Student:** [Your Name], Roll No. [Your Roll No.]
**Assigned idea:** #34, Computer Lab Seat Finder
**Extra rule or data variant:** None assigned

A responsive single-page web app that helps a student find a free computer lab seat between classes. Students can filter labs by accessible seats, GPU, and printer, hide labs with outdated occupancy data, see the total free seats, and update a lab's occupancy through a validated form.

## Live Site

https://amna2327.github.io/seat-finder/

## Setup

No installation or backend is needed.

1. Clone or download this repository.
2. Open `index.html` in a web browser.

Or run a local server from the project folder:

```bash
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

## Project Structure

```
seat-finder/
├── index.html        Page structure and form
├── css/
│   └── style.css     Layout, colours, responsive breakpoints
├── js/
│   ├── data.js       Sample lab records and the stale threshold
│   └── app.js        Filtering, rendering, freshness check, validation
├── screenshots/      Mobile, tablet, and desktop screenshots
└── README.md
```

## Features

- **Filters:** Accessible seat available, GPU, Printer, and "Show fresh data only."
- **Live summary:** Number of labs shown and total free seats across them.
- **Occupancy report form:** Select a lab, enter occupied seats, and submit. Input is validated for empty values, non-whole numbers, negative numbers, and values above the lab's capacity.
- **Stale data:** Labs whose last update is more than 30 minutes old are marked "Stale data." The threshold is set by `STALE_MINUTES` in `js/data.js`.
- **Accessible seat calculation:** Free accessible seats are the smaller of the lab's accessible seats and its free seats, since individual seats aren't tracked.

## Screenshots

- `screenshots/mobile.png`: phone width (about 375px)
- `screenshots/tablet.png`: tablet width (about 768px)
- `screenshots/desktop.png`: desktop width (about 1280px)

## Limitations

- Occupancy reports are stored in memory and reset when the page is refreshed.
- Individual seats are not tracked, so accessible seat counts are estimated.
- There is no login or admin account.

## AI Assistance and Attribution

I used an AI assistant to help plan the project steps and draft parts of the JavaScript and CSS. I reviewed the code, tested each feature in the browser, and changed the wording and validation messages myself. [Adjust this to describe exactly what you used AI for.]

No external code, fonts, icons, or images were reused. [If this is not true, list each item and its source.]

## Testing

The eight test cases from the design note were run in the browser: empty input, negative input, over-capacity input, a valid update, the accessible filter, stale labs, the empty-results message, and responsive layout at phone, tablet, and desktop widths.
