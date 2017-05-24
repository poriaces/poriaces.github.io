function twitchInfo(user, clientId, callback) {
    $.ajax({
        type: 'GET',
        url: 'https://api.twitch.tv/kraken/channels/' + user,
        headers: {
            'Client-ID': clientId
        },
        success: function(channelData) {
            channelData = channelData;
            $.ajax({
                type: 'GET',
                url: 'https://api.twitch.tv/kraken/streams/' + user,
                headers: {
                    'Client-ID': clientId
                },
                success: function(streamData) {
                    callback({channel: channelData, stream: streamData.stream}, null);
                },
                error: function(err) {
                    callback({channel: channelData, stream: null}, err);
                }
            });
        },
        error: function(err) {
            callback({channel: null, stream: null}, err);
        }
    });
}
