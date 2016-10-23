angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('Mesa', function($scope) {

  var numMesas = [];

  for (var i = 0; i <= 20; i++) {
    numMesas[i] = i+1;
  }

  $scope.mesas = numMesas;

})

.controller('Cronometro', function($scope, $http) {
  var cont = true;
  $scope.msg = "Iniciar produção";
  var botao = document.getElementById('botao');

  $scope.contar = function () {
    if(cont){
      $http({
        method: "POST", 
        url: "http://smartwork-web.herokuapp.com/history/api/start/1/"}).
        then(function(response) {
          cont = !cont;
          $scope.msg = "Parar Produção";
          botao.style.backgroundColor =  "#af504c";
          botao.style.boxShadow = "0 5px #666";
          botao.style.transform = "translateY(4px)";
          inicio();
          console.log(response.data);
        }, function(response) {
          console.error(response.data);
      });
      
    } else {
      
      $http({
        method: "POST", 
        url: "http://smartwork-web.herokuapp.com/history/api/finish/1/"}).
        then(function(response) {
          cont = !cont;
          $scope.msg = "Iniciar Produção";
          botao.style.backgroundColor =  "#4CAF50";
          botao.style.boxShadow = "0 9px #999";
          botao.style.transform = "translateY(0px)";
          reinicio();
          console.log(response.data);
        }, function(response) {
          console.error(response.data);
      });
    }
  }
    
  var centesimas = 0;
  var segundos = 0;
  var minutos = 0;
  var horas = 0;

  function inicio(){
    control = setInterval(cronometro,10);
  }

  function reinicio () {
    clearInterval(control);
    centesimas = 0;
    segundos = 0;
    minutos = 0;
    horas = 0;
    Centesimas.innerHTML = ":00";
    Segundos.innerHTML = ":00";
    Minutos.innerHTML = "00";
  }

  function cronometro () {
    if (centesimas < 99) {
      centesimas++;
      if (centesimas < 10) { centesimas = "0"+centesimas }
      Centesimas.innerHTML = ":"+centesimas;
    }
    if (centesimas == 99) {
      centesimas = -1;
    }
    if (centesimas == 0) {
      segundos ++;
      if (segundos < 10) { segundos = "0"+segundos }
      Segundos.innerHTML = ":"+segundos;
    }
    if (segundos == 59) {
      segundos = -1;
    }
    if ( (centesimas == 0)&&(segundos == 0) ) {
      minutos++;
      if (minutos < 10) { minutos = "0"+minutos }
      Minutos.innerHTML = ":"+minutos;
    }
    if (minutos == 59) {
      minutos = -1;
    }
    if ( (centesimas == 0)&&(segundos == 0)&&(minutos == 0) ) {
      horas ++;
      if (horas < 10) { horas = "0"+horas }
      Horas.innerHTML = horas;
    }
  }

});
