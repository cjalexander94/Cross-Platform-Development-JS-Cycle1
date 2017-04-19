angular.module("my-app", [])

.controller("mainCtrl", function($scope){

	$scope.numbers = {
		num1: "",
		num2: ""
	}

	$scope.add = function(){
		$scope.results = $scope.numbers.num1 + $scope.numbers.num2;
	}

	$scope.subtract = function(){
		$scope.results = $scope.numbers.num1 - $scope.numbers.num2;
	}

	$scope.multiply = function(){
		$scope.results = $scope.numbers.num1 * $scope.numbers.num2;
	}

	$scope.divide = function(){
		$scope.results = $scope.numbers.num1 / $scope.numbers.num2;
	}
})
