(function(){
    "use strict";
    angular
        .module("FashionWeatherApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $scope, $rootScope, UserService) {
        $scope.update = update;

        function update(user) {
            UserService
                .updateUser($rootScope.currentUser._id, user)
                .then(
                    function (res) {
                        if (res) {
                            UserService.setUser(res);
                        }
                    }
                )
        }
    }
})();