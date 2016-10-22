angular.module('myApp', [])
.controller('MyCtrl', function ($scope) {
	//$scope.exampleDate = moment().hour(8).minute(0).second(0).toDate();
    $scope.nome = 'Raí';
    // numero da mesa
    var retorno = {
        "started_desk": 1,
        "idle_desk": 1,
        "desks": [
            {
                "status": "working",
                "pk": 1,
                "finish": null,
                "order": "131",
                "start": "16:30:00",
                "desk_number": 10

            },
            {
                "status": "idle",
                "pk": 2,
                "finish": "16:30:30",
                "order": "435",
                "start": "16:30:10",
                "desk_number": 5
            }
        ],
        "order_count": 2
    }

    $scope.retorno = retorno;
    $scope.orders = retorno["desks"];
})