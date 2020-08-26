var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());

var server = app.listen(4000, function () {
    console.log('Node server is running..');
});

var Connection = require('tedious').connect;  
var config = {  
    server: 'localhost',
    port: 1433,
    authentication: {
        type: 'default',
        options: {
            userName: '',
            password: ''
        }
    },  
    options: {
        encrypt: false,
        database: '',
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
    request = new Request("SELECT * FROM dbo.Mapped;", function(err, rowCount, rows) {  
        if (err) {  
            console.log(err);
        }  
        console.log(jsonArray);
        app.get('/', function (req, res) {
            res.json({ data : jsonArray });
        });
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
