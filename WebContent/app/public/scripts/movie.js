$(document).ready(function () {

    setInterval(function () {
        var now = new Date();
        var hoursleft = 0;
        if(now.getHours()<5)
        {
            hoursleft =  Math.abs(5-now.getHours());
        }
        else
        {
            hoursleft =  Math.abs(now.getHours()-5-24)
        }
        var minutesleft = 0;
        if(now.getMinutes()<=30)
        {
            minutesleft= Math.abs(30-now.getMinutes());
        }
        else
        {
            minutesleft= Math.abs(30+(60-now.getMinutes()));
        }
        
        var secondsleft = Math.abs(now.getSeconds() -59);
        if (minutesleft < 10) minutesleft = "0" + minutesleft;
        if (secondsleft < 10) secondsleft = "0" + secondsleft;
        $("#timeSet").text("API requests completed. Visit after 5:30AM. Time Left: " + (hoursleft + " Hour " + ":" + minutesleft + " Minute " + ":" + secondsleft + " Second"));
    }, 1000);

    $(document).off("click", "#search-movie-button");
    $(document).on("click", "#search-movie-button", function (e) {
        e.preventDefault();
        let movieName = $("#home-movie-search").val().trim()
        if (movieName.length != 0) {
            $("#search-index-form").submit();
        }

    })
})