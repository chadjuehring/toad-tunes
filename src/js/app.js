(function(GLOBAL){
  'use strict';

  var toadApp = angular.module('toad', []);

  toadApp.factory('songList', function(){
    return [
      { title: 'Imperial March', data: '6 6 6 856 8 56  3 3 3 256 8 56'},
      { title: 'Jurassic Park', data: '676008900676000890006776600897'}
    ];
  });

  toadApp.controller('toadEditor', function($scope, songList) {
    console.log('editor init!');
    $scope.songList = songList;
    $scope.isEditing = false; // imperial march

    $scope.setSong = function(song){
      $scope.songEdit = song.data;
    };
  });

  toadApp.factory('YTLoader', (function(){
    var _player;

    GLOBAL.onYouTubeIframeAPIReady = function () {
      _player = new YT.Player('toad-video');
    }

    GLOBAL.onPlayerReady = function (event) {
      event.target.playVideo();
    }
  
    return function($q, $interval) {
      var deferred = $q.defer();
      var videoChecker = $interval(checkVideo, 150, 10); 
      function checkVideo () {
        if (_player) {
          console.log('player ready.');
          deferred.resolve(_player);
          $interval.cancel(videoChecker);
        }
      }
      return deferred.promise;
    };

  }()));

  toadApp.directive('toadTunes', function($interval, YTLoader){
    return {
      restrict : "E",
      scope : {
        notes : '@',
        bpm : '&'
      },
      templateUrl: './templates/toad-tunes.html',
      link: function (scope, element, attributes) {
        var notePlayer;
        function getNotes () { 
          console.log(attributes.notes); 
          return attributes.notes; 
        }

        scope.$watch(getNotes, function(newNotes, oldNotes){
          //if (newNotes === oldNotes) return;
          YTLoader
            .then(function(yt){
                console.log('starting notes playback.');
                var notes = newNotes.split('');
                var bpm = 60 * 1000 / attributes.bpm;
                $interval.cancel(notePlayer);
                notePlayer = $interval(playNote, bpm, notes.length);

                function playNote () {
                  var n = parseInt(notes.shift());
                  if (n !== Number(n)) return;
                  var duration = yt.getDuration();
                  var notePercent = parseInt(n, 10) * 10;
                  yt.seekTo(duration * (notePercent / 100));
                }
            });
        });
      }
    }
  });
}(window));


