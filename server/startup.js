Meteor.startup(function () {

    if (MusicArtists.find().count() === 0) {
        var artists = ["Beastie Boys", "Daft Punk", "Gorillaz", "Kanye West", "U2"];

        _.each(artists, function (artistName) {
            MusicArtists.insert({name: artistName});
        });

        console.log("added initial artists: " + artists.length);
    }

    console.log("up " + new Date());
});