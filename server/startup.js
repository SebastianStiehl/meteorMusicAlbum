Meteor.startup(function () {
    var musicLabels = ["none", "Universal", "EMI", "Interspope", "Warner"];

    if (MusicLabels.find().count() === 0) {
        _.each(musicLabels, function (name) {
            MusicLabels.insert({name: name});
        });

        console.log("added initial labels: " + MusicLabels.find().count());
    }

    if (MusicArtists.find().count() === 0) {
        var artists = ["Beastie Boys", "Daft Punk", "Gorillaz", "Kanye West", "U2"];

        _.each(artists, function (name, index) {
            var label = MusicLabels.findOne({name: musicLabels[index]});
            MusicArtists.insert({name: name, label: label, labelName: label.name});
        });

        console.log("added initial artists: " + MusicArtists.find().count());
    }

    console.log("up " + new Date());
});