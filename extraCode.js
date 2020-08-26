var Connection = require('tedious').connect;  
var config = {  
    server: 'localhost',
    port: 1433,
    authentication: {
        type: 'default',
        options: {
            userName: 'SA',
            password: 'Justwork@1'
        }
    },  
    options: {
        encrypt: false,
        database: 'testDB',
        rowCollectionOnDone: true,
        validateBulkLoadParameters: true
    }
}; 
var connection = new Connection(config);  
connection.on('connect', function(err) {  
    // If no error, then good to proceed.  
    console.log("Connected");  
    executeStatement();
});  
  
var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  
function executeStatement() {  
    request = new Request("SELECT * FROM dbo.TowerMapping;", function(err, rowCount, rows) {  
        if (err) {  
            console.log(err);
        }  
        console.log(jsonArray);
    });
    var jsonArray = [] //

    request.on('row', function(columns) {  

        var rowObject ={}; //

        columns.forEach(function(column) {  
          rowObject[column.metadata.colName] = column.value;
        });  
        jsonArray.push(rowObject);
    });
    connection.execSql(request)
}

// var sql = require('mysql');

// var config = {
//     server: 'localhost',
//     userName: 'SA',
//     password: 'Justwork@1',
//     database: 'testDB',
//     port: 1433,
//     options: {
//         encrypt: false
//     }
// }

// function getRec() {
//     var cons = new ConnectionPool(config);
//     cons.connect(function (err) {
//         if(err) 
//             console.log(err);
//         var req = new sql.Request(cons);
//         req.query("SELECT * FROM dbo.TowerMapping;", function(err, record) {
//             if(err) 
//                 console.log(err);
//             else
//                 console.log(record);
//             cons.close();
//         });
//     });

// }

// getRec();