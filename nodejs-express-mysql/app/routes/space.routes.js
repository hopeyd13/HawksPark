// exports.index = function(req, res) {
//     res.render('space', {title: 'Parking Availability'});
// };

// exports.add_space = function(req, res){

// };

module.exports = app => {
    const spaces = require("../controllers/space.controller.js");

    //create a new space
    app.post("/spaces/create", spaces.create);
    
    //get all spaces
    app.get("/spaces/findAll", spaces.findAll);
    
    //get all available spaces
    app.get("/spaces/findAvail", spaces.findAvail);

    //get available spaces in a row
    app.get("/spaces/findAvailInRow/:rowID", spaces.findAvailSpacesInRow);

    //get available spaces in a lot
    app.get("/spaces/findAvailInLot/:lotID", spaces.findAvailSpacesInLot);

    //get all handicap spaces
    app.get("/spaces/findHandicap", spaces.findAvailHandicap);

    //get all occupied spaces
    app.get("/spaces/findOccupied", spaces.findOccupied);

    //get occupied spaces in row
    app.get("/spaces/findOccupiedInRow/:rowID", spaces.findOccupiedSpacesInRow);

    //get occupied spaces in lot
    app.get("/spaces/findOccupiedInLot/:lotID", spaces.findOccupiedSpacesInLot);

    //get all reserved spaces
    app.get("/spaces/findReserved", spaces.findReservedSpaces);

    //get reserved spaces in a row
    app.get("/spaces/findReservedInRow/:rowID", spaces.findReservedSpacesInRow);
    
    //get reserved spaces in a lot
    app.get("/spaces/findReservedInLot/:lotID", spaces.findReservedSpacesInLot);

    //get all closed spaces
    app.get("/spaces/findClosed", spaces.findClosedSpaces);

    //get closed spaces in a lot
    app.get("/spaces/findClosedInLot/:lotID", spaces.findClosedSpacesInLot);

    //get closed spaces in a row
    app.get("/spaces/findClosedInRow/:rowID", spaces.findClosedSpacesInRow);

    //set a space status to available
    app.put("/spaces/markSpaceAvail/:spaceID", spaces.markAvail);

    //set a space status to occupied
    app.put("/spaces/markSpaceOcc/:spaceID", spaces.markOcc);

    //set a space status to reserved
    app.put("/spaces/markSpaceReserved/:spaceID", spaces.markReserved);
    
    //set a space to closed
    app.put("/spaces/markSpaceClosed/:spaceID", spaces.markClosed);    

    //get information for all spaces in lot
    app.get("/spaces/lotInfo/:lotID", spaces.lotInfo);

    //get information for all spaces in row
    app.get("/spaces/rowInfo/:rowID", spaces.rowInfo);
}