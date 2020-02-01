
app.controller("dashobardController", ['$scope', 'myService', function ($scope, myService) {
    callDataAPI();
    $scope.addData = function () {
        var radMale = document.getElementById("radMale");
        var objData = {
            "Name": $scope.name,
            "Email": $scope.email,
            "Gender": radMale.checked ? "Male" : "Female",
            "Usernane": $scope.username,
            "Password": $scope.password,
            "Department": $scope.department
        }

        let response = myService.addData(objData).then((response) => {
            console.log(response)
            if (response.data.status == "success")
                callDataAPI();
            else
                alert(response.data.message);
        });
    }

    $scope.updateData = function (updateId) 
    {
        let data;
        myService.getAlldata().then(function (response) {
            data = response.data;
        });

        $scope.name = data.Name;
        $scope.email = data.Email;
        $scope.username = data.Username;
        $scope.password = data.Password;
        $scope.department = data.Department;
    }

    $scope.deleteData = function(deleteId)
    {
        if(!confirm("Are you sure want to remove?"))
            return;
    
        myService.deleteData(deleteId).then((response)=>{
            console.log(response);
            if(response.data.status == "success")
                callDataAPI()
            else
                alert(response.data.message);
        })
    }

    function callDataAPI() {
        myService.getAlldata().then(function (response) {
            $scope.data = response.data;
        });
    }
}]);

app.controller("AllRecordsController", ["$scope", function($scope){
    myService.getAlldata().then(function (response) {
        $scope.data = response.data;
    });
}])