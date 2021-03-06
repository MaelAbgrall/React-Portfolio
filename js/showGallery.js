function convertDate(date) {
    console.log("convDate" + date);
    
    day = date.getDate();
    monthNo = date.getMonth() + 1;
    

    var StringDate = day + ' ';

    if (monthNo == 1) {
        StringDate += "Jan";
    }
    if (monthNo == 2) {
        StringDate += "Feb";
    }
    if (monthNo == 3) {
        StringDate += "Mar";
    }
    if (monthNo == 4) {
        StringDate += "Apr";
    }
    if (monthNo == 5) {
        StringDate += "May";
    }
    if (monthNo == 6) {
        StringDate += "Jun";
    }
    if (monthNo == 7) {
        StringDate += "Jul";
    }
    if (monthNo == 8) {
        StringDate += "Aug";
    }
    if (monthNo == 9) {
        StringDate += "Sep";
    }
    if (monthNo == 10) {
        StringDate += "Oct";
    }
    if (monthNo == 11) {
        StringDate += "Nov";
    }
    if (monthNo == 12) {
        StringDate += "Dec";
    }

    return StringDate
}

function writeCards(jsonObject) {
    var cardString = "";

    for (item in jsonObject) {
        cardString += '<a href="../html/album.html?id=' + jsonObject[item].id + '" class="hover">';
        cardString += '    <div class="card img-fluid">';
        cardString += '        <img class="card-img-top" src="' + jsonObject[item].cover + '" alt="Card image">';
        cardString += '        <div class="overlay">';

        // creating the title string
        var titledateString = '<div class="text">';

        /*******************************
         * print the album title and the date if specified
         *******************************
        */
        //check if the year and the month are specified, if not, the overlay won't print empty informations
        if (jsonObject[item].year) {
            if (jsonObject[item].month) {
                titledateString += jsonObject[item].name + '<br>(' + jsonObject[item].month + ', ' + jsonObject[item].year + ')';
            }

            if (jsonObject[item].month === "") { //if month is empty
                titledateString += jsonObject[item].name + '<br>(' + jsonObject[item].year + ')';
            }
        }

        if (jsonObject[item].year === "") { //if year is empty
            titledateString += jsonObject[item].name;
        }


        /********************************
         * print the *update* if an album was updated recently
         *******************************
        */
        // if new images had been added to the album, show "update" for one month
        if (jsonObject[item].newpic) {
            //convert string to date source: https://stackoverflow.com/a/22835394/9020761
            var parts = jsonObject[item].newpic.split('-');
            var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
            var dateString = convertDate(mydate);
            mydate.setMonth(mydate.getMonth() + 1);
            // if the album was updated in less than a month ago, print *update*
            /*if (mydate > new Date()) {
                titledateString += '<br><p class="updatetext">* updated ' + dateString + ' *</p>';
            }*/

            titledateString += '<br><p class="updatetext">* updated ' + dateString + ' *</p>';
        }

        //closing the title div
        titledateString += '</div>';

        // put the titleDate in the cardstring
        cardString = cardString + titledateString;

        cardString += '        </div>';
        cardString += '    </div>';
        cardString += '</a>';
    }

    //document.getElementById('spinner').style.display = "none";

    document.getElementById("gallery").innerHTML = cardString;
}



function init() {
    var jsonUrl = "../database/album_reference.json"

    //from https://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-get-parameters
    var loadedJSON;

    getData(dataURI = jsonUrl, function (response) {
        // Parse JSON string into object
        loadedJSON = JSON.parse(response);
        writeCards(loadedJSON);
    });
}

init();