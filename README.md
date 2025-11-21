# Argus 👀 Twitch Extension

The Argus Twitch extension acts as an optional video component that shows viewers the current build in a `Hades II` run.

![Argus Screenshot](public/argus-screenshot.png)

## Installation instructions

To start using the Argus Twitch extension just go to `Twitch → Creator Dashboard → Extensions → Discovery` and search for Argus. Once you have installed the extension, the configuration panel there will help you with the rest of the setup.

Most notably, you will need `Hades II` installed and the Argus app (or mod, which is now deprecated). To install and configure the app, follow the instructions on our [main repository](https://github.com/bmilojkovic/argus-h2-app).

You can test the extension before going live by opening your `Stream Manager` on Twitch and clicking on the Argus 👀 icon in your `Quick Actions`. A window will pop up showing what your viewers will see when you go live.

## How Argus Works

If you want to play around with this code yourself:

- Running locally: `npm run dev`
- Building for Twitch: `npm run build` (then go into the created `dist` directory and zip its entire contents for publishing)

If you wish to dive deeper into how Argus works, you might want to look at two other relevant repositories:

- [Argus App](https://github.com/bmilojkovic/argus-h2-app)
- [Argus Backend](https://github.com/bmilojkovic/argus-h2-backend)

The app repository has a TECH_README that covers all the tech stuff in depth.

There is also a deprecated `Hades II` mod that used to do the job that the app now does:

- [Argus Mod](https://github.com/bmilojkovic/argus-h2-mod)
