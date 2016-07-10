angular.module('app.controllers', ['ionic'])

.controller('loginCtrl', function($scope, $state, $http, sendAlert, sessionCtrl, authentication, animationShake) {

  if (sessionCtrl.get('token')){
    $state.go('tabsController.survivor');
  }

  $scope.login = true;

  $scope.authentication = function(formData) {;
    $scope.loading = true;

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
      animationShake.inc($scope, 'userAnime');
      animationShake.inc($scope, 'passAnime');
      $scope.loading = false;
    } else if (!user){
      animationShake.inc($scope, 'userAnime');
      $scope.loading = false;
    } else if (!pass){
      animationShake.inc($scope, 'passAnime');
      $scope.loading = false;
    } else {
      authentication(
        formData,
        function (response){
          if (response.status){
            sessionCtrl.set('token',response.token);
            $state.go('tabsController.survivor');
          } else {
            $scope.alert = sendAlert.bind('Red',response.description);
            $scope.loading = false;
            animationShake.inc($scope, 'btnAnime');
          }
        }
      );
    }
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

  console.log(sessionCtrl.get('token'));
  if (!sessionCtrl.get('token')){
      $state.go('login');
      console.log(1);
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

.controller('rodadasCtrl', function($scope, $state, roundDetail, sessionCtrl) {

  if (!sessionCtrl.get('token')){
      $state.go('login');
  }

  $scope.logOut = function(){
    sessionCtrl.clear();
    $state.go('login');
  }

  roundDetail(
    function (response){
      if (response.reason.status){
        $scope.nRound = response.list[0].codigoRodada;
        $scope.listRound = response.list
        $scope.loading = false;
      } else {
        sessionCtrl.clear();
        $state.go('login');
      }
    }
  );

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

