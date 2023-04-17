var myApp = angular.module("myApp", []);
// Register Service
myApp.service("RegisterService" , function(){
var uid = 1;
var users = [{
'id' : 0,
'name' : 'Purva Bajpai',
'email' : 'purvabajpai@gmail.com',
'password': 'purva18',
'phone' : '9876543210'}
];	

	// Save User
	this.save = function(user)  
	{
		if(user.id == null)                       
		{
			user.id = uid++;
			users.push(user);
		}
		else
		{
			for(var i in users)
			{
				if(users[i].id == user.id)
				{
					users[i] = user;
				}
			}
		}
	};

	// Search User
	this.get = function(id)
	{
		for(var i in users )
		{
		if( users[i].id == id)
		{
		return users[i];
		}
		}
	};

	// Delete User
	this.delete = function(id)
	{
	for(var i in users)
	{
	if(users[i].id == id)
	{
	users.splice(i,1);
	}
	}
	};	

	// List Users
	this.list = function()
	{
	return users;
	};	
});

// Register Controller 
myApp.controller("RegisterController" , function($scope , RegisterService){
console.clear();
$scope.ifSearchUser = false;
$scope.title ="User List";
$scope.users = RegisterService.list();
$scope.saveUser = function()
{
	console.log($scope.newuser);
	if($scope.newuser == null || $scope.newuser == angular.undefined)
	return;
	RegisterService.save($scope.newuser);
	$scope.newuser = {};
};		
$scope.delete = function(id)
{
	RegisterService.delete(id);
	if($scope.newuser != angular.undefined && $scope.newuser.id == id)
	{
		$scope.newuser = {};
	}
};		
$scope.edit = function(id)
{
	$scope.newuser = angular.copy(RegisterService.get(id));
};		
$scope.searchUser = function(){
	if($scope.title == "User List"){
		$scope.ifSearchUser=true;
		$scope.title = "Back";
	}
	else
	{
		$scope.ifSearchUser = false;
		$scope.title = "User List";
	}		  
};
});