/*jshint globalstrict:true */
/*global angular:true */
'use strict';

angular.module('photon', [
    'photon.controllers', "leaflet-directive"]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/search/', {templateUrl: 'search.html', controller: 'SearchCtrl'})
            .otherwise({redirectTo: '/search/'});
    }]);
