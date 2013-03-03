var musicManager = {
    addArtistFrom: function (inputs) {
        var artist = {},
            somethingToAdd = false;

        _.each(inputs, function(input) {
            var $input = $(input),
                attributeName = $input.attr("name"),
                attributeValue = $input.val();

            if (attributeName && attributeValue) {
                artist[attributeName] = attributeValue;
                somethingToAdd = true;
            }
        });

        if (somethingToAdd) {
            console.log("added" + JSON.stringify(artist));
            MusicArtists.insert(artist);
        }
    }
};

Template.addArtist.artistAttributes = [
    {attributeName: "name", label: "Name", attributeValue: ""}
];

Template.addArtist.events({
    'keypress input': function (event, template) {
        if (event.which === 13) {
            var inputs = template.findAll('input');
            musicManager.addArtistFrom(inputs);
        }
    }
});

Template.artistList.events({
    "click li": function () {
        var artist = this;
        alert("This is '" + artist.name + "'");
    }
});

Template.artistList.artists = function () {
    return MusicArtists.find();
};