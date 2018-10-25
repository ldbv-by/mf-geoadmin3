goog.provide('ga_edit_controller');

(function() {

  var module = angular.module('ga_edit_controller', [
    'pascalprecht.translate'
  ]);

  module.controller('GaEditController', function($scope, $translate) {

    var options = {
      translate: $translate // For translation of ng-options
    };

    $scope.layer = undefined;

    // We use options provided by parent controller.
    $scope.options = angular.extend(options, $scope.options || {});
    $scope.globals = $scope.globals || {};

    $scope.$on('gaActiveEdit', function(evt, layer) {
      $scope.layer = layer;
      $scope.globals.isEditActive = true;
      $scope.globals.pulldownShown = true;
    });
  });
})();
