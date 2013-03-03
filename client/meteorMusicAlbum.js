var musicManager = {
    addArtistFrom: function (template) {
        var artist = {},
            somethingToAdd = false,
            inputs = template.findAll('input'),
            musicLabel = $(template.find('select'));

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
            artist.label = MusicLabels.findOne({"_id": musicLabel.val()});
            artist.labelName = artist.label.name;
            MusicArtists.insert(artist);
        }
    }
};

Session.set("sortingOrder", "name");

Template.addArtist.artistAttributes = [
    {attributeName: "name", label: "Name", attributeValue: ""}
];

Template.addArtist.musicLabels = function () {
    return MusicLabels.find();
};

Template.addArtist.events({
    'click button.add': function (event, template) {
        musicManager.addArtistFrom(template);
    }
});

Template.artistList.events({
    "click button": function () {
        var artist = this;
        MusicArtists.remove({"_id": artist["_id"]});
    }
});

Template.artistList.artists = function () {
    var option = {},
        sortingOrder = Session.get("sortingOrder");

    if (sortingOrder === "name") {
        option.sort = {name: 1, labelName: 1};
    } else if (sortingOrder === "nameRevers") {
        option.sort = {name: -1, labelName: -1};
    } else if (sortingOrder === "label") {
        option.sort = {labelName: 1, name: 1};
    } else if (sortingOrder === "labelRevers") {
        option.sort = {labelName: -1, name: -1};
    }

    console.log(option.sort);

    return MusicArtists.find({}, option);
};

Template.sorting.events({
    "change select": function (event, template) {
        var sortingOrder = $(template.find("select")).val();
        Session.set("sortingOrder", sortingOrder);
    }
});