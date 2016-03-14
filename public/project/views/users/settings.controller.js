(function(){
    "use strict";
    angular
        .module("FashionWeatherApp")
        .controller("SettingsController", SettingsController);

    function SettingsController($location, $scope, $rootScope, UserService) {
        $scope.update = update;

        function update(user) {
            UserService.updateUser(user._id, user, function(res){
                $rootScope.currentUser = user;
            });
        }
    }
})();