angular.module('starter.controllers.AppCtrl', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$http,$state,$rootScope,$timeout,ionicMaterialMotion,ionicMaterialInk,PopUpService,httpService) {
  	
  	$scope.user={};

    //text input box
function leaveInput(el) {
    if (el.value.length > 0) {
        if (!el.classList.contains('active')) {
            el.classList.add('active');
        }
    } else {
        if (el.classList.contains('active')) {
            el.classList.remove('active');
        }
    }
}


var inputs = document.getElementsByClassName("m-input");
for (var i = 0; i < inputs.length; i++) {
    var el = inputs[i];
    el.addEventListener("blur", function() {
        leaveInput(this);
    });
}

$scope.mapOpen=function(){

cordova.ThemeableBrowser.open('https://www.google.co.in/maps/place/Tesco+HSC/@12.9739475,77.7283974,17z/data=!3m1!4b1!4m2!3m1!1s0x3bae0df955555555:0xb402b98f027216a2', '_system', {
    statusbar: {
        color: '#ffffffff'
    },
    toolbar: {
        height: 44,
        color: '#f0f0f0ff'
    },
    title: {
        color: '#003264ff',
        showPageTitle: true
    },
    backButton: {
        image: 'back',
        imagePressed: 'back_pressed',
        align: 'left',
        event: 'backPressed'
    },
    forwardButton: {
        image: 'forward',
        imagePressed: 'forward_pressed',
        align: 'left',
        event: 'forwardPressed'
    },
    closeButton: {
        image: 'close',
        imagePressed: 'close_pressed',
        align: 'left',
        event: 'closePressed'
    },
    customButtons: [
        {
            image: 'share',
            imagePressed: 'share_pressed',
            align: 'right',
            event: 'sharePressed'
        }
    ],
    menu: {
        image: 'menu',
        imagePressed: 'menu_pressed',
        title: 'Test',
        cancel: 'Cancel',
        align: 'right',
        items: [
            {
                event: 'helloPressed',
                label: 'Hello World!'
            },
            {
                event: 'testPressed',
                label: 'Test!'
            }
        ]
    },
    backButtonCanClose: true
}).addEventListener('backPressed', function(e) {
    alert('back pressed');
}).addEventListener('helloPressed', function(e) {
    alert('hello pressed');
}).addEventListener('sharePressed', function(e) {
    alert(e.url);
}).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
    console.error(e.message);
}).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
    console.log(e.message);
});
};

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);
    
    $timeout(function() {
        //$scope.$parent.hideHeader();
    }, 0);
    // Activate ink for controller
    ionicMaterialInk.displayEffect();
    //$scope.$parent.clearFabs();
  
  
      $scope.slideHasChanged = function(index) {
        
          $scope.items.push("{name:'John', age:25, gender:'boy'}");
      }

$scope.items = [
  {image:'http://san.capitalafrique.com/imatin.net/articles/images/lionel-messi.jpg'},
  {image:'http://www.africatopsports.com/wp-content/uploads/2014/07/Sofiane-feghouli-team-teaser100_v-original-1024x576.jpg'},
  {image:'http://www.footmercato.net/images/a/feghouli-a-fait-mal-au-barca_123563.jpg'},
  {image:'http://img.fifa.com/mm/photo/tournament/competition/02/38/72/29/2387229_full-lnd.jpg'},
  {image:'http://www.parisfans.fr/wp-content/uploads/2015/05/Mercato-Le-PSG-voudrait-Xavi-pour-une-saison.jpg'}
 
];

  
	$rootScope.goToHomeScreen = function() {
        $state.go('menu.home');
    };
    //$scope.user.tpxid="tz29";
    //$scope.user.empid="22905904";
  	$scope.submit=function() {

  		if(!$scope.user.tpxid|| !$scope.user.empid) {
  			PopUpService.showPopup('Alert','Please enter TPXiD or EMPid');
  		}

      else if($scope.user.tpxid!==null && $scope.user.empid!==null) {
        var appendWithUrl="EventRest/api/user/verify/" + $scope.user.tpxid + "/" + $scope.user.empid;
        httpService.getCall(appendWithUrl).then(function(respData){
          var data=respData.data[0];
          //alert(JSON.stringify(data[0].status));
          if(data.status==200) {
            PopUpService.showPopup('Alert','You have succesfully logged in');
            window.localStorage.setItem('tpxid',$scope.user.tpxid);
            window.localStorage.setItem('ownerId',data.id);
            window.localStorage.setItem('username',data.name.split(' ')[1]);
            $rootScope.username=data.name.split(' ')[1];
            $state.go('menu.home');
          }
          else if(data.status==201) {
            PopUpService.showPopup('Alert','You have already logged in');
            window.localStorage.setItem('tpxid',$scope.user.tpxid);
            window.localStorage.setItem('ownerId',data.id);
            window.localStorage.setItem('username',data.name.split(' ')[1]);
            $rootScope.username=data.name.split(' ')[1];
            $state.go('menu.home');
          }
          else if(data.status==400 || respData.status == 404) {
            PopUpService.showPopup('Login Failed','The combination of TpxId/EmpId you entered is incorrect');
          }
          else {
            PopUpService.showPopup('Alert','Connection timed out');
          }
        })
      }
  		else {
  			//PopUpService.showPopup('Login Failed','TPXiD/EMPid not verified');
  		}

  	}

  	//on quit and relaunch fetch the username if already logged in
  	if(window.localStorage.getItem('username')!==null) {
  		$rootScope.username=window.localStorage.getItem('username');
  	}

  	$scope.cancel=function() {
  		$scope.user.tpxid="";
  		$scope.user.empid="";
  	}

    $scope.CallTel = function(tel) {
            window.location.href = 'tel:'+ tel;
        }

})

