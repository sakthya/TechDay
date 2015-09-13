// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic','ionic-material','starter.controllers.AppCtrl','starter.controllers.AgendaCtrl','starter.controllers.hackthonCtrl','starter.controllers.PlaylistsCtrl','starter.services.popup','starter.services.httpService','starter.controllers.EventsCtrl'])

.run(function($ionicPlatform,$rootScope,httpService,$ionicPopup,$state) {
  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  //ionic.Platform.isFullScreen = true;
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    //utility function for getting the version no.
    cordova.getAppVersion(function(version) {
      $rootScope.version = version;
    });

     
    //function called on resume
    document.addEventListener("resume", function()
    {
      httpService.getCall('EventRest/api/version/verify').then(function(response)
      {
        var respData = response.data;

        var android = respData[0];
        var ios = respData[1];
        if(android.content)
        $rootScope.notification=android.content;
        else
        $rootScope.notification="Tesco Technology Day - Sep 30th 2015, venue : KTPO";


        if(ionic.Platform.isAndroid()) {

          if($rootScope.version == android.version.trim()) {

          if(android.url)
              $rootScope.Url=android.url;
          else
              $rootScope.Url="http://techday.ocsethsc.net:8181/Download/android";

            console.log("version SUCCESS");
            $state.go(menu.home);
          }
          else {
            updatePopup();
          }
        }
        else if(ionic.Platform.isIOS()) {
          if(ios.url)
              $rootScope.Url=ios.url;
          else
              $rootScope.Url="http://techday.ocsethsc.net:8181/Download/ios";
         if($rootScope.version == ios.version.trim()) {
            $state.go(menu.home);
          } 
          else {
            updatePopup();
          }
        }
      });
    } , false);
    //FirstLaunch and already Launched
    document.addEventListener("deviceready", function()
    { 
      httpService.getCall('EventRest/api/version/verify').then(function(response)
      {
        var respData = response.data;
    
        var android = respData[0];
        var ios = respData[1];
        if(android.content)
        $rootScope.notification=android.content;
        else
        $rootScope.notification="Tesco Technology Day - Sep 30th 2015, venue : KTPO";


        if(ionic.Platform.isAndroid()) {
          if(android.url)
              $rootScope.Url=android.url;
          else
              $rootScope.Url="http://techday.ocsethsc.net:8181/Download/android";
          if($rootScope.version == android.version.trim()) { // on success of version change the state to home
            $state.go(menu.home);
          }
          else {
            updatePopup();
          }
        }
        else if(ionic.Platform.isIOS()) {
          if(ios.url)
              $rootScope.Url=ios.url;
          else
              $rootScope.Url="http://techday.ocsethsc.net:8181/Download/ios";
         if($rootScope.version == ios.version.trim()) { // on success of version change the state to home
            $state.go(menu.home);
          } 
          else {
            updatePopup();
          }
        }

      });
    }, false);
    //popup function used on both resume and deviceReady
    var updatePopup=function()
    {
      var myPopup = $ionicPopup.show({
      title: '<center>Improvements have been<br> made to the app. Please <br>install these to continue.</center>',
      buttons: [
                {
                  text:'<div style="margin: 0;padding: 0;font-size: 15px;">Decline</div>',
                  onTap: function(e)
                  {
                    ionic.Platform.exitApp();
                    //$state.go(menu.home); // on pressing decline quit the app
                  }
                },
                {
                  text: '<div style="margin: 0;padding: 0;font-size: 15px;">Install</div>',
                  type: 'button-positive',
                  onTap: function(e)
                  {
                    window.open($rootScope.Url,"_system","location=yes");
                    return false;
                  }
                }
              ]
      });
    }
    var errorPopup=function()
    {
      var pop=$ionicPopup.alert({
       title: "<center>Network Error</center>",
       template: "<center>We are experiencing issues<br> with the app.<br>Please try again later.</center>"
       });
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  $ionicConfigProvider.views.swipeBackEnabled(false);
  $stateProvider


  .state('menu', {
    url: "/menu",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('menu.hack_register', {
    url: "/hackthon_register",
    views: {
      'menuContent':{
        templateUrl: "templates/hack_register.html",
         controller: 'hackthonCtrl'
       }
    }
  })

  .state('menu.hackathon', {
    url: "/hackathon",
    cache:false,
    views: {
      'menuContent': {
        templateUrl: "templates/hackathon.html",
         controller: 'hackthonCtrl'
      }
    }
  })
 .state('menu.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "templates/home.html",
         controller: 'AppCtrl'
      }
    }
  })
  .state('menu.stalls', {
    url: "/stalls",
    views: {
      'menuContent': {
        templateUrl: "templates/stalls.html"
      }
    }
  })
  .state('menu.notifications', {
    url: "/notifications",
    views: {
      'menuContent': {
        templateUrl: "templates/notifications.html"
      }
    }
  })
  .state('menu.help', {
    url: "/help",
    views: {
      'menuContent': {
        templateUrl: "templates/help.html",
        controller: 'AppCtrl'
      }
    }
  })
  .state('menu.instructions', {
    url: "/instructions",
    views: {
      'menuContent': {
        templateUrl: "templates/instructions.html"
      }
    }
  })
    .state('menu.agenda', {
      url: "/agenda",
      views: {
        'menuContent': {
          templateUrl: "templates/agenda.html",
          controller: 'AgendaCtrl'
        }
      }
    })
     .state('menu.events', {
    url: "/events",
    views: {
      'menuContent': {
        templateUrl: "templates/events.html",
        controller:'EventsCtrl'
      }
    }
  })
     .state('menu.maps', {
      url: "/maps",
      views: {
        'menuContent': {
          templateUrl: "templates/maps.html",
          controller: 'MapsCtrl'
        }
      }
    })
    
  .state('menu.login', {
    url: "/login",
    cache:false,
    views: {
    'menuContent': {       
        templateUrl: "templates/login.html",
        controller: 'AppCtrl'
      }
    }
  });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/menu/home');
});
