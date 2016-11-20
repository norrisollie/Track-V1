
var showLoc = document.getElementById("show_loc"),
    getLoc = document.getElementById("get_loc");

getLoc.addEventListener("click", this.findLoc);

function findLoc() {
    if(navigator.geolocation) {
        console.log("GeoLocation is working");
        
        navigator.geolocation.getCurrentPosition(showPosition);
        
        function showPosition(position) {
    
    var latWrap = document.getElementById("latitude"),
        lonWrap = document.getElementById("longitude"),
        lat = position.coords.latitude,
        lon = position.coords.longitude;
            console.log("Lat: " + lat + " " + "Lon: " + lon);
    
            latWrap.innerHTML = "Your Latitude is: " + lat;
            lonWrap.innerHTML = "Your Longitude is: " + lon;
    
            var latAndLon = lat + "," + lon;
            console.log("latAndLon: " + latAndLon);
            
            var theURL = "https://data.gov.uk/data/api/service/transport/naptan_railway_stations/nearest?lat=" + lat + "&lon=" + lon;
            
            console.log("URL: " + theURL);
            
            $.ajax({
                dataType: "json",
                url: theURL,
                success: handleData
            })
            
            function handleData( json ) {
                
                console.log(json);
                
                var stations = json.result;
                
                console.log(stations);
                
                console.log(stations.length);
                
                for (var i = 0; i < 1; i++) {

                    console.log(stations[i]);
                    
                    var resultOne = stations[1],
                        resultTwo = stations[2],
                        resultThree = stations[3],
                        resultFour = stations[4],
                        resultFive = stations[5];
                    
                    console.log(stations[1])
                    console.log(stations[2])
                    console.log(stations[3])
                    console.log(stations[4])
                    console.log(stations[5])
                    
                    var stnOne = document.getElementById("station_one"),
                        stnTwo = document.getElementById("station_two"),
                        stnThree = document.getElementById("station_three"),
                        stnFour = document.getElementById("station_four"),
                        stnFive = document.getElementById("station_five"),
                        
                        stnOneName = document.getElementById("station_name_one"),
                        stnTwoName = document.getElementById("station_name_two"),
                        stnThreeName = document.getElementById("station_name_three"),
                        stnFourName = document.getElementById("station_name_four"),
                        stnFiveName = document.getElementById("station_name_five"),
                        
                        stnOneCode = document.getElementById("station_code_one"),
                        stnTwoCode = document.getElementById("station_code_two"),
                        stnThreeCode = document.getElementById("station_code_three"),
                        stnFourCode = document.getElementById("station_code_four"),
                        stnFiveCode = document.getElementById("station_code_five");
                    
                    
                    var jsonStnOneName = stations[0].stationname,
                        jsonStnOneCode = stations[0].crscode,
                        jsonStnTwoName = stations[1].stationname,
                        jsonStnTwoCode = stations[1].crscode,
                        jsonStnThreeName = stations[2].stationname,
                        jsonStnThreeCode = stations[2].crscode,
                        jsonStnFourName = stations[3].stationname,
                        jsonStnFourCode = stations[3].crscode,
                        jsonStnFiveName = stations[4].stationname,
                        jsonStnFiveCode = stations[4].crscode;
                    
                    console.log(jsonStnOneName);
                    console.log(jsonStnOneCode);
                    console.log(jsonStnTwoName);
                    console.log(jsonStnTwoCode);
                    console.log(jsonStnThreeName);
                    console.log(jsonStnThreeCode);
                    console.log(jsonStnFourName);
                    console.log(jsonStnFourCode);
                    console.log(jsonStnFiveName);
                    console.log(jsonStnFiveCode);
                    
                    stnOneName.innerHTML = jsonStnOneName;
                    stnOneCode.innerHTML = jsonStnOneCode;
                    stnTwoName.innerHTML = jsonStnTwoName;
                    stnTwoCode.innerHTML = jsonStnTwoCode;
                    stnThreeName.innerHTML = jsonStnThreeName;
                    stnThreeCode.innerHTML = jsonStnThreeCode;
                    stnFourName.innerHTML = jsonStnFourName;
                    stnFourCode.innerHTML = jsonStnFourCode;
                    stnFiveName.innerHTML = jsonStnFiveName;
                    stnFiveCode.innerHTML = jsonStnFiveCode;
                    
                    
                    
                    
                    
                    
                }
            }
        }
    } else {
        console.log("GeoLocation is not working");
        latWrap.innerHTML = "Your Latitude could not be found."
        lonWrap.innerHTML = "Your Longitude could not be found."
    }
}