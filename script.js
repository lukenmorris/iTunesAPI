$(document).ready(function(){
    $("#pickArtist").mouseenter(function(){
        $("#pickArtist").animate({
            height: '+=50px',
            width: '+=50px'
        });
    });
    $("#pickArtist").mouseleave(function(){
        $("#pickArtist").animate({
            height: '-=50px',
            width: '-=50px'
        },'fast');
    });
    $("#pickNumResults").mouseenter(function(){
        $("#pickNumResults").animate({
            height: '+=50px',
            width: '+=50px'
        });
    });
    $("#pickNumResults").mouseleave(function(){
        $("#pickNumResults").animate({
            height: '-=50px',
            width: '-=50px'
        },'fast');
    });

    $('#searchButton').on('click', function(){
        var artist = document.getElementById("pickArtist").value;
        console.log(artist);
        var numToDisplay = document.getElementById("pickNumResults").value;
        console.log(numToDisplay);

        $('#searchButton').animate('mouseenter',{color: 'cornsilk'});
        $.ajax({
            url: 'https://itunes.apple.com/search?limit=' + numToDisplay + '&term=' + artist,
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            success: function(result) {
                console.log(result);
                myFunction(result, numToDisplay, artist)},
            error: function() { alert('Failed!'); }
        });
    });

});

function myFunction(r, num, artist){
    var itunesArray = r.results;
    console.log(itunesArray);

    if(artist != "selectArtist" && num != "selectNumResults"){
        var result = "<table id='detailsListed' border=”1” cellpadding=15>";
        result +="<tr>";
        result+="<td>" + "Artist" + "</td>";
        result+="<td>" + "Album" + "</td>";
        result+="<td>" + "Album Cover" + "</td>";
        result+="</tr>";
        for (var i = 0; i < itunesArray.length; i++) {
            result += "<tr>";

            result += "<td>" + itunesArray[i].trackName + "</td>";
            result += "<td>" + itunesArray[i].collectionName + "</td>";
            result += "<td>" + "<img src=" + itunesArray[i].artworkUrl100 + "></td>";

            result += "</tr>";
        }
        result += "</table>"
        document.getElementById("resultTable").innerHTML = result;
        document.getElementById("resultTable").style.display = "block";
    } else {
        document.getElementById("resultTable").style.display = "none";
        document.getElementById("error").innerHTML = "ERROR. Please select an artist and a number of results to display in order to search iTunes. Click here to exit.";
        $("#error").click(function(){
            $("#error").hide('fast');
        });
        $("#searchButton").click(function(){
            $("#error").show('fast');
        });
    }

}
