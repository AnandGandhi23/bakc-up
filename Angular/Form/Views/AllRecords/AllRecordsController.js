app.controller("AllRecordsController", ['$scope', "myService", function($scope, myService){
    callDataAPI();

    function callDataAPI()
    {
        console.log("aave to 6")
        myService.getAlldata().then(function (response) {
            $scope.data = response.data;
        });
    }
}])