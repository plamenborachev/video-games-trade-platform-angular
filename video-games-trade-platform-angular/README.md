# VideoGamesTradePlatformAngular

- This project was generated with __[Angular CLI]__(https://github.com/angular/angular-cli) version 18.2.11.
- Features
    + todo
- Bonus Features:
    + [HTML 5 Geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
    + [Angular Animations](https://angular.dev/guide/animations)
- Used APIs:
    + [Google Maps API](https://developers.google.com/maps)*
    
    __*Note:__ If you want to use the functionality for getting current location address by [Google Maps API](https://developers.google.com/maps) please add your personal [Google Maps API](https://developers.google.com/maps)-Key in `video-games-trade-platform-angular\src\environments\environment.development.ts` - `API_KEY`

- The back-end is __Express.js__ with __Mongo DB__ as a database with __mongoose__ and __Mongo DB Compass__ under _free tier (500mb max)._

## Development server

- Run `npm install` to install needed dependencies in `node_moduls` folder.
- Run `ng serve` for a dev server.
- Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Troubleshooting

If you are experiencing issues while extracting compressed (zipped) file downloaded from [my repo](https://github.com/plamenborachev/video-games-trade-platform-angular.git) hitting Error 0x80010135: Path too long, please do one of the following:
- rename zip archive to `video-games-trade-platform.zip`;
- skip all error steps.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Application Overview

The visitors can view:
- Home page with the 3 last added games ordered in descending order starting from last added.
- All Games page with all available games ordered in descending order starting from last added.
- Search page where they can search all games by Title and Ganre.

They can also register with an username, email, telephone and password, allowing them to login and create their games and to like a game they are interested in (if the current user is not the author of the offer). Authors can edit or delete their games at any time.

## Functionality

### Guest (Not logged in)

The application provides Guest (not logged in) users with the functionality to Login, Register, and view the Home page, All Games page, Search page and Details page (without any functionality).

### Users (Logged in)

The application should provide Users (logged in) with the functionality to:
- Home page, All Games page, Search page.
- Create а new Game Offer [Create Game Offers].
- Access game details page [Details] allowing him/her to:
    + Like a game offer (if the current user is not the owner of the game).
    + Delete or Edit the course depending on the user's authentication (only for the owner of the current course).
- View their profile information by clicking on [`User's name` Profile]. On the profile page, the users see their username, email and telephone and the games they have created and their number, as well as the games they have liked and their number.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.