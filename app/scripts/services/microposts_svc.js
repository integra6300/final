/*global $:false */
/*jshint unused:false*/
'use strict';
const service = angular.module('micropostsApp.services', [])

service.service('postsSrv', function ($http, $q) {

    const baseUrl = 'http://jsonplaceholder.typicode.com/posts';
    const manipulationUrl = function(id) { return baseUrl + "/" + id};

    var memoryCache;
    var userId;

    this.login = function (login, password) {
      return $q(function (resolve, reject) {
        userId = Math.floor(Math.random() * (1000 - 100) + 100);
        resolve(userId)
      });
    };

    this.getPostsList = function() {
      return $q(function (resolve, reject) {
        if (!memoryCache || memoryCache.length === 0){
          $http.get(baseUrl).then(function (response) {
            memoryCache = response.data;
            resolve(memoryCache);
          }, function (response) {
            reject(response)
          });
        } else {
          resolve(memoryCache)
        }
      });
    };

    this.deletePost = function (postmessage, position) {
      return $q(function (resolve, reject) {
        if (postmessage.id <= 100) {
          $http.delete(manipulationUrl(postmessage.id)).then(function (response) {
            memoryCache.splice(position, 1);
            resolve(memoryCache);
          }, function (response) {
            reject(response)
          });
        } else {
          memoryCache.splice(position, 1);
          resolve(memoryCache);
        }
      })
    };

    this.updatePost = function (postmessage, position) {
      return $q(function (resolve, reject) {
        if (postmessage.id <= 100) {
          $http.put(manipulationUrl(postmessage.id), postmessage).then(function (response) {
            memoryCache[position] = response.data;
            resolve(memoryCache);
          }, function (response) {
            reject(response)
          });
        } else {
          memoryCache[position] = postmessage;
          resolve(memoryCache);
        }
      })
    };

    this.addPost = function (postmessage) {
      return $q(function (resolve, reject) {
        postmessage.userId = userId;
        $http.post(baseUrl, postmessage).then(function (response) {
          memoryCache.push(response.data);
          resolve(memoryCache);
        }, function (response) {
          reject(response)
        });
      })
    }
  });

export default service;
