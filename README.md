# Spectre

Web server component to a desktop overlay mod that allows other users to control "flashlights" on the screen. Playful experiment about the involvement of spectators seeing.

Somehow, our [first clip](https://clips.twitch.tv/HomelyAssiduousQueleaSoonerLater) went kind of viral.

## Installation 🔨

This is the server and web client component of spectre. Checkout the desktop component [here](https://github.com/jynnie/spectre-app).
 
```
# install dependencies
$ npm install
# start in development
$ npm run dev
# general start
$ npm start
```

## Usage 🔦

Users can connect to the web client via web browser (Firefox and Chrome currently stable in both desktop and mobile). Enter the room code of the desktop screen to connect to, and use mouse or touch in the mousepad square to control their light circle.

Users will be disconnected on session end or after a minute of inactivity.

## Why did you make this? 👀

I developed this as part of a project to experiment with how spectators (spectres) can be recognized and play in the game space. What better way to highlight what spectators do then by *highlighting* what they see? Inspired by _Hidden Agenda_ and the flashlight mod in _osu!_, we have Spectre.

### List of Features in Consideration ⏲

* UI Feedback when room has been successfully entered
* Nicer CSS is nice

## Contributing 🙌

To suggest features or report bugs, create a [Github issue](https://github.com/jynnie/spectre-app).

## License 🔎
[CC-BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/) @ [jynnie](https://github.com/jynnie)