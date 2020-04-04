const sql = require("../../server.js");

//constructor
const Space = function(space) {
    this.desc = space.Desc;
    this.status = space.Status;
    this.lat = space.Lat;
    this.long = space.Long;
    this.rowID = space.Rows_ID;
    this.lotID = space.Lots_ID;
    this.typeID = space.Type_ID;
};

//create a new space
Space.create = (newSpace, result) => {
    sql.query("INSERT INTO spaces SET ?", newSpace, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created space: ", {id: res.insertId, ...newSpace});
        result(null, { id: res.insertId, ...newSpace});
    });
};

//retrieve all spaces in database
Space.getAll = result => {
    sql.query("SELECT * FROM spaces", (err, res) => {
        if(err) {
            console.log("error:", err);
            result(null, err);
            return;
        }

        console.log("All spaces: ", res);
        result(null, res);
    });
};

//returns all available spaces in database
Space.findAvail = result => {
    sql.query("SELECT * FROM spaces WHERE `Status` = 1", (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Available spaces: ", res);
        result(null, res);
    });
};

//returns all available spaces in a row
Space.findAvailSpacesInRow = (rowID, result) => {
    sql.query("SELECT * FROM spaces WHERE `Status` = 1 and `Rows_ID` = ?", [rowID],
        (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Available spaces in row " + rowID + ": ", res);
        result(null, res);
    });
};

//returns all available spaces in lot
Space.findAvailSpacesInLot = (lotID, result) => {
    sql.query("SELECT * FROM spaces WHERE `Status` = 1 and `Lots_ID` = ?", [lotID],
        (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Available spaces in lot " + lotID + ": ", res);
        result(null, res);
    });
};

//returns all available handicap spaces
Space.findAvailHandicap = result => {
    sql.query("SELECT * FROM spaces WHERE `Status` = 1 and `Type_ID` = 5",
        (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Available Handicap spaces: ", res);
        result(null, res);
    });
};

//returns all occupied spaces
Space.findOccupied = result => {
    sql.query("SELECT * FROM spaces WHERE `Status` = 2", (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("All Occupied spaces: ", res);
        result(null, res);
    });
};

//returns all occupied spaces in a row
Space.findOccSpacesInRow = (rowID, result) => {
    sql.query("SELECT * FROM spaces WHERE `Status` = 2 and `Rows_ID` = ?", [rowID],
        (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Occupied spaces in row " + rowID + ": ", res);
        result(null, res);
    });
};

//returns all occupied in a lot
Space.findOccSpacesInLot = (lotID, result) => {
    sql.query("SELECT * FROM spaces WHERE `Status` = 2 and `Lots_ID` = ?", [lotID],
        (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Occupied spaces in lot " + lotID + ": ", res);
        result(null, res);
    });
};

//returns all reserved spaces
Space.findReservedSpaces = result => {
    sql.query("SELECT * FROM spaces WHERE `Status` = 3", (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Reserved spaces: ", res);
        result(null, res);
    });
};

//returns reserved spaces in a row
Space.findReservedSpacesInRow = (rowID, result) => {
    sql.query("SELECT * FROM spaces WHERE `Status` = 3 and `Rows_ID` = ?", [rowID], 
        (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Reserved spaces in row " + rowID + ": ", res);
        result(null, res);
    });
};

//returns reserved spaces in a lot
Space.findReservedSpacesInLot = (lotID, result) => {
    sql.query("SELECT * FROM spaces WHERE `Status` = 3 and `Lots_ID` = ?", [lotID],
        (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Reserved spaces in lot " + lotID + ": ", res);
        result(null, res);
    });
};

//returns all closed spaces
Space.findClosedSpaces = result => {
    sql.query("SELECT * FROM spaces WHERE `Status` = 4", (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Closed spaces: ", res);
        result(null, res);
    });
};

