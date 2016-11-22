// function to get the user location
window.onload = function getUserLoc() {
    // see whether the users geolocation is working
    if (navigator.geolocation) {
        // console log to output whether geolocation works
        console.log("Geolocation is working");
        // *** not sure what this is doing ***
        navigator.geolocation.getCurrentPosition(showPosition);
        // function to be able to get the current latitude and longitude of user
        function showPosition(position) {
            // stores the current latitude and longitude of user
            var userLat = position.coords.latitude,
                userLon = position.coords.longitude;
            // console log the coordinates of user
            console.log("Latitude: " + userLat + " & " + "Longitude: " + userLon);
            // now we need to see what button the user has clicked to determine whether we need to show them underground stations or national rail stations
            // declare variables to store tfl and nrl buttons in dom
            var serviceBtn_tfl = document.querySelector(".tfl"),
                serviceBtn_nrl = document.querySelector(".nrl");
            // add event listeners to tfl and nrl buttons then run the function "getDataset to find out what button was clicked
            serviceBtn_tfl.addEventListener("click", getDataset);
            serviceBtn_nrl.addEventListener("click", getDataset);
            // function to get the dataset of what button was clicked
            function getDataset(e) {
                // variable to store the dataset
                var theDataset = e.target.dataset.service;
                // variable to store tfl/nrl container in dom
                    var tflWrapper = document.querySelector(".tfl_wrapper");
                    var nrlWrapper = document.querySelector(".nrl_wrapper");
                // log the dataset returned from element
                console.log(theDataset);
                // if/else statement to determine what button was pressed and what to show/hide
                // if the dataset contains tfl
                if (theDataset === "tfl") {
                    // logs the result and dataset entry
                    console.log("The result was " + theDataset);
                    // shows and hides tfl/nrl buttons
                    serviceBtn_tfl.classList.add("hidden");
                    serviceBtn_nrl.classList.remove("hidden");
                    // removes "hidden" class from nrlWrapper element
                    tflWrapper.classList.remove("hidden");
                    nrlWrapper.classList.add("hidden");
                    
                    
                    
                    
                    
                    
                    // if the dataset contains national rail
                } else if (theDataset === "nrl") {
                    // logs the result and dataset entry
                    console.log("The result was " + theDataset);
                    // shows and hides tfl/nrl buttons
                    serviceBtn_nrl.classList.add("hidden");
                    serviceBtn_tfl.classList.remove("hidden");
                   
                    // removes "hidden" class from nrlWrapper element
                    nrlWrapper.classList.remove("hidden");
                    tflWrapper.classList.add("hidden");
                    
                    // declare variables to store in array
                    var nrlStnWrapper = document.querySelectorAll(".nrl_station_wrapper"),
                        nrlStnName = document.querySelectorAll(".nrl_station_name"),
                        nrlStnCode = document.querySelectorAll(".nrl_station_code")
                    
                    // for loop to store each element for nrl station container, station name and station code
                    for (var i = 0; i < nrlStnWrapper.length; i++) {
                        // logs the divs for wrapper, name and code
//                        console.log(nrlStnWrapper[i]);
//                        console.log(nrlStnName[i]);
//                        console.log(nrlStnCode[i]);
                    }
            
                    // create the URL for national rail railway stations
                    var nrlURL = "https://data.gov.uk/data/api/service/transport/naptan_railway_stations/nearest?lat="+ userLat+"&lon="+userLon;
                    
                    // ajax request to get data from API
                    var request = new XMLHttpRequest();
                    request.open('GET', nrlURL, true);
                    request.onload = function() {
                        if (request.status >= 200 && request.status < 400) {
                            // console log to say it has worked
                            console.log("NRL AJAX request successful");
                            var NRLdata = JSON.parse(request.responseText);
                            // console log the data
//                            console.log(NRLdata);
                            // variable to get inside the json data
                            var NRLresults = NRLdata.result;
                            // console log the results array
//                            console.log(NRLresults);
                            // for loop to get the first five results in an array
                            
                            var transportAPI_url_array = [];
                            
                            for (var i = 0; i < 5; i++) {
                                // console log the first five entries individually
                                console.log(NRLresults[i]);
                                // declare variables for each piece of data we need from json
                                var jsonStnName = NRLresults[i].stationname,
                                    jsonStnCode = NRLresults[i].crscode,
                                    jsonStnCoords = NRLresults[i].latlong.coordinates;
                                
                                // console log the name and code for each station
                                console.log("Name: " + jsonStnName + " & Code: " + jsonStnCode + " Coordinates: " + jsonStnCoords[1] + "," + jsonStnCoords[0]);   
                                
                                // places data in to relevant element
                                nrlStnName[i].innerHTML = jsonStnName;
                                nrlStnCode[i].innerHTML = jsonStnCode;
                                
                                // create url for transport api request
                                var transportAPIURL = "http://transportapi.com/v3/uk/train/station/"+ jsonStnCode + "/live.json?app_id=03bf8009&app_key=d9307fd91b0247c607e098d5effedc97&darwin=false&train_status=passenger";
                            // log the url for each station 
                                console.log("The URL for " + jsonStnName.replace("Rail Station","") + "is " + transportAPIURL);
                                // push urls in to new array for each station
                                transportAPI_url_array.push(transportAPIURL);
                            }
                            
                            
                            // request for station one
                            var requestOne = new XMLHttpRequest();
                            requestOne.open('GET', transportAPI_url_array[0], true);

                            requestOne.onload = function() {
                                if (requestOne.status >= 200 && requestOne.status < 400) {
                                    // Success!
                                    var stnDataOne = JSON.parse(requestOne.responseText);
                                    
                                    var reqOneResults = stnDataOne.departures.all;
                                    
                                    
                                    for (var i = 0; i <= reqOneResults.length; i++) {
                                        
                                         // variables for each piece of json data from API
                                            var jsonTrainOperator = reqOneResults[i].operator,
                                                jsonPlatformNo = reqOneResults[i].platform,
                                                jsonDepartTime = reqOneResults[i].aimed_departure_time,
                                                jsonOriginName = reqOneResults[i].origin_name,
                                                jsonDestinationName = reqOneResults[i].destination_name,
                                                jsonServiceStatus = reqOneResults[i].status,
                                                jsonExpectedDepartTime = reqOneResults[i].expected_departure_time;
                                        
                                        console.log(jsonTrainOperator);
                                        console.log(jsonPlatformNo);
                                        console.log(jsonDepartTime);
                                        console.log(jsonOriginName);
                                        console.log(jsonDestinationName);
                                        console.log(jsonServiceStatus);
                                        console.log(jsonExpectedDepartTime); 
                                        
                                        var trainInfoWrapperOne = document.querySelector(".train_info_wrapper_one"),
                                            openIndivWrap = '<div class="indiv_train_wrap">',
                                            trainOperator = '<p class="train_operator">' + jsonTrainOperator + '</p>',
                                            trainDestination = '<p class="train_destination">' + jsonDestinationName + '</p>',
                                            trainStatus = '<p class="train_status">' + jsonServiceStatus + '</p>',
                                            trainDepart = '<p class="train_time_depart">' + jsonDepartTime + '</p>',
                                            trainExpectedDepart = '<p class="train_time_expected_depart">' + jsonExpectedDepartTime + '</p>',
                                            trainPlatform = '<p class="train_platform">' + jsonPlatformNo + '</p>',
                                            closeIndivWrap = '</div>';
                                        
                                        var placeholderOne = openIndivWrap + trainOperator + trainDestination + trainStatus + trainDepart + trainExpectedDepart + trainPlatform + closeIndivWrap;
                                        
                                        trainInfoWrapperOne.innerHTML += placeholderOne;
                                    }
                                } else {
                                    // We reached our target server, but it returned an error
                                }
                            };
                            requestOne.onerror = function() {
                                // There was a connection error of some sort
                            };
                            window.onload = requestOne.send();
                            
                            // request for station two
                            var requestTwo = new XMLHttpRequest();
                            requestTwo.open('GET', transportAPI_url_array[1], true);

                            requestTwo.onload = function() {
                                if (requestTwo.status >= 200 && requestTwo.status < 400) {
                                    // Success!
                                    var stnDataTwo = JSON.parse(requestTwo.responseText);
                                    
                                    var reqTwoResults = stnDataTwo.departures.all;
                                    
                                    for (var i = 0; i <= reqTwoResults.length; i++) {
                                        
                                         // variables for each piece of json data from API
                                            var jsonTrainOperator = reqTwoResults[i].operator,
                                                jsonPlatformNo = reqTwoResults[i].platform,
                                                jsonDepartTime = reqTwoResults[i].aimed_departure_time,
                                                jsonOriginName = reqTwoResults[i].origin_name,
                                                jsonDestinationName = reqTwoResults[i].destination_name,
                                                jsonServiceStatus = reqTwoResults[i].status,
                                                jsonExpectedDepartTime = reqTwoResults[i].expected_departure_time;
                                        
                                        console.log(jsonTrainOperator);
                                        console.log(jsonPlatformNo);
                                        console.log(jsonDepartTime);
                                        console.log(jsonOriginName);
                                        console.log(jsonDestinationName);
                                        console.log(jsonServiceStatus);
                                        console.log(jsonExpectedDepartTime); 
                                        
                                        var trainInfoWrapperTwo = document.querySelector(".train_info_wrapper_two"),
                                            openIndivWrap = '<div class="indiv_train_wrap">',
                                            trainOperator = '<p class="train_operator">' + jsonTrainOperator + '</p>',
                                            trainDestination = '<p class="train_destination">' + jsonDestinationName + '</p>',
                                            trainStatus = '<p class="train_status">' + jsonServiceStatus + '</p>',
                                            trainDepart = '<p class="train_time_depart">' + jsonDepartTime + '</p>',
                                            trainExpectedDepart = '<p class="train_time_expected_depart">' + jsonExpectedDepartTime + '</p>',
                                            trainPlatform = '<p class="train_platform">' + jsonPlatformNo + '</p>',
                                            closeIndivWrap = '</div>';
                                        
                                        var placeholderTwo = openIndivWrap + trainOperator + trainDestination + trainStatus + trainDepart + trainExpectedDepart + trainPlatform + closeIndivWrap;
                                        
                                        trainInfoWrapperTwo.innerHTML += placeholderTwo;
                                        
                                    }
                                    
                                } else {
                                    // We reached our target server, but it returned an error
                                }
                            };
                            requestTwo.onerror = function() {
                                // There was a connection error of some sort
                            };
                            window.onload = requestTwo.send();
                            
                            //request for station three
                            
                            var requestThree = new XMLHttpRequest();
                            requestThree.open('GET', transportAPI_url_array[2], true);

                            requestThree.onload = function() {
                                if (requestThree.status >= 200 && requestThree.status < 400) {
                                    // Success!
                                    var stnDataThree = JSON.parse(requestThree.responseText);
                                    
                                    console.log(stnDataThree);
                                    
                                    var reqThreeResults = stnDataThree.departures.all;
                                    
                                    for (var i = 0; i <= reqThreeResults.length; i++) {
                                        
                                         // variables for each piece of json data from API
                                            var jsonTrainOperator = reqThreeResults[i].operator,
                                                jsonPlatformNo = reqThreeResults[i].platform,
                                                jsonDepartTime = reqThreeResults[i].aimed_departure_time,
                                                jsonOriginName = reqThreeResults[i].origin_name,
                                                jsonDestinationName = reqThreeResults[i].destination_name,
                                                jsonServiceStatus = reqThreeResults[i].status,
                                                jsonExpectedDepartTime = reqThreeResults[i].expected_departure_time;
                                        
                                        var trainInfoWrapperThree = document.querySelector(".train_info_wrapper_three"),
                                            openIndivWrap = '<div class="indiv_train_wrap">',
                                            trainOperator = '<p class="train_operator">' + jsonTrainOperator + '</p>',
                                            trainDestination = '<p class="train_destination">' + jsonDestinationName + '</p>',
                                            trainStatus = '<p class="train_status">' + jsonServiceStatus + '</p>',
                                            trainDepart = '<p class="train_time_depart">' + jsonDepartTime + '</p>',
                                            trainExpectedDepart = '<p class="train_time_expected_depart">' + jsonExpectedDepartTime + '</p>',
                                            trainPlatform = '<p class="train_platform">' + jsonPlatformNo + '</p>',
                                            closeIndivWrap = '</div>';
                                        
                                        var placeholderThree = openIndivWrap + trainOperator + trainDestination + trainStatus + trainDepart + trainExpectedDepart + trainPlatform + closeIndivWrap;
                                        
                                        trainInfoWrapperThree.innerHTML += placeholderThree;
                                        
                                        console.log(jsonTrainOperator);
                                        console.log(jsonPlatformNo);
                                        console.log(jsonDepartTime);
                                        console.log(jsonOriginName);
                                        console.log(jsonDestinationName);
                                        console.log(jsonServiceStatus);
                                        console.log(jsonExpectedDepartTime); 
                                    }
                                    
                                    
                                } else {
                                    // We reached our target server, but it returned an error
                                }
                            };
                            requestThree.onerror = function() {
                                // There was a connection error of some sort
                            };
                            window.onload = requestThree.send();
                            
                            // request for station four
                            
                            var requestFour = new XMLHttpRequest();
                            requestFour.open('GET', transportAPI_url_array[3], true);

                            requestFour.onload = function() {
                                if (requestFour.status >= 200 && requestFour.status < 400) {
                                    // Success!
                                    var stnDataFour = JSON.parse(requestFour.responseText);
                                    
                                    console.log(stnDataFour);
                                    
                                    var reqFourResults = stnDataFour.departures.all;
                                    
                                    for (var i = 0; i <= reqFourResults.length; i++) {
                                        
                                         // variables for each piece of json data from API
                                            var jsonTrainOperator = reqFourResults[i].operator,
                                                jsonPlatformNo = reqFourResults[i].platform,
                                                jsonDepartTime = reqFourResults[i].aimed_departure_time,
                                                jsonOriginName = reqFourResults[i].origin_name,
                                                jsonDestinationName = reqFourResults[i].destination_name,
                                                jsonServiceStatus = reqFourResults[i].status,
                                                jsonExpectedDepartTime = reqFourResults[i].expected_departure_time;
                                        
                                        var trainInfoWrapperFour = document.querySelector(".train_info_wrapper_four"),
                                            openIndivWrap = '<div class="indiv_train_wrap">',
                                            trainOperator = '<p class="train_operator">' + jsonTrainOperator + '</p>',
                                            trainDestination = '<p class="train_destination">' + jsonDestinationName + '</p>',
                                            trainStatus = '<p class="train_status">' + jsonServiceStatus + '</p>',
                                            trainDepart = '<p class="train_time_depart">' + jsonDepartTime + '</p>',
                                            trainExpectedDepart = '<p class="train_time_expected_depart">' + jsonExpectedDepartTime + '</p>',
                                            trainPlatform = '<p class="train_platform">' + jsonPlatformNo + '</p>',
                                            closeIndivWrap = '</div>';
                                        
                                        var placeholderFour = openIndivWrap + trainOperator + trainDestination + trainStatus + trainDepart + trainExpectedDepart + trainPlatform + closeIndivWrap;
                                        
                                        trainInfoWrapperFour.innerHTML += placeholderFour;
                                        
                                        console.log(jsonTrainOperator);
                                        console.log(jsonPlatformNo);
                                        console.log(jsonDepartTime);
                                        console.log(jsonOriginName);
                                        console.log(jsonDestinationName);
                                        console.log(jsonServiceStatus);
                                        console.log(jsonExpectedDepartTime);
                                    }
                                    
                                    
                                } else {
                                    // We reached our target server, but it returned an error
                                }
                            };
                            requestFour.onerror = function() {
                                // There was a connection error of some sort
                            };
                            window.onload = requestFour.send();
                            
                            // request for stationFive
                            var requestFive = new XMLHttpRequest();
                            requestFive.open('GET', transportAPI_url_array[4], true);

                            requestFive.onload = function() {
                                if (requestFive.status >= 200 && requestFive.status < 400) {
                                    // Success!
                                    var stnDataFive = JSON.parse(requestFive.responseText);
                                    
                                    console.log(stnDataFive);
                                    
                                    var reqFiveResults = stnDataFive.departures.all;
                                    
                                    for (var i = 0; i <= reqFiveResults.length; i++) {
                                        
                                         // variables for each piece of json data from API
                                            var jsonTrainOperator = reqFiveResults[i].operator,
                                                jsonPlatformNo = reqFiveResults[i].platform,
                                                jsonDepartTime = reqFiveResults[i].aimed_departure_time,
                                                jsonOriginName = reqFiveResults[i].origin_name,
                                                jsonDestinationName = reqFiveResults[i].destination_name,
                                                jsonServiceStatus = reqFiveResults[i].status,
                                                jsonExpectedDepartTime = reqFiveResults[i].expected_departure_time;
                                        
                                        var trainInfoWrapperFive = document.querySelector(".train_info_wrapper_five"),
                                            openIndivWrap = '<div class="indiv_train_wrap">',
                                            trainOperator = '<p class="train_operator">' + jsonTrainOperator + '</p>',
                                            trainDestination = '<p class="train_destination">' + jsonDestinationName + '</p>',
                                            trainStatus = '<p class="train_status">' + jsonServiceStatus + '</p>',
                                            trainDepart = '<p class="train_time_depart">' + jsonDepartTime + '</p>',
                                            trainExpectedDepart = '<p class="train_time_expected_depart">' + jsonExpectedDepartTime + '</p>',
                                            trainPlatform = '<p class="train_platform">' + jsonPlatformNo + '</p>',
                                            closeIndivWrap = '</div>';
                                        
                                        var placeholderFive = openIndivWrap + trainOperator + trainDestination + trainStatus + trainDepart + trainExpectedDepart + trainPlatform + closeIndivWrap;
                                        
                                        trainInfoWrapperFive.innerHTML += placeholderFive;
                                        
                                        console.log(jsonTrainOperator);
                                        console.log(jsonPlatformNo);
                                        console.log(jsonDepartTime);
                                        console.log(jsonOriginName);
                                        console.log(jsonDestinationName);
                                        console.log(jsonServiceStatus);
                                        console.log(jsonExpectedDepartTime); 
                                    }
                                    
                                    
                                } else {
                                    // We reached our target server, but it returned an error
                                }
                            };
                            requestFive.onerror = function() {
                                // There was a connection error of some sort
                            };
                            window.onload = requestFive.send();

                                
                                
                                
                                
                                
                            
                            
                            
                            
                            
                            
                        } else {
                            // We reached our target server, but it returned an error
                        }
                    };
                    request.onerror = function() {
                        // There was a connection error of some sort
                    };
                    request.send();
                    
                    //////////////
                    // END AJAX //
                    //////////////
              
                    // if there is an error
                } else {
                    // logs the result and dataset entry
                    console.log("Error");
                }
            }   
        }
        
     // else statement for geolocation   
    } else {
    // console log to output whether geolocation works
        console.log("Geolocation is not working")
    }
}









//                                // a new ajax request to get the operator codes and other info
//                                var secondRequest = new XMLHttpRequest();
//                                request.open('GET', NRLoperatorURL, true);
//                                request.onload = function() {
//                                    if (request.status >= 200 && request.status < 400) {
//                                        // console log to see if request was successful
//                                        console.log("TransportAPI is working")
//                                        // variable to get the json data from API
//                                        var NRLoperatorData = JSON.parse(request.responseText);
//                                        // log data from api in the console
//                                        console.log(NRLoperatorData);
//                                        // variable to get in to the array
//                                        var NRLstnData = NRLoperatorData.departures.all;
//                                        // log NRLstnData to console
//                                        console.log(NRLstnData);
//                                        // for loop to get each entry in json array
//                                        for (var i = 0; i <= NRLstnData.length; i++) {
//                                            // log each individual train journey in console
//                                            console.log(NRLstnData[i]);
//                                            
//                                            // variables for each piece of json data from API
//                                            var jsonTrainOperator = NRLstnData[i].operator,
//                                                jsonPlatformNo = NRLstnData[i].platform,
//                                                jsonDepartTime = NRLstnData[i].aimed_departure_time,
//                                                jsonOriginName = NRLstnData[i].origin_name,
//                                                jsonDestinationName = NRLstnData.destination_name,
//                                                jsonServiceStatus = NRLstnData[i].status,
//                                                jsonExpectedDepartTime = NRLstnData[i].expected_departure_time;
//                                            
////                                            console.log(jsonTrainOperator);
////                                            console.log(jsonPlatformNo);
////                                            console.log(jsonDepartTime);
////                                            console.log(jsonOriginName);
////                                            console.log(jsonDestinationName);
////                                            console.log(jsonServiceStatus);
////                                            console.log(jsonExpectedDepartTime);
//                                        }
//                                        
//                                    
//                                        
//                                        
//                                        
//                                        
//                                        
//                                    } else {
//                                        // We reached our target server, but it returned an error
//  }
//};
//
//request.onerror = function() {
//  // There was a connection error of some sort
//};
//
//request.send();