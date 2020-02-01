var app = angular.module("myapp", ["ngRoute"])

    .config(function($routeProvider){
        
        $routeProvider
            .when("/home",
                {
                    templateUrl: "Views/Dashboard/Dashboard.html",
                    controller: "dashobardController as dashobardController"
                })
            .when("/showAll",
                {
                    templateUrl: "Views/AllRecords/AllRecords.html",
                    controller: "AllRecordsController"
                })
    });


