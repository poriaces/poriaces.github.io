(function(){
    var twitchClientId = 'ph06xyfig2wp3z4qzz2mv6y49caq6un';
    var twitchUpdateInterval = 1000 * 60;
    var sortStreamers = function() {
        var streamers = $(".streamer");
        streamers.sort(function (a, b) {
            var aScore = parseInt($(a).attr("data-score"));
            var bScore = parseInt($(b).attr("data-score"));
            if (aScore > bScore)
                return -1;
            if (bScore > aScore)
                return 1;
            return 0;
        });
        streamers.each(function() {
            $(".streamer-container").append($(this));
        });
    }
    var twitchInfoUpdater = function() {
        var scores = {};
        $('.streamer').each(function () {
            var that = $(this);
            var usr = $(this).attr('data-username');
            scores[usr] = 0;

            $.ajax({
                type: 'GET',
                url: 'https://api.twitch.tv/kraken/channels/' + usr,
                headers: {
                    'Client-ID': twitchClientId
                },
                success: function(data) {
                    scores[usr] = data.followers + data.views;
                    that.find('img.streamer-logo').each(function () {
                        $(this).attr('src', data.logo);
                    });
                    that.find('.streamer-name').each(function () {
                        $(this).text(data.display_name);
                    });
                    that.find('.streamer-status').each(function () {
                        $(this).text(data.status);
                    });
                    that.find('.streamer-followers').each(function () {
                        $(this).text(data.followers);
                    });
                    that.find('.streamer-views').each(function () {
                        $(this).text(data.views);
                    });
                    $.ajax({
                        type: 'GET',
                        url: 'https://api.twitch.tv/kraken/streams/' + usr,
                        headers: {
                            'Client-ID': twitchClientId
                        },
                        success: function(data) {
                            if (data.stream === null) {
                                that.find('.streamer-online').each(function () {
                                    $(this).text("")
                                });
                                that.find('.streamer-viewers').each(function () {
                                    $(this).html("<i>Offline</i>");
                                });
                                that.find('.streamer-game').each(function () {
                                    $(this).html("<i>Offline</i>");
                                });
                                that.attr("data-score", scores[usr]);
                                sortStreamers();
                                return;
                            }
                            scores[usr] += 1000000000;
                            that.find('.streamer-online').each(function () {
                                $(this).text("Live!")
                            });
                            that.find('img.streamer-logo').each(function () {
                                $(this).attr('src', data.stream.preview.medium);
                            });
                            that.find('.streamer-viewers').each(function () {
                                $(this).parent().removeClass("hidden");
                                $(this).text(data.stream.viewers);
                            });
                            that.find('.streamer-game').each(function () {
                                $(this).parent().removeClass("hidden");
                                $(this).text(data.stream.game);
                            });

                            that.attr("data-score", scores[usr]);
                            sortStreamers();
                        },
                        error: function(err) {
                            console.error(err);
                        }
                    });
                },
                error: function(err) {
                    console.error(err);
                }
            });
        });
    }
    twitchInfoUpdater();
    window.setInterval(twitchInfoUpdater, twitchUpdateInterval);
})();
