// variable to get the loading message element
    var findLocMsg = document.querySelector(".loading_message");

// find the users location
// runs on load when window opens
window.onload = function findLocation() {
    
    // find if the browser supports geolocation
    if(navigator.geolocation) {
        
        // logs to the console that geolocation is working
        console.log("Geolocation is working, finding your location...");
        
        // update user on progress
        findLocMsg.innerHTML = "Finding your location....";
            
    
        // required to locate the current position of user
        navigator.geolocation.getCurrentPosition(getPosition);
        
        // function to get the latitude and longitude of user
        function getPosition(position) {
            
            // variables to store coordinates of user
            var userLat = position.coords.latitude,
                userLon = position.coords.longitude;
            
            // logs the lat and lon of user
            console.log("User's location: " + userLat + "," + userLon);
            
            // shows the coordinates to user
            findLocMsg.innerHTML = "Searching for closest stations...";
            
            return findStations(userLat,userLon)
        }
    
        // if geolocation doesnt work
    } else {
        
        // logs message to console
        console.log("Geolocation isn't working");
        
        // displays message to user
        findLocMsg.innerHTML = "Geolocation isn't working";
    }
    
}

// push urls to an array
var requestURL_arr = [];

// function to find the closest stations using ajax request to get data
function findStations(userLat,userLon) {
    
    // log the users coordinates just to check
    console.log(userLat + "," + userLon);
    
    // construct the url to get the closest stations from the API
    var getStationsURL = "https://data.gov.uk/data/api/service/transport/naptan_railway_stations/nearest?lat=" + userLat + "&lon=" + userLon;
    
    // log the url just for reference
    console.log(getStationsURL);
    
    // update user on progress
        findLocMsg.innerHTML = "Searching for stations...";
            
    
    // ajax request to get the data stored in the API
    var locateStationReq = new XMLHttpRequest();
    
    // open the request
    locateStationReq.open('GET', getStationsURL, true);
    
    // run this function when request has been opened
    locateStationReq.onload = function() {
        
        // if the request is successful, do something
        if (locateStationReq.status >= 200 && locateStationReq.status < 400) {
            
            // the request was successful
            // variable to store the data from API request
            var stationData = JSON.parse(locateStationReq.responseText);
            
            // log the data to console just to confirm it works
            console.log(stationData);
            
            // variable to store individual results in an array
            var stationDataResults = stationData.result;
            
            // variables for the elements required to show data to user
            var stationCode = document.querySelectorAll(".station_code"),
                stationName = document.querySelectorAll(".station_name");
            
            // for loop to get the stations
            for (i = 0; i < 5; i++) {
                
                // log the information for each station
                console.log(stationDataResults[i])
                
                // variable to store individual data from json data
                var jsonStationName = stationDataResults[i].stationname,
                    jsonStationCode = stationDataResults[i].crscode,
                    // to remove the "Rail Station" string
                    jsonStationName = jsonStationName.replace(" Rail Station", "");
                
                // log each piece of data for each station
                console.log("Station Name: " + jsonStationName + " & Station Code: " + jsonStationCode);
                
                // add station info to html
                stationName[i].innerHTML = jsonStationName;
                stationCode[i].innerHTML = jsonStationCode;
                
                // generate a url for the API request for transportAPI
                var transportAPI_url = "https://transportapi.com/v3/uk/train/station/" + jsonStationCode + "/live.json?app_id=03bf8009&app_key=d9307fd91b0247c607e098d5effedc97&darwin=true&train_status=passenger"
                
                // push urls in to an array
                requestURL_arr.push(transportAPI_url);
                
            }
            
            // return the data to be used in the timetable data request function
                return timetableDataReq(requestURL_arr, jsonStationCode);
                
            
            // if request is not successful, do this
        } else {
            // We reached our target server, but it returned an error
        }
    };
    // if there is an error with the request, run this function
    locateStationReq.onerror = function() {
        // There was a connection error of some sort
    };
    
    // send the request
    locateStationReq.send();
       
}

