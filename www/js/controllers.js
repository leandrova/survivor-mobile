angular.module('app.controllers', ['ionic'])

.controller('loginCtrl', function($scope, $state, $http, sendAlert, sessionCtrl, authentication) {

  if (sessionCtrl.get('token')){
    $state.go('tabsController.survivor');
  }

  $scope.authentication = function(formData) {

    if (typeof formData == 'undefined' ){
      var user = false;
      var pass = false;
      var svSe = false;
    } else {
      var user = typeof formData.user == 'undefined' ? false : formData.user;
      var pass = typeof formData.pass == 'undefined' ? false : formData.pass;
      var svSe = typeof formData.svSe == 'undefined' ? false : formData.svSe;
    }

    if ((!user)&&(!pass)){
      $scope.userRed = 'inputRed'
      $scope.passRed = 'inputRed'
    } else if (!user){
      $scope.userRed = 'inputRed'
      $scope.passRed = 'inputNormal'
    } else if (!pass){
      $scope.userRed = 'inputNormal'
      $scope.passRed = 'inputRed'
    } else {
      // $state.go('tabsController.survivor');
      // sessionCtrl.set('token',1);
      authentication(
        formData,
        function (response){
          if (response.status){
            sessionCtrl.set('token',response.token);
            $state.go('tabsController.survivor');
          } else {
            $scope.alert = sendAlert.bind('Red',response.description);
          }
        }
      );
      // $http({
      //   method: 'POST',
      //   url: 'http://localhost:3000/authentication',
      //   headers: {
      //     'service-name': 'local',
      //     'service-token': '12345'
      //   },
      //   data: {
      //     user: formData.user,
      //     pass: formData.pass,
      //     saveSession: formData.saveSession
      //   },
      //   async: true,
      //   withCredentials: false,
      //   timeout: 1000,
      //   cache: false
      // }).then(function successCallback(response, json) {

      //   if (response.status == 200){
      //     if (!response.data.reason.status){
      //       $scope.alert = sendAlert.bind('Red',response.data.reason.description);
      //     } else {
      //       $state.go('tabsController.survivor');
      //       sessionCtrl.set('token',response.data.authentication.token);
      //     }
      //   } else {
      //     $scope.alert = sendAlert.bind('Red','Ops! Tente mais tarde.');
      //   }
      // }, function errorCallback(response) {
      //   console.log(response);
      //   $scope.alert = sendAlert.bind('Red','Ops!! Tente mais tarde.');
      // });
    }

    //
  };

  $scope.logOut = function(){
    sessionCtrl.clear();
    $state.go('login');
  }

})

.controller('survivorCtrl', function($scope, $state, sessionCtrl, map) {

  if (!sessionCtrl.get('token')){
      $state.go('login');
  }

  $scope.loading = true;

  $scope.map = true;

  map(
    function (response){
      if (response.reason.status){
        $scope.title = response.title;
        $scope.listMap = response.list
      }
    }
  );

  $scope.loading = false;

  $scope.logOut = function(){
    sessionCtrl.clear();
    $state.go('login');
  }

  $scope.meusDados = function(){
    $state.go('tabsController.meusDados');
  }

})

.controller('mapaCtrl', function($scope, $state, sessionCtrl) {

  if (!sessionCtrl.get('token')){
      $state.go('login');
  }

  $scope.logOut = function(){
    sessionCtrl.clear();
    $state.go('login');
  }

  $scope.meusDados = function(){
    $state.go('tabsController.meusDados');
  }

})

.controller('classificaoCtrl', function($scope, $state, sessionCtrl) {

  if (!sessionCtrl.get('token')){
      $state.go('login');
  }

  $scope.logOut = function(){
    sessionCtrl.clear();
    $state.go('login');
  }

  $scope.meusDados = function(){
    $state.go('tabsController.meusDados');
  }

})

.controller('rodadasCtrl', function($scope, $state, sessionCtrl) {

  if (!sessionCtrl.get('token')){
      $state.go('login');
  }

  $scope.logOut = function(){
    sessionCtrl.clear();
    $state.go('login');
  }

  $scope.meusDados = function(){
    $state.go('tabsController.meusDados');
  }

})

.controller('meusDadosCtrl', function($scope, $state,   sessionCtrl) {

  if (!sessionCtrl.get('token')){
      $state.go('login');
  }

  $scope.logOut = function(){
    sessionCtrl.clear();
    $state.go('login');
  }

  $scope.meusDados = function(){
    $state.go('tabsController.meusDados');
  }

})

