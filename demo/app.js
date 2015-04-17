'use strict';

/**
 * @ngdoc function
 * @name qiniuUploadApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the qiniuUploadApp
 */
angular.module('qiniuUploadApp', ['angularQFileUpload'])
	.controller('MainCtrl', function($scope, $log, $qupload) {

		$scope.selectFiles = [];

		var start = function(index) {
			$scope.selectFiles[index].progress = {
				p: 0
			};
			$scope.selectFiles[index].upload = $qupload.upload({
				key: 'test',
				file: $scope.selectFiles[index].file,
				token: 'Gt9skxqDG0eNdra5nZaQGq6bt11n5DP8e9z6djkj:58XaRXCC-6Etxj6nWxWOFJK89XM=:eyJzY29wZSI6InlvZGEiLCJkZWFkbGluZSI6MTQyOTI0MDQ4MH0='
			});
			$scope.selectFiles[index].upload.then(function(response) {
				$log.info(response);
			}, function(response) {
				$log.info(response);
			}, function(evt) {
				$scope.selectFiles[index].progress.p = Math.floor(100 * evt.loaded / evt.totalSize);
			});
		};

		$scope.abort = function(index) {
			$scope.selectFiles[index].upload.abort();
			$scope.selectFiles.splice(index, 1);
		};

		$scope.onFileSelect = function($files) {
			var offsetx = $scope.selectFiles.length;
			for (var i = 0; i < $files.length; i++) {
				$scope.selectFiles[i + offsetx] = {
					file: $files[i]
				};
				start(i + offsetx);
			}
		};
	});
