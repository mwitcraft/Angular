	var myModule = angular.module("myModule", ["ui.router"]);

    myModule.config(function($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/IsolatedScope.html'
            })
    })

	myModule.controller("myController", function($scope){
		$scope.list = [
            { name: "Mason", city: "Norman"},
            { name: "Reece", city: "Broken Arrow"},
            { name: "Parker", city: "Coweta"}
		];

        $scope.addPerson = function(newName, newCity){
            if(newName !== undefined && newCity !== undefined){
                if(newName.length > 0 && newCity.length > 0){
                    $scope.list.push(
                        { name: newName, city: newCity }
                    )
                }
                else{
                    alert("Enter value for Name and City.")
                }
            }
            else{
                alert("Enter value for Name and City.")
            }
        }
	});

	myModule.directive("boldDirective", function(){
        return{
            scope:{},

            transclude: true,

			template:
            '<span ng-class = "{bold_text: boldBool}"><ng-transclude></ng-transclude></span><br />'+
            '<span ng-if = "!boldBool"><button style="height: 25px" ng-click = "boldLine()"><i class="fa fa-check-circle-o" aria-hidden="true"></i>Bold</button></span>'+
            '<span ng-if = "boldBool"><button style="height: 25px" ng-click = "boldLine()"><i class="fa fa-check-circle" aria-hidden="true"></i></i>Bold</button></span>',

            link: function(scope, element){
                scope.boldLine =function(){
                    scope.boldBool = !scope.boldBool;
                };
            }
		}

	});

    myModule.directive("deleteDirective", function(){
        return{
            scope:{
                myList: "=",
                myPerson: "="
            },

            transclude: true,

            template: '<ng-transclude></ng-transclude><button style="height: 25px" ng-click = "deletePerson()"><i class="fa fa-trash-o fa-lg" aria-hidden="true"></i></button>',

            link: function(scope, element){
                scope.deletePerson = function(){
                    for(var i = 0; i < scope.myList.length; ++i){
                        if(scope.myList[i] === scope.myPerson){
                            scope.myList.splice(i, 1);
                        }
                    }
                }
            }
        }
    })

    myModule.directive("colorDirective", function(){
        return{
            scope:{},

            transclude: true,

            template: '<div class = "list-break"><ng-transclude></ng-transclude><input type = "color" ng-model = "myColor" ng-change = "changeColor()"></div>',

            link: function(scope, element){
                scope.changeColor = function(){
                    element.css('color', scope.myColor)
                }

            }
        }
    })