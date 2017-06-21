# Track - Version 1

## About Track
Track is a small web application I developed with three other Web Media Production students, for the Advanced Web Technologies unit in the first term of the third year of study. The brief for this unit required us to create and develop a small web application that uses at least two or more APIs.

## How does it work?

Track is written in HTML, CSS and Vanilla JavaScript. It works by using the `navigator` object, specifically using the `geolocation` property. This allows the application to access the user's latitude and longitude.

When the user's location has been found, a dynamic URL is created to access the NaPTAN API, using an AJAX request to fetch the data without reloading the page.

Once the data has been recieved, a `for` loop is used to access the first five stations in the array, as well as creating variables to access data such as the station name and CRS code. The station name and code is used to generate a table, with a row for each station.

When the closest stations have been found, a dynamic URL is created for each of the stations. This is used to access the timetable information for each station, using the Transport API to retrieve this information. Once again, a `for` loop is used to access the timetable information for each station and create variable for each piece of information, such as the service origin, destination, departure time and platform, as well as other relevant information.

Once all of the required information has been fetched and manipulated, code is generated and inserted in to the containers for each station.
