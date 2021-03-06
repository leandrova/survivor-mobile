angular.module('app.services', ['ionic'])

.factory('sendAlert', [function(color, msn){
  return {
    bind: function(color, msn){
      return ('<div class="row responsive-sm"><div class="col alert' + color + '">' + msn + '</div>');
    }
  }
}])

.factory('sessionCtrl', [function(data, value){
  return {
    set: function(data, value){
      localStorage.setItem(data, value);
    },
    get: function(data){
      return localStorage.getItem(data);
    },
    clear: function(){
      localStorage.clear();
    }
  }
}])

.factory('animationShake', [function($scope){
  return {
    inc: function($scope, data){
      $scope[data] = 'animationShake';

      setTimeout(function(){
        $scope[data] = '';
      }, 300);
    }
  }
}])

.service('authentication', function(HOST_SERVICE, $http){
  return function(formData, callback){
    $http({
      method: 'GET',
      url: HOST_SERVICE + '/authentication',
      headers: {
        'service-name': 'local',
        'service-token': '12345',
        'user': formData.user,
        'pass': formData.pass,
        'saveSession': formData.saveSession
      },
      async: true,
      withCredentials: false,
      timeout: 10000,
      cache: false
    }).then(function successCallback(response, json) {

      if (response.status == 200){
        if (!response.data.reason.status){
          var response = {
            status: 0,
            error: response.data.reason.error,
            description: response.data.reason.description
          };
        } else {
          var response = {
            status: 1,
            error: response.data.reason.error,
            token: response.data.authentication.token
          };
        }
      } else {
        var response = {
          status: 0,
          error: response.data.reason.error,
          token: 'Ops! Tente mais tarde.'
        };
      }
      callback(response);
    }, function errorCallback(response) {
      var response = {
        status: 0,
        error: response.data.reason.error,
        token: 'Ops!! Tente mais tarde.'
      };
      callback(response);
    });
  }
})

.service('map', function(HOST_SERVICE, $http, sessionCtrl){
  return function(callback){
    var list = [], description = [];
    $http({
      method: 'GET',
      url: HOST_SERVICE + '/map',
      headers: {
        'service-session': sessionCtrl.get('token')
      },
      async: true,
      withCredentials: false,
      timeout: 10000,
      cache: false
    }).then(function successCallback(response) {
      if (response.status == 200){
        var status = response.data.reason.status;
        if (response.data.reason.status){
          var list = response.data.map.list;
        } else {
          var description = response.data.reason.description;
        }
        callback({
          classification: response.data.map.classification,
          list: list,
          reason: {
            status: status,
            error: response.data.reason.error,
            description: description
          }
        });
      }
    }, function errorCallback(response) {
      callback({
        reason: {
          status: 0,
          error: response.data.reason.error,
          description: 'Ops!'
        }
      });
    });
  }
})

.service('roundDetail', function(HOST_SERVICE, $http, sessionCtrl){
  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  return function(roundNumber, callback){
    var list = [], description = [];
    var data = 'roundNumber=' + roundNumber;
    $http({
      method: 'POST',
      url: HOST_SERVICE + '/rounds/detail',
      headers: {
        'service-session': sessionCtrl.get('token')
      },
      data : data,
      async: true,
      withCredentials: false,
      timeout: 10000,
      cache: false
    }).then(function successCallback(response) {
      if (response.status == 200){
        var status = response.data.reason.status;
        if (response.data.reason.status){
          var correntRound = response.data.roundDetail.correntRound;
          var list = response.data.roundDetail.list;
        } else {
          var description = response.data.reason.description;
        }
        callback({
          correntRound: correntRound,
          list: list,
          reason: {
            status: status,
            error: response.data.reason.error,
            description: description
          }
        });
      }
    }, function errorCallback(response) {
      callback({
        reason: {
          status: 0,
          error: response.data.reason.error,
          description: 'Ops!'
        }
      });
    });
  }
})

.service('players', function(HOST_SERVICE, $http, sessionCtrl){
  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  return function(callback){
    var list = [], description = [];
    $http({
      method: 'GET',
      url: HOST_SERVICE + '/players',
      headers: {
        'service-session': sessionCtrl.get('token')
      },
      async: true,
      withCredentials: false,
      timeout: 10000,
      cache: false
    }).then(function successCallback(response) {
      if (response.status == 200){
        callback({
          list: response.data.players,
          reason: {
            status: response.data.reason.status,
            error: response.data.reason.error,
            description: response.data.reason.description
          }
        });
      }
    }, function errorCallback(response) {
      callback({
        reason: {
          status: 0,
          error: response.data.reason.error,
          description: 'Ops!'
        }
      });
    });
  }
})

;
