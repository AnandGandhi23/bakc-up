var app = angular.module("app", []);
app.controller("myctrl", ($scope)=>{
    $scope.firstname = "Anand";
                $scope.changename = ()=>{
                    $scope.firstname = "Ami"
                }
    $scope.names=["jatin" , "anand", "ami",  "aarohi"];

    
})

app.filter("myfilter", ()=>{
    return function(x){
        console.log(x)
        var i,c,txt="";

        for(i=0;i<x.length;i++)
        {
            c = x[i];
            if(i % 2 == 0)
            {
                c = c.toUpperCase();
                console.log(c)
            }
            txt += c;
        }
        return txt;
    };
});