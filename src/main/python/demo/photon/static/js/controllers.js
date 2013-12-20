/*jshint globalstrict:true */
/*global angular:true */
/*global _:true */
'use strict';

angular.module('photon.controllers', [])
    .controller('SearchCtrl', function($scope, $location, $http) {
    $scope.hits = [];
    $scope.searchString = "";
    $scope.center = {
        lat: 48.8,
        lng: 2.7,
        zoom: 4
    };
    $scope.bbox = "-22.22,64.2,-21.32,64";
    $scope.markers = {};
        $scope.paths = {
            c1:{
                weight: 2,
                color: '#ff612f',
                latlngs: {
                    lat: 53.345632585,
                    lng: -6.23748779296,
                    draggable: true
                },
                radius: 100000,
                type: 'circle'
            }
        };
    $scope.tiles = {url: "http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"};

    var getLatLng = function (hit) {
        var latlng = hit.coordinate.split(',');
        latlng = {
            lat: parseFloat(latlng[0], 10),
            lng: parseFloat(latlng[1], 10)
        };
        return latlng;
    };

    $scope.search = function () {
        $http.get('/search/?q=' + encodeURIComponent($scope.searchString) + '&bbox=' + $scope.bbox, {cache: true}).success(function(data) {
            $scope.hits = data.docs;
            $scope.highlight = data.highlight;
            $scope.markers = {};
            _.map($scope.hits, function (hit, key, list) {
                $scope.markers['marker-' + key] = getLatLng(hit);
            });
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
