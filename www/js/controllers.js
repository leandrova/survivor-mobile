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

  map(
    function (response){
      if (response.reason.status){
        $scope.map = true;
        $scope.title = response.title;
        $scope.listMap = response.list
        $scope.loading = false;
      } else {
        sessionCtrl.clear();
        $state.go('login');
      }
    }
  );

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

