angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, Facebook, $state, $http, $interval, $ionicScrollDelegate) {
   $scope.login = function(){
      Facebook.login(function(response) {
         $state.go('mensagens')
      });
   }
   $scope.dados = {};

   $scope.apelidar = function() {
      $state.go('mensagens');
   }

   $scope.mensagens = [];


   $scope.enviar = function(){
      if ($scope.dados.conteudo !== "" && $scope.dados.conteudo !== undefined) {
         $http.post('http://174.138.68.25:3000/chatcb', $scope.dados).then(function() {
            $scope.dados.conteudo = "";
         })
      }
   }

   $interval(function () {
      $http.get('http://174.138.68.25:3000/chatcb').then(function(resposta){
         $scope.mensagens = resposta.data
         $ionicScrollDelegate.scrollBottom()
      });
      Facebook.api('/me', function(response) {
         $scope.dados.nome = response.name;
      });
      Facebook.api('/me/picture', function(response) {
         $scope.dados.foto = response.data.url;
      });
      Facebook.getLoginStatus(function(response) {
         // this will be called when the roundtrip to Facebook has completed
      }, true);
   }, (1000));
});

//versao feita em sala
// .controller('LoginCtrl', function($scope, Facebook, $state) {
//    $scope.login = function(){
//       Facebook.login(function(response) {
//          $state.go('mensagens')
//       });
//    }
//    $scope.apelidar = function() {
//       $state.go('mensagens')
//    }
// })
//
// .controller('MensagensCtrl', function($scope, Facebook, $state, $http, $interval, $ionicScrollDelegate) {
//    $scope.dados = {};
//    $scope.mensagens = [];
//    $scope.dados.apelido = $scope.apelido
//
//    Facebook.api('/me', function(response) {
//       $scope.dados.nome = response.name;
//    });
//    Facebook.api('/me/picture', function(response) {
//       $scope.dados.foto = response.data.url;
//    });
//    $scope.enviar = function(){
//       $http.post('http://174.138.68.25:3000/chatcb', $scope.dados).then(function() {
//          $scope.dados.conteudo = "";
//       })
//    }
//
//    $interval(function () {
//       $http.get('http://174.138.68.25:3000/chatcb').then(function(resposta){
//          $scope.mensagens = resposta.data
//          $ionicScrollDelegate.scrollBottom()
//       });
//    }, (1000));
// });