var requestData_obj = {
    "request_1" : [],
    "request_2" : [],
    "request_3" : [],
    "request_4" : [],
    "request_5" : []
}
    


function timetableDataReq(requestURL_arr, jsonStnCode) {
    
    // update user on progress
    findLocMsg.innerHTML = "Finding the train timetable...";
    
    for (var i = 0; i < requestURL_arr.length; i++) {
        
        console.log(requestURL_arr[i]);
        
    }
    
    // request 1
    
    var request_stn1 = new XMLHttpRequest();
        request_stn1.open('GET', requestURL_arr[0] , true);

    request_stn1.onload = function() {
        if (request_stn1.status >= 200 && request_stn1.status < 400) {
            // Success!
            var request1_data = JSON.parse(request_stn1.responseText);
            
            // push data in to an array in an object
            requestData_obj.request_1.push(request1_data);
            
        } else {
            // We reached our target server, but it returned an error
        }
    };

    request_stn1.onerror = function() {
        // There was a connection error of some sort
    };
    
    request_stn1.send();
    
    // request 2
    
    var request_stn2 = new XMLHttpRequest();
        request_stn2.open('GET', requestURL_arr[1] , true);

    request_stn2.onload = function() {
        if (request_stn2.status >= 200 && request_stn2.status < 400) {
            // Success!
            var request2_data = JSON.parse(request_stn2.responseText);
            
            // push data in to an array in an object
            requestData_obj.request_2.push(request2_data);
            
        } else {
            // We reached our target server, but it returned an error
        }
    };

    request_stn2.onerror = function() {
        // There was a connection error of some sort
    };
    
    request_stn2.send();
    
    // request 3
    
    var request_stn3 = new XMLHttpRequest();
        request_stn3.open('GET', requestURL_arr[2] , true);

    request_stn3.onload = function() {
        if (request_stn3.status >= 200 && request_stn3.status < 400) {
            // Success!
            var request3_data = JSON.parse(request_stn3.responseText);
            
            // push data in to an array in an object
            requestData_obj.request_3.push(request3_data);
            
        } else {
            // We reached our target server, but it returned an error
        }
    };

    request_stn3.onerror = function() {
        // There was a connection error of some sort
    };
    
    request_stn3.send();
    
    // request 4
    
    var request_stn4 = new XMLHttpRequest();
        request_stn4.open('GET', requestURL_arr[3] , true);

    request_stn4.onload = function() {
        if (request_stn4.status >= 200 && request_stn4.status < 400) {
            // Success!
            var request4_data = JSON.parse(request_stn4.responseText);
            
            // push data in to an array in an object
            requestData_obj.request_4.push(request4_data);
            
        } else {
            // We reached our target server, but it returned an error
        }
    };

    request_stn4.onerror = function() {
        // There was a connection error of some sort
    };
    
    request_stn4.send();
    
    // request 5
    
    var request_stn5 = new XMLHttpRequest();
        request_stn5.open('GET', requestURL_arr[4] , true);

    request_stn5.onload = function() {
        if (request_stn5.status >= 200 && request_stn5.status < 400) {
            // Success!
            var request5_data = JSON.parse(request_stn5.responseText);
            
            // push data in to an array in an object
            requestData_obj.request_5.push(request5_data);
            
        } else {
            // We reached our target server, but it returned an error
        }
    };

    request_stn5.onerror = function() {
        // There was a connection error of some sort
    };
    
    request_stn5.send();
       
    //

    setTimeout( function(){
        
        var closestStation = requestData_obj["request_1"][0].station_name;
        var req1 = requestData_obj["request_1"][0].departures.all;
        var req2 = requestData_obj["request_2"][0].departures.all;
        var req3 = requestData_obj["request_3"][0].departures.all;
        var req4 = requestData_obj["request_4"][0].departures.all;
        var req5 = requestData_obj["request_5"][0].departures.all;
        
        console.log(req1)
        console.log(req2)
        console.log(req3)
        console.log(req4)
        console.log(req5)
        
        // update user on progress
        findLocMsg.innerHTML = "Your closest station is " + closestStation;
        
        // station 1
        for (var i = 0; i < req1.length; i++) {
            console.log(req1[i])
            
            json_origin = req1[i].origin_name,
            json_destination = req1[i].destination_name,
            json_status = req1[i].status,
            json_operator = req1[i].operator,
            json_platform = req1[i].platform,
            json_expected_departure = req1[i].expected_departure_time;
            
            var container_stn1 = document.querySelector(".info_1");
            
            var container =
                '<div class="service_info_indiv">'
            + '<p class="depart_time">'
            + '<span class="depart_name left">Departs At: </span>'
            + '<span class="act_depart_time right">' + json_expected_departure + '</span></p>'
            + '<p class="train_dest">'
            + '<span class="dest_word left"> Dest: </span>'
            + '<span class="act_dest right">' + json_destination + '</span></p>'
            + '<p class="train_origin">'
            + '<span class="origin_word left">Origin: </span>'
            + '<span class="act_origin right">' + json_origin + '</span></p>'
            + '<p class="stn_plat">'
            + '<span class="plat_word left">Plat: </span>'
            + '<span class="act_plat right">' + json_platform + '</span></p>'
            + '<p class="train_status">'
            + '<span class="status_word left">Status: </span>'
            + '<span class="act_status right">' + json_status + '</span>'
            + '<p class="train_op">'
            + '<span class="operator_word left"> Operator: </span>'
            + '<span class="act_operator right">' + json_operator + '</span>'
            + '</p>'
            + '</div>'
            
            container_stn1.innerHTML += container ;
            
        }
        
        for (var i = 0; i < req2.length; i++) {
            console.log(req2[i])
            
            var
            json_origin = req2[i].origin_name,
            json_destination = req2[i].destination_name,
            json_status = req2[i].status,
            json_operator = req2[i].operator,
            json_platform = req2[i].platform,
            json_expected_departure = req2[i].expected_departure_time;
            
            var container_stn2 = document.querySelector(".info_2");
            
            var container =
                '<div class="service_info_indiv">'
            + '<p class="depart_time">'
            + '<span class="depart_name left">Departs At: </span>'
            + '<span class="act_depart_time right">' + json_expected_departure + '</span></p>'
            + '<p class="train_dest">'
            + '<span class="dest_word left"> Dest: </span>'
            + '<span class="act_dest right">' + json_destination + '</span></p>'
            + '<p class="train_origin">'
            + '<span class="origin_word left">Origin: </span>'
            + '<span class="act_origin right">' + json_origin + '</span></p>'
            + '<p class="stn_plat">'
            + '<span class="plat_word left">Plat: </span>'
            + '<span class="act_plat right">' + json_platform + '</span></p>'
            + '<p class="train_status">'
            + '<span class="status_word left">Status: </span>'
            + '<span class="act_status right">' + json_status + '</span>'
            + '<p class="train_op">'
            + '<span class="operator_word left"> Operator: </span>'
            + '<span class="act_operator right">' + json_operator + '</span>'
            + '</p>'
            + '</div>'
            
            container_stn2.innerHTML += container;
        }
        
        for (var i = 0; i < req3.length; i++) {
            console.log(req3[i])
            
            var
            json_origin = req3[i].origin_name,
            json_destination = req3[i].destination_name,
            json_status = req3[i].status,
            json_operator = req3[i].operator,
            json_platform = req3[i].platform,
            json_expected_departure = req3[i].expected_departure_time;
            
            var container_stn3 = document.querySelector(".info_3");
            
            var container =
                '<div class="service_info_indiv">'
            + '<p class="depart_time">'
            + '<span class="depart_name left">Departs At: </span>'
            + '<span class="act_depart_time right">' + json_expected_departure + '</span></p>'
            + '<p class="train_dest">'
            + '<span class="dest_word left"> Dest: </span>'
            + '<span class="act_dest right">' + json_destination + '</span></p>'
            + '<p class="train_origin">'
            + '<span class="origin_word left">Origin: </span>'
            + '<span class="act_origin right">' + json_origin + '</span></p>'
            + '<p class="stn_plat">'
            + '<span class="plat_word left">Plat: </span>'
            + '<span class="act_plat right">' + json_platform + '</span></p>'
            + '<p class="train_status">'
            + '<span class="status_word left">Status: </span>'
            + '<span class="act_status right">' + json_status + '</span>'
            + '<p class="train_op">'
            + '<span class="operator_word left"> Operator: </span>'
            + '<span class="act_operator right">' + json_operator + '</span>'
            + '</p>'
            + '</div>'
            
            container_stn3.innerHTML += container;
        }
        
        for (var i = 0; i < req4.length; i++) {
            console.log(req4[i])
            
            var
            json_origin = req4[i].origin_name,
            json_destination = req4[i].destination_name,
            json_status = req4[i].status,
            json_operator = req4[i].operator,
            json_platform = req4[i].platform,
            json_expected_departure = req4[i].expected_departure_time;
            
            var container_stn4 = document.querySelector(".info_4");
            
            var container =
                '<div class="service_info_indiv">'
            + '<p class="depart_time">'
            + '<span class="depart_name left">Departs At: </span>'
            + '<span class="act_depart_time right">' + json_expected_departure + '</span></p>'
            + '<p class="train_dest">'
            + '<span class="dest_word left"> Dest: </span>'
            + '<span class="act_dest right">' + json_destination + '</span></p>'
            + '<p class="train_origin">'
            + '<span class="origin_word left">Origin: </span>'
            + '<span class="act_origin right">' + json_origin + '</span></p>'
            + '<p class="stn_plat">'
            + '<span class="plat_word left">Plat: </span>'
            + '<span class="act_plat right">' + json_platform + '</span></p>'
            + '<p class="train_status">'
            + '<span class="status_word left">Status: </span>'
            + '<span class="act_status right">' + json_status + '</span>'
            + '<p class="train_op">'
            + '<span class="operator_word left"> Operator: </span>'
            + '<span class="act_operator right">' + json_operator + '</span>'
            + '</p>'
            + '</div>'
            
            container_stn4.innerHTML += container;
            
        }
        
        for (var i = 0; i < req5.length; i++) {
            console.log(req5[i])
            
            var
            json_origin = req5[i].origin_name,
            json_destination = req5[i].destination_name,
            json_status = req5[i].status,
            json_operator = req5[i].operator,
            json_platform = req5[i].platform,
            json_expected_departure = req5[i].expected_departure_time;
            
            var container_stn5 = document.querySelector(".info_5");
            
            var container =
                '<div class="service_info_indiv">'
            + '<p class="depart_time">'
            + '<span class="depart_name left">Departs At: </span>'
            + '<span class="act_depart_time right">' + json_expected_departure + '</span></p>'
            + '<p class="train_dest">'
            + '<span class="dest_word left"> Dest: </span>'
            + '<span class="act_dest right">' + json_destination + '</span></p>'
            + '<p class="train_origin">'
            + '<span class="origin_word left">Origin: </span>'
            + '<span class="act_origin right">' + json_origin + '</span></p>'
            + '<p class="stn_plat">'
            + '<span class="plat_word left">Plat: </span>'
            + '<span class="act_plat right">' + json_platform + '</span></p>'
            + '<p class="train_status">'
            + '<span class="status_word left">Status: </span>'
            + '<span class="act_status right">' + json_status + '</span>'
            + '<p class="train_op">'
            + '<span class="operator_word left"> Operator: </span>'
            + '<span class="act_operator right">' + json_operator + '</span>'
            + '</p>'
            + '</div>'
            
            container_stn5.innerHTML += container;
        }
        
        // removes hidden class at the end to show data
        var stn_wrap = document.querySelector(".station_wrapper");
        if (stn_wrap.classList.contains("hidden")) {
            stn_wrap.classList.remove("hidden");
        }
    }, 4000);
}