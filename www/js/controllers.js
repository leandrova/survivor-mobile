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

  $scope.loadMap = function(status){
    survivorCtrl = sessionCtrl.get('survivorCtrl');
    if ((survivorCtrl)&&(!status)){
      response = JSON.parse(survivorCtrl);
      $scope.title = response.title;
      $scope.listMap = response.list
      $scope.loading = false;
    } else {
      map(
        function (response){
          if (response.reason.status){
            $scope.map = true;
            $scope.title = response.title;
            $scope.listMap = response.list
            $scope.loading = false;
            sessionCtrl.set('survivorCtrl', JSON.stringify(response));
          } else {
            if (response.reason.error == '3000'){
              sessionCtrl.clear();
              $state.go('login');
            } else{
              console.log('survivorCtrl', response);
            }
          }
        }
      );
    }
  }

  $scope.logOut = function(){
    sessionCtrl.clear();
    $state.go('login');
  }

  $scope.meusDados = function(){
    $state.go('tabsController.meusDados');
  }

  $scope.doRefresh = function(){
    $scope.loadMap(1);
    $scope.$broadcast('scroll.refreshComplete');
  }

  $scope.loadMap(0);

})

.controller('mapaCtrl', function($scope, $state, sessionCtrl, map, players) {

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

  $scope.loadMap = function(status){
    mapaCtrl = sessionCtrl.get('mapaCtrl');
    if ((mapaCtrl)&&(!status)){
      response = JSON.parse(mapaCtrl);
      $scope.jogador = response.classification.nickname;
      $scope.listMap = response.list
      $scope.loading = false;
    } else {
      map(
        function (response){
          if (response.reason.status){
            $scope.map = true;
            $scope.jogador = response.classification.nickname;
            $scope.listMap = response.list
            $scope.loading = false;
            sessionCtrl.set('mapaCtrl', JSON.stringify(response));
          } else {
            if (response.reason.error == '3000'){
              sessionCtrl.clear();
              $state.go('login');
            } else{
              console.log('mapaCtrl', response);
            }
          }
        }
      );
    }
  }

  $scope.loadPlayers = function(status){
    listPlayers = sessionCtrl.get('listPlayers');
    if ((listPlayers)&&(!status)){
      response = JSON.parse(listPlayers);
      $scope.listPlayers = response.list
      $scope.loading = false;
    } else {
      players(
        function (response){
          if (response.reason.status){
            $scope.listPlayers = response.list
            $scope.loading = false;
            sessionCtrl.set('listPlayers', JSON.stringify(response));
          } else {
            if (response.reason.error == '3000'){
              sessionCtrl.clear();
              $state.go('login');
            } else{
              console.log('listPlayers', response);
            }
          }
        }
      );
    }
  }

  $scope.doRefresh = function(){
    $scope.loadMap(1);
    // $scope.loadPlayers(1);
    $scope.$broadcast('scroll.refreshComplete');
  }

  $scope.loadMap(0);
  $scope.loadPlayers(0);

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

  $scope.loading = true;

  $scope.before = function(){
    $scope.loading = true;
    round = parseInt(sessionCtrl.get('round'))-1;
    $scope.loadRodadas(round,1);
  }

  $scope.after = function(){
    $scope.loading = true;
    round = parseInt(sessionCtrl.get('round'))+1;
    $scope.loadRodadas(round,1);
  }

  $scope.loadRodadas = function(round, status){
    rodadasCtrl = sessionCtrl.get('rodadasCtrl');
    if ((rodadasCtrl)&&(!status)){
      response = JSON.parse(rodadasCtrl);
      $scope.nRound = response.list[0].codigoRodada;
      $scope.listRound = response.list
      $scope.loading = false;
    } else {
      roundDetail(
        round,
        function (response){
          $scope.loading = false;
          if (response.reason.status){
            $scope.nRound = response.list[0].codigoRodada;

            if (!round){
              sessionCtrl.set('round', $scope.nRound);
            } else {
              sessionCtrl.set('round', round);
            }

            $scope.listRound = response.list
            sessionCtrl.set('rodadasCtrl', JSON.stringify(response));
          } else {
            if (response.reason.error == '3000'){
              sessionCtrl.clear();
              $state.go('login');
            } else{
              console.log('rodadasCtrl', response);
            }
          }
        }
      );
    }
  }

  $scope.meusDados = function(){
    $state.go('tabsController.meusDados');
  }

  $scope.doRefresh = function(){
    round = sessionCtrl.get('round');
    $scope.loadRodadas(round,1);
    $scope.$broadcast('scroll.refreshComplete');
  }

  round = '';
  if (sessionCtrl.get('round')){
    round = sessionCtrl.get('round');
  }

  $scope.loadRodadas(round,0);

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

