angular.module('starter')

.controller('CategoryController', function($scope, CategoryService) {
	  $scope.addCategory = function(data){
		  CategoryService.createCategory(data).then(function(categoryResponse) {
			  alsert('Success');
		  	}, function(err) {
		  	  console.log('not saved');
		 });
	  }
})

.controller('ProductController', function($scope, ProductService, CategoryService) {
	 CategoryService.fetchAllCategory().then(function(allCategoryResponse) {
		 	$scope.options = allCategoryResponse.data;
    	}, function(err) {
    		console.log('not saved');
     });
	 $scope.addProduct = function(data){
		 ProductService.createProduct(data).then(function(productResponse) {
		       alsert('Success');		        
		    }, function(err) {
		        console.log('not saved');
	    });
	  }
})

.controller('ProductDesignController', function($scope, ProductService,CategoryService) {
	CategoryService.fetchAllCategory().then(function(allCategoryResponse) {
	 	$scope.categoryOptions = allCategoryResponse.data;
	}, function(err) {
		console.log('not saved');
	});
	ProductService.fetchAllProducts().then(function(allProductResponse) {
	 	$scope.productOptions = allProductResponse.data;
	}, function(err) {
		console.log('not saved');
	});
	$scope.inputs = [];

	$scope.addInput = function(){
	    $scope.inputs.push({field:'', value:''});
	}

	$scope.removeInput = function(index){
	    $scope.inputs.splice(index,1);
	}
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
