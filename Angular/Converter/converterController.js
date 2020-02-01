var app = angular.module("converter", []);
var myservice = angular.module("myservice", []);
app.controller("controller1", function($scope, myservice){
    
    $scope.currencies = myservice.currencies;
    $scope.convert = function(curr)
    {
        return myservice.convert($scope.txtQuantity*$scope.txtCosts, curr, $scope.select);
    }    
    //console.log(myservice.currencies)
    $scope.pay = ()=>{
        window.alert("Thanks");
    }
});
