angular.module('myApp', ['angularMoment'])
.controller('CtrlIndex', function ($scope, $http) {
    startTime();
    function startTime(){
        $http({
            method: 'GET',
            url: 'http://smartwork-web.herokuapp.com/api/dashboard/'
        }).
        then(function successCallback(response) { // começe a ler daqui
            $scope.retorno = response.data;
            
            for(var i = 0; i < response.data.desks.length; i++){
                data = response.data.desks[i].start;    
                var velho = moment(data); //data do obj recebido
                var novo = moment(); // data do obj atual
                var result = novo.diff(velho); // resultado da diferença de datas em milisegundos
                response.data.desks[i].start = moment().millisecond(result).format('h:mm:ss'); // formatação da data

                if(response.data.desks[i].finish != null){
                    data = response.data.desks[i].finish;    
                    var velho = moment(data); //data do obj recebido
                    var novo = moment(); // data do obj atual
                    var result = novo.diff(velho); // resultado da diferença de datas em milisegundos
                    response.data.desks[i].finish = moment().millisecond(result).format('h:mm:ss'); // formatação da data

                }
            }
            $scope.orders = response.data.desks;
        }, function errorCallback(response) {
            console.error(response);
        });
        var t = setTimeout(function(){ startTime() }, 200);
    }
	
})


.controller('CtrlResultados', function ($scope) {
    new Chart(document.getElementById("line_chart").getContext("2d"), getChartJs('line'));

    function getChartJs(type) {
        var config = null;

        if (type === 'line') {
            config = {
                type: 'line',
                data: {
                    labels: ["Dia 1", "Dia 2", "Dia 3", "Dia 4", "Dia 5", "Dia 6", "Dia 7"],
                    datasets: [{
                        label: "Resultado Alcançado",
                        data: [9, 8, 11, 8, 15, 12, 7],
                        borderColor: 'rgba(0, 188, 212, 0.75)',
                        backgroundColor: 'rgba(0, 188, 212, 0.3)',
                        pointBorderColor: 'rgba(0, 188, 212, 0)',
                        pointBackgroundColor: 'rgba(0, 188, 212, 0.9)',
                        pointBorderWidth: 1
                    }, {
                        label: "Resultado esperado",
                        data: [10, 11, 11, 11, 12, 10, 7],
                        borderColor: 'rgba(233, 30, 99, 0.75)',
                        backgroundColor: 'rgba(233, 30, 99, 0.3)',
                        pointBorderColor: 'rgba(233, 30, 99, 0)',
                        pointBackgroundColor: 'rgba(233, 30, 99, 0.9)',
                        pointBorderWidth: 1
                        }]
                },
                options: {
                    responsive: true,
                    legend: false
                }
            }
        }
        return config;
    }
});