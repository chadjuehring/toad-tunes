(function(){
  'use strict';

  var toadApp = angular.module('toad', []);

  toadApp.factory('songList', function(){
    return [
      { title: 'Imperial March', data: '6 6 6 856 8 56  3 3 3 256 8 56'},
      { title: 'Jingle Bells', data: '333 333 325 43 222'},
      { title: 'Mary Had a Little Lamb', data: '3454333 444 322 345 4333 443455'},
      //{ title: 'Jurassic Park', data: '676008900676000890006776600897'},
      { title: 'Ride of the Valkyries', data: '86 865 6 5 653 5 3 532 8 6865'}
    ];
  });

  toadApp.controller('toadEditor', function($scope, songList) {
    console.log('editor init!');
    $scope.songList = songList;
    $scope.isEditing = false;

    $scope.setSong = function(song){
      $scope.songEdit = song.data;
    };

  });

  toadApp.factory('YTLoader', function($q, $interval, $timeout, $window) {
    var deferred = $q.defer();

    var videoChecker = $interval(checkVideo, 500);

    function checkVideo () {
      console.log('$window.player: ', $window._player);
      if ($window._player) {
        $interval.cancel(videoChecker);
        console.log('player ready! returning player');
        deferred.resolve($window._player);
      } 
    }

    $timeout(function(){
      $interval.cancel(videoChecker);
      deferred.reject();
    }, 5000);

    return deferred.promise;
  });


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
          return attributes.notes; 
        }

        scope.$watch(getNotes, function(newNotes, oldNotes){
          if (newNotes === oldNotes) return;

          YTLoader
            .then(function(yt){
                console.log('starting notes playback.');
                console.log('yt: ', yt);
                var notes = newNotes.split('');
                var bpm = 60 * 1000 / attributes.bpm;
                $interval.cancel(notePlayer);
                notePlayer = $interval(playNote, bpm, notes.length);

                console.log('yt player: ', yt);

                function playNote () {
                  var n = parseInt(notes.shift());
                  if (n !== Number(n)) return;
                  var duration = yt.getDuration();
                  var notePercent = parseInt(n, 10) * 10;
                  yt.seekTo(duration * (notePercent / 100));
                }
            }).catch(function(error){
              console.log('failed to load yt player!');
            });
        });
      }
    }
  });
}());


