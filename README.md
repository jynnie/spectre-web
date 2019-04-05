# Spectre

Web server component to a desktop overlay mod that allows other users to control "flashlights" on the screen. Playful experiment about the involvement of spectators seeing.

Somehow, our [first clip](https://clips.twitch.tv/HomelyAssiduousQueleaSoonerLater) went kind of viral.

## Installation 🔨

This is the server and web client component of spectre. Make sure to install the desktop component [here](https://github.com/jynnie/spectre-app).
 
```
# install dependencies
$ npm install
```

## Usage 🔦

```
# to start the server
$ npm start
```

When the application is run, access it on port 8080 via web browser. This has been tested on Firefox and Chrome in both desktop and mobile, may work on other web browsers. 

To connect to a screen, enter the corresponding room code and use mouse or touch in the mousepad square to control your light circle.

Users will be disconnected on session end (i.e. closing tab or browser crash) or after a minute of inactivity.

## Why did you make this? 👀

I developed this as part of a project to experiment with how spectators (spectres) can be recognized and play in the game space. What better way to highlight what spectators do then by *highlighting* what they see? Inspired by _Hidden Agenda_ and the flashlight mod in _osu!_, we have Spectre.

### List of Features in Consideration ⏲

* UI Feedback when room has been successfully entered
* Nicer CSS is nice

## Contributing 🙌

To suggest features or report bugs, create a [Github issue](https://github.com/jynnie/spectre-app).

## License 🔎
[CC-BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/) @ [jynnie](https://github.com/jynnie)