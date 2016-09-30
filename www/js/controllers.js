angular.module('starter')

.controller('CategoryController', function($scope, CategoryService) {
  $scope.addCategory = function(data){
  	CategoryService.createCategory(data).then(function(categoryResponse) {
        console.log(categoryResponse);
    }, function(err) {
        console.log('not saved');
    });
  }
})

.controller('ProductController', function($scope) {
  
})

.controller('ProductDesignController', function($scope) {
  
})

.controller('ProductViewController', function($scope) {
	$scope.entity={
	   formName:"catgoryform",
       fields:[
         {type:"text",name:"firstname",label:"FirstName",required:!0,data:""},
         {type:"text",name:"midlename",label:"MidleName",required:!0,data:""},
         {type:"text",name:"Lasttname",label:"LastName",required:!0,data:""},
         {type:"radio",name:"color_id",label:"Colors",options:[{id:1,name:"orange"},{id:2,name:"pink"},{id:3,name:"gray"},{id:4,name:"cyan"}],required:!0,data:""},
         {type:"email",name:"emailUser",label:"Email",required:!0,data:""},{type:"text",name:"city",label:"City",required:!0,data:""},
         {type:"password",name:"pass",label:"Password",min:6,max:20,required:!0,data:""},
         {type:"select",name:"teacher_id",label:"Teacher",options:[{name:"Mark"},{name:"Claire"},{name:"Daniel"},{name:"Gary"}],required:!0,data:"",value:"Mark"},
         {type:"checkbox",name:"car_id",label:"Cars",options:[{id:1,name:"bmw"},{id:2,name:"audi"},{id:3,name:"porche"},{id:4,name:"jaguar"}],required:!0,data:""}
       ]};
  
});