//returns clsoed spaces in a row
Space.findClosedSpacesInRow = (rowID, result) => {
    sql.query("SELECT * FROM spaces WHERE `Status` = 4 and `Rows_ID` = ?", [rowID],
        (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Closed spaces in row " + rowID + ": ", res);
        result(null, res);
    });
};

//returns all close spaces in a lot
Space.findClosedSpacesInLot = (lotID, result) => {
    sql.query("SELECT * FROM spaces WHERE `Status` = 4 and `Lots_ID` = ?", [lotID],
        (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Closed spaces in lot " + lotID + ": ", res);
        result(null, res);
    });
};

//sets a space's status to available
Space.markSpaceAvail = (id, result) => {
    sql.query(
      "UPDATE spaces SET `Status` = 1 WHERE `ID` = ?", [id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Space with the id
          result({ kind: "not_found" }, null);
          return;
        }    

        //returns changed space information
      sql.query("SELECT `ID`, `Desc`, `Status`, `Lat`, `Long`, `Rows_ID`, `Lots_ID`, `Type_ID` FROM spaces WHERE `ID` = ?", [id],
         (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Info for spaceID: " + id + ": ", res);
        result(null, res);
        });
    });
  };

//sets a space's status to occupied
Space.markSpaceOcc = (id, result) => {
    sql.query(
      "UPDATE spaces SET `Status` = 2 WHERE `ID` = ?", [id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Space with the id
          result({ kind: "not_found" }, null);
          return;
        }

        //returns changed space information
        sql.query("SELECT `ID`, `Desc`, `Status`, `Lat`, `Long`, `Rows_ID`, `Lots_ID`, `Type_ID` FROM spaces WHERE `ID` = ?", [id],
        (err, res) => {
       if(err) {
           console.log("error: ", err);
           result(null, err);
           return;
       }
       console.log("Info for spaceID: " + id + ": ", res);
       result(null, res);
       });
      });
};

//sets a space's status to reserved
Space.markSpaceReserved = (id, result) => {
   sql.query(
      "UPDATE spaces SET `Status` = 3 WHERE id = ?", [id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Space with the id
          result({ kind: "not_found" }, null);
          return;
        }
        
        //returns changed space information
        sql.query("SELECT `ID`, `Desc`, `Status`, `Lat`, `Long`, `Rows_ID`, `Lots_ID`, `Type_ID` FROM spaces WHERE `ID` = ?", [id],
         (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Info for spaceID: " + id + ": ", res);
        result(null, res);
        });
      });
};

//sets a space's status to closed
Space.markSpaceClosed = (id, result) => {
    sql.query(
      "UPDATE spaces SET `Status` = 4 WHERE id = ?", [id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Space with the id
          result({ kind: "not_found" }, null);
          return;
        }

        //returns changed space information
        sql.query("SELECT `ID`, `Desc`, `Status`, `Lat`, `Long`, `Rows_ID`, `Lots_ID`, `Type_ID` FROM spaces WHERE `ID` = ?", [id],
         (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Info for spaceID: " + id + ": ", res);
        result(null, res);
        });
      });
};

//returns all spaces in a lot and only displays ID and status - Nick
Space.lotInfo = (lotID, result) => {
    sql.query("SELECT id, status, `Rows_ID` FROM spaces WHERE `Lots_ID` = ?", [lotID],
    (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Information for lot: " + lotID + ": ", res);
        result(null, res);
    });
};

//returns row ID and status of spaces - Mo
Space.rowInfo = (rowID, result) => {
    sql.query("SELECT id, status, `Rows_ID` FROM spaces WHERE `Rows_ID` = ?", [rowID],
    (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Information for row: " + rowID + ": ", res);
        result(null, res);
    });
};

//returns information for a specific space
Space.spaceInfo = (id, result) => {
    sql.query("SELECT `ID`, `Desc`, `Status`, `Lat`, `Long`, `Rows_ID`, `Lots_ID`, `Type_ID` FROM spaces WHERE `ID` = ?", [id],
    (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Info for spaceID: " + id + ": ", res);
        result(null, res);
    });
};

module.exports = Space;