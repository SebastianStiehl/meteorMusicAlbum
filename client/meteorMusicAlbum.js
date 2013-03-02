var musicManager = {
    save: function (inputs) {
        var musicItem = {};

        $(inputs).each(function (index, el) {
            var name, $el = $(el);

            name = $el.attr("name");
            musicItem[name] = {value: $el.val(), label: musicManager.itemAttributes[name].label};
        });

        MusicItems.insert(musicItem);
    },

    itemAttributes: {
        "musicArtist": {label: "Artist", value: null},
        "releaseYear": {label: "Year", value: null},
        "musicLabel": {label: "Label", value: null}
    },

    eachKey: function (obj, context) {
        var key, res = "";

        for (key in obj) {
            res += context({key: key, value: obj[key]});
        }
        return res;
    }
};

Template.addMusic.itemAttributes = musicManager.itemAttributes;

Template.addMusic.events({
    'click button.add': function (event, template) {
        var inputs = template.findAll('input[type="text"]');

        musicManager.save(inputs);
    }
});

Template.musicList.events({
    "click ul": function (event) {
        var artist = $(event.currentTarget).find('.musicArtist').text();

        $('#remove input[name="musicArtist"]').val(artist);
    }
});

Template.removeMusic.events({
    "click button": function (event) {
        var artist = $('#remove input[name="musicArtist"]').val();

        MusicItems.remove({musicArtist: {value: artist, label: "Artist"} }, true);
    }
});

Template.removeMusic.inputName = function () {
    return "musicArtist";
};

Template.musicList.musicItems = function () {
    return MusicItems.find();
};

Template.addMusic.eachKey = musicManager.eachKey;
Template.musicList.eachKey = musicManager.eachKey;