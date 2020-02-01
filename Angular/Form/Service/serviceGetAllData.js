app.service("myService", ['$http', function ($http) {

    this.getAlldata = function () {
        debugger
        console.log("in function");
        return $http({
            method: "GET",
            url: "http://localhost:3001/employee/"
        }).then(function (response) {
            debugger
            console.log(response);
            return response;
        }, (err) => {
            debugger
            console.log(err)
        });
    }

    this.addData = function (payload) {
        return $http({
            method: "Post",
            data: payload,
            url: "http://localhost:3001/employee/insert"
        }).then(function (response) {
            console.log(response);
            return response;
        }, (err) => {
            return {
                "status": "error",
                "error": err
            }
        });
    }

    this.deleteData = function(deleteId)
    {
        return $http({
            method:"Delete",
            url:"http://localhost:3001/employee/delete/" + deleteId
        }).then(function(response){
            return response;
        },function(err){
            return{
                "status": "error",
                "error": err
            }
        })
    }
}])