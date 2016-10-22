angular.module('myApp', [])
.controller('MyCtrl', function ($scope, $http) {
    var retorno23;
	$http({
        method: 'GET',
        url: 'http://smartwork-web.herokuapp.com/api/dashboard/'
        }).then(function successCallback(response) {
                retorno23 = response.data;
                $scope.retorno = retorno23;
                $scope.orders = retorno23.desks;
                console.log(retorno23.desks);
          }, function errorCallback(response) {
            console.error(response);
    });

    
})