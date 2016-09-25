# DiscoVR

This project aims to create a simple and easy-to-use web application for discovering virtual reality games and experiences.

## Features

* Directory-style site for browsing VR games
* Fully responsive design
* Filtering by supported features and devices
* Reactive search returns results as you type, includes partial matches
* Administrative interface for editing database

## How to run this project

This project requires [Meteor to be installed](https://www.meteor.com/install). Then [download DiscoVR](https://github.com/Jann3/DiscoVR/archive/master.zip), extract and run the meteor command inside the directory:

```cd DiscoVR-master
meteor
```

The site will then start up and be viewable, by default on [http://localhost:3000](http://localhost:3000)

To use the administrative interface, login at the bottom of the page (email: *test@test.com* password: *test123*).
These credentials should be changed in [server/main.js](https://github.com/Jann3/DiscoVR/blob/master/server/main.js) before deploying to production.

## Future work

* Rewrite front-end logic, move away from jQuery DOM traversal to template conditionals
* Expand routing to create more a fully fledged RESTful site than a single page application
* (possibly) Implement automatic web scraping from Steam/Oculus to populate database

## Known Issues

* none yet, but the site is still in beta

### What's this for?
It's my final project in a 6-part [Specialization of Web Development on Coursera](https://www.coursera.org/specializations/website-development)

Contributions and suggestions welcome