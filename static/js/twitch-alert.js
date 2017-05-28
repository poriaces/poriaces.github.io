var streamersUpdate = function() {
    var key = "ph06xyfig2wp3z4qzz2mv6y49caq6un";
    var users = ["MrHamsterOW", "r0n5k1", "TipiOW", "karvarausku"];
    $(".twitch-alert").empty();
    users.forEach(function (user) {
        twitchInfo(user, key, function(data, err) {
            if (err) {
                console.error(err);
                return;
            }
            if (data.stream) {
                var se = $(".streamer[data-template]").clone();
                se.removeAttr("data-template");
                se.attr("href", "https://twitch.tv/"+user);
                se.find("img").attr("src", data.channel.logo);
                se.find("span").html("<b>"+data.channel.display_name+"</b> is streaming <b>"+data.stream.game+"</b>!");
                $(".twitch-alert").append(se);
            }
        });
    });
};
setInterval(streamersUpdate, 1000*60*2);
streamersUpdate();
