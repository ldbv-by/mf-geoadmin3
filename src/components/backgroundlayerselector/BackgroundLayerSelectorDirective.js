(function() {
  goog.provide('ga_backgroundlayerselector_directive');

  goog.require('ga_map');
  goog.require('ga_permalink');

  var module = angular.module('ga_backgroundlayerselector_directive', [
    'ga_map',
    'ga_permalink'
  ]);

  module.directive('gaBackgroundLayerSelector',
      ['gaPermalink', 'gaLayers',
       function(gaPermalink, gaLayers) {
         return {
           restrict: 'A',
           replace: true,
           scope: {
             map: '=gaBackgroundLayerSelectorMap'
           },
           template:
               '<select ng-model="currentLayer" ' +
                   'ng-options="l.id as l.label | translate for l in ' +
                       'backgroundLayers">' +
               '</select>',
           link: function(scope, element, attrs) {
             var map = scope.map;

             function setCurrentLayer(layerId) {
              gaLayers.getOlLayerById(layerId).then(function(layer) {
                map.getLayers().setAt(0, layer);
                gaPermalink.updateParams({bgLayer: layerId});
              });
             }

             function onTriggeredChange() {
               gaLayers.getBackgroundLayers().then(function(backgroundLayers) {
                scope.backgroundLayers = backgroundLayers;

                var queryParams = gaPermalink.getParams();
                scope.currentLayer = (queryParams.bgLayer !== undefined) ?
                   queryParams.bgLayer : backgroundLayers[0].id;
                setCurrentLayer(scope.currentLayer);
               });
            }

             scope.$on('gaTopicChange', function(event, topic) {
              gaLayers.loadForTopic(topic.id);
              onTriggeredChange();
             });

             scope.$on('gaLanguageChange', function() {
               gaLayers.reloadTopic();
               onTriggeredChange();
             });

             scope.$watch('currentLayer', function(newVal, oldVal) {
               if (oldVal !== newVal) {
                 setCurrentLayer(newVal);
               }
             });
           }
         };
       }]);
})();
