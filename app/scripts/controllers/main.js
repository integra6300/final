'use strict';
const x = angular.module('micropostsApp.ctrl', []) 

x.controller('PostsCtrl', function (postsSrv, $document, $scope) {
    var _this = this;
    $scope.orderProperty = "+id";

    this.getPosts = function () {
      postsSrv.getPostsList().then(
        function(data) {
          console.log(data);
          _this.items = data;
        },
        function (response) {
          console.log(response);
        }
      );
    };

    this.edit = function (postmessage, position) {
        var someElement = angular.element(document.getElementById('postForm'));
        $document.scrollTop(0);
        _this.newMessage = angular.copy(postmessage);
        _this.editedPosition = position;
    };

    this.send = function () {
      if(_this.newMessage && _this.newMessage.title && _this.newMessage.body) {
        if (_this.editedPosition !== undefined){
          postsSrv.updatePost(_this.newMessage, _this.editedPosition).then(function (data) {
            console.log("items = ")
            _this.items = data;
            console.log("items = ")
            console.log(_this.items)
          })
        } else {
          postsSrv.addPost(_this.newMessage).then(function (data) {
            _this.items = data;
          })
        }
        _this.newMessage = undefined;
        _this.editedPosition = undefined;
      } else {
        alert("Please enter message and title before posting!")
      }
    };

    this.delete = function (postMessage, position) {
      postsSrv.deletePost(postMessage, position).then(function (data) {
        _this.items = data;
      })
    };

    postsSrv.login("test", "test").then(
      function (userId) {
        _this.getPosts();
        _this.userId = userId;
      },
      function (errorBody) {
        alert("Auth error")
      }
    );

    $scope.sortProperty = function(column) {
        var currentColumn = $scope.orderProperty.slice(1);
        var currentDirection = $scope.orderProperty.slice(0, 1);
        var dir = '+';

        if (column === currentColumn) {
          dir = currentDirection === '+' ? '-' : '+';
        }

        $scope.orderProperty = dir + column;
      };
  });
export default x;