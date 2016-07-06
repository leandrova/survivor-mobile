angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: '/login',
    cache: false,
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('tabsController', {
    url: '/page1',
    cache: false,
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.survivor', {
    url: '/survivor',
    cache: false,
    views: {
      'tab1': {
        templateUrl: 'templates/survivor.html',
        cache: false,
        controller: 'survivorCtrl'
      }
    }
  })

  .state('tabsController.rodadas', {
    url: '/rodadas',
    cache: false,
    views: {
      'tab2': {
        templateUrl: 'templates/rodadas.html',
        controller: 'rodadasCtrl'
      }
    }
  })

  .state('tabsController.mapa', {
    url: '/mapa',
    cache: false,
    views: {
      'tab3': {
        templateUrl: 'templates/mapa.html',
        controller: 'mapaCtrl'
      }
    }
  })

  .state('tabsController.classificao', {
    url: '/classificacao',
    cache: false,
    views: {
      'tab4': {
        templateUrl: 'templates/classificao.html',
        controller: 'classificaoCtrl'
      }
    }
  })

  .state('tabsController.meusDados', {
    url: '/meusDados',
    cache: false,
    views: {
      'tab5': {
        templateUrl: 'templates/meusDados.html',
        controller: 'meusDadosCtrl'
      }
    }
  })

  $urlRouterProvider.otherwise('/login')

});
