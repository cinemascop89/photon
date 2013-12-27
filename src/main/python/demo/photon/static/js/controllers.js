/*jshint globalstrict:true */
/*global angular:true */
/*global _:true */
'use strict';

angular.module('photon.controllers', [])
    .controller('SearchCtrl', function($scope, $location, $http) {
    var centerIcon = L.icon({
        iconUrl: 'http://content.mqcdn.com/winston-445/cdn/dotcom3/images/icons/resolved/single.png',
        iconSize: [22,28],
        iconAnchor: [11, 27]
    });
    $scope.hits = [];
    $scope.searchString = "";
    $scope.center = {
        lat: 42.3,
        lng: -71.7,
        zoom: 4
    };
    $scope.filterCenter = {
        lat: 42.330123546,
        lng: -71.0760498,
        draggable: true,
        message: "center",
        icon: centerIcon
    };
    $scope.markers = [$scope.filterCenter];
        $scope.paths = {
            c1:{
                weight: 2,
                color: '#ff612f',
                latlngs: $scope.filterCenter,
                radius: 40000,
                type: 'circle'
            }
        };
    $scope.tiles = {url: "http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"};

    var getLatLng = function (hit) {
        var latlng = hit.coordinate.split(',');
        latlng = {
            lat: parseFloat(latlng[0], 10),
            lng: parseFloat(latlng[1], 10),
            draggable: false
        };
        return latlng;
    };

    $scope.search = function () {
        $http.get('/search/?q=' + encodeURIComponent($scope.searchString) + '&center=' + $scope.filterCenter.lat + ',' + $scope.filterCenter.lng, {cache: true}).success(function(data) {
            $scope.hits = data.docs;
            $scope.highlight = data.highlight;
            $scope.markers = _.map($scope.hits, function (hit) {
                return getLatLng(hit);
            });
            $scope.markers.push($scope.filterCenter);
        });
    };

    $scope.mapCenter = function (hit) {
        var latlng = getLatLng(hit);
        $scope.center = {
            lat: latlng.lat,
            lng: latlng.lng,
            zoom: 15
        };
        $scope.markers = [latlng];
        $scope.hits = [];
        $scope.searchString = "";
    };

    $scope.getTitle = function (hit) {
        var title = [];
        var hl = $scope.highlight[hit.id];
        var fields = ['name', 'street', 'city', 'country'], field;
        for (var i = 0; i < fields.length; i++) {
            field = fields[i];
            if (hl[field]) {
                title.push(hl[field].join(' '));
            } else if (hit[field]) {
                title.push(hit[field]);
            }
        }
        return title.join(', ');
    };


});
