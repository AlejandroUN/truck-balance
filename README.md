# Balance Mula

A small personal app my family uses to log the trips of our truck: freight payments, advances, fuel, tolls and other trip costs, household expenses, and a monthly summary of what's left.

This is a private family tool, not a product. It is shared publicly only because that's how free GitHub Pages hosting works.

## How it works

- `index.html` is the whole app: a single page that installs on a phone like a native app (manifest + service worker).
- The data is **not** in this repository. It lives in a private Google Sheet, reached through a Google Apps Script endpoint that requires a PIN.
- `sw.js` keeps a copy of the app on the phone so it opens instantly and keeps working with weak signal.

## Notes

- Please don't try to access the data endpoint; it's rate-limited and locks after repeated wrong PINs.
- Issues and pull requests are not monitored.
- The icon is based on a [public-domain photo](https://commons.wikimedia.org/wiki/File:Kenworth_truck.jpg) from Wikimedia Commons, recolored. Kenworth is a trademark of PACCAR Inc.; this project is not affiliated with it.
