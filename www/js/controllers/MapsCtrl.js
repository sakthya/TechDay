angular.module('starter.controllers.MapsCtrl', [])


.controller('MapsCtrl', function($scope,window) {
	$scope.mapCall=function(){
     window.open('https://www.google.co.in/maps/place/KTPO,+KIADB+Export+Promotion+Industrial+Area,+Whitefield,+Bengaluru,+Karnataka+560048/@12.9794049,77.7199112,17z/data=!3m1!4b1!4m2!3m1!1s0x3bae118c85cf59b5:0x8065ebe1cef39aae', '_system', 'location=yes'); 
      return false;
	};

	$scope.mapCall();
});
