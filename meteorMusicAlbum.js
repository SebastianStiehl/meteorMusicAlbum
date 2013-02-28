if (Meteor.isClient) {
    Template.insertion.attributes = [
        {label: "Artist", name: "musicArtist"},
        {label: "Year", name: "releaseYear"}
    ];

    Template.insertion.events({
        'click input[type="button"]': function () {
            console.log(123);
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
