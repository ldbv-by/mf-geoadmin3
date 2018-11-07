goog.provide('ga_filestorage_service');

goog.require('ga_publicstorage_service');

(function() {

  var module = angular.module('ga_filestorage_service', [
    'ga_publicstorage_service'
  ]);

  /**
   * This service can create/read/write/delete a KML on public s3 bucket.
   */
  module.provider('gaFileStorage', function() {
    this.$get = function($http, $q, gaPublicStorage) {
      var endPoint = '/files';
      var contentType = 'application/vnd.google-earth.kml+xml';

      var FileStorage = function() {

        this.get = function(fileId) {
          return gaPublicStorage.get(endPoint, fileId);
        };

        this.getFileIdFromFileUrl = function(fileUrl) {
          return gaPublicStorage.getFileIdFromFileUrl(fileUrl);
        };

        this.getFileUrlFromAdminId = function(adminId) {
          return gaPublicStorage.getFileUrlFromAdminId(endPoint, adminId);
        };

        this.save = function(id, content) {
          return gaPublicStorage.save(endPoint, id, content, contentType);
        };

        this.del = function(adminId) {
          return gaPublicStorage.del(endPoint, adminId);
        };

      };
      return new FileStorage();
    };
  });
})();
