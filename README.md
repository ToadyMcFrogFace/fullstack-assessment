# Fullstack Assessment

A few things to note. 
This is the first time I have worked with Python, Mongo and Angular 6 (only a tiny bit of angular 1 before)

Unfortunately I was unable to dockerize the dev env. 
Assume I need to create a nginx reverse proxy to server the angular fronted-end and python api. but ran out of time.
Ideally the process would be to pull the project, run `docker-compose up -d` in the root folder, and you would be good to go.

## Set Up
### Angular frontsend
To start the angular frontend you will need the latest node and npm.
Then install the Angular CLI globally. `npm install -g @angular/cli`

cd into frontend and run `ng serve`.

the project will be on `http://localhost:4200/`

### Python rest api
You wil need Python 3.7 and pip installed locally. 
Once you have that you need to install a few python packages. run the commands below
`python -m pip install pymongo`
`pip install flask`
`pip install flask-cors`

Then to start, cd into api and run `python app.py`

## About the project
### Python
I used flask instead of Tornado. Dr google informed me Tornado has more of a over head to learn, and as time was a factor, I took the faster route.

I did not have time to impliment any validation or security for the rest endpoints.

I used mongo for the db. 
Insted of creating a relationship between an event to geolocations, I just stored the geolocations in the events Bson object. Geolocation store dates specifically to events, so would never be shared.

### Angular
I did not have time to style the project, so huts the eyes a bit. 

On the create event page, when you click on the map to create points, Date inputs relating to the points are suppoed to appear on the right. This only works sometimes. To get it to work, after placing or removing the pins `click on the event name input`, then `click off the event name input`

I was going to add a google places search bar above the google map, so you can jump to where you want to place pins.

Also there are 2 arrays containing data about the geolocations, 
One with the google maps marker objects. The other with only the lat and long. Preferably this would just be in one array. That way I could make the pins draggable (you can see it commented out in the code) and the lat/lng would update dynamically.

Also there is no way to tell which date input is for what pin. I would add on hover of date input, map would center to associated pin.

And there are no failure messages, post loading icons, front end validations, styles or responsive.