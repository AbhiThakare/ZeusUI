angular.module('starter')
.controller('ProductDesignController', function($scope, $ionicModal, ProductService, CategoryService) {
    $scope.successMessage = false;
    $scope.errorMessage = false;
    $scope.ProductSuccessMessage = false;
    $scope.ProductErrorMessage = false;
    $scope.CategorySuccessMessage = false;
    $scope.CategoryErrorMessage = false;
    $scope.groups = [];
    $scope.inputs = [];
    $ionicModal.fromTemplateUrl('templates/tab-product.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.productModal = modal;
    });
    $ionicModal.fromTemplateUrl('templates/tab-category.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.categoryModal = modal;
    });
    CategoryService.fetchAllCategory().then(function(allCategoryResponse) {
        $scope.categoryOptions = allCategoryResponse.data;
    }, function(err) {
        console.log('Problem in loading all categories');
    });
    ProductService.fetchAllProducts().then(function(allProductResponse) {
        $scope.productOptions = allProductResponse.data;
    }, function(err) {
        console.log('Problem in loading all products');
    });
    CategoryService.fetchAllGroup().then(function(allGroupResponse) {
        $scope.fieldGroups = allGroupResponse.data;
    }, function(err) {
        console.log('Problem in loading all groups ');
    });
    $scope.fetchExsitingFields = function(input) {
    	 $scope.entity = [
    	  {
    	    "feildId": 6,
    	    "groupId": 1,
    	    "groupName": "Personal Details",
    	    "productId": 2,
    	    "categoryId": 2,
    	    "name": "firstname",
    	    "labelName": "First Name",
    	    "inputType": "text",
    	    "commissionDate": "2016-01-22",
    	    "sunsetDate": "0207-01-22",
    	    "sequenceInGroup": 1,
    	    "minLength": 144,
    	    "maxLength": 122,
    	    "mandatoryValue": "yes",
    	    "defaultValue": "Abhinav"
    	  },
    	  {
    	    "feildId": 7,
    	    "groupId": 1,
    	    "groupName": "Personal Details",
    	    "productId": 2,
    	    "categoryId": 2,
    	    "name": "lastName",
    	    "labelName": "Last Name",
    	    "inputType": "text",
    	    "commissionDate": "2016-01-22",
    	    "sunsetDate": "0207-01-22",
    	    "sequenceInGroup": 2,
    	    "minLength": 144,
    	    "maxLength": 122,
    	    "mandatoryValue": "yes",
    	    "defaultValue": "Thakare"
    	  },
    	  {
    	    "feildId": 7,
    	    "groupId": 2,
    	    "groupName": "Account Details",
    	    "productId": 2,
    	    "categoryId": 2,
    	    "name": "sortCode",
    	    "labelName": "Sort Code",
    	    "inputType": "text",
    	    "commissionDate": "2016-01-22",
    	    "sunsetDate": "0207-01-22",
    	    "sequenceInGroup": 2,
    	    "minLength": 144,
    	    "maxLength": 122,
    	    "mandatoryValue": "yes",
    	    "defaultValue": "0000"
    	  },
    	  {
    	    "feildId": 7,
    	    "groupId": 2,
    	    "groupName": "Account Details",
    	    "productId": 2,
    	    "categoryId": 2,
    	    "name": "accountNumber",
    	    "labelName": "Account Number",
    	    "inputType": "text",
    	    "commissionDate": "2016-01-22",
    	    "sunsetDate": "0207-01-22",
    	    "sequenceInGroup": 2,
    	    "minLength": 144,
    	    "maxLength": 122,
    	    "mandatoryValue": "yes",
    	    "defaultValue": "0000"
    	  }
    	];
    	 $scope.entity.items = [
       	 {
       		"groupId": 1,
        	"groupName": "Personal Details",
       	 },
       	 {
    		"groupId": 2,
     	    "groupName": "Account Details",
    	 },
       	];
    	 for (var i=0; i< $scope.entity.items.length; i++) {
    	      $scope.groups[i] = {
    	        name: $scope.entity.items[i].groupName,
    	        items: []
    	      };
    	      for (var j=0; j<$scope.entity.length; j++) {
    	    	  if($scope.entity[j].groupId == $scope.entity.items[i].groupId){
    	    		  $scope.groups[i].items.push(i + '-' + j);
    	    	  }
    	      }
    	    }
//        ProductService.getFormDetails(input).then(function(formViewResponse) {
//            $scope.entity = formViewResponse.data;
//        }, function(err) {
//            console.log('Problem in loading all fields');
//        });
    }
    $scope.addNewProduct = function() {
        $scope.productModal.show();
    }
    $scope.closeProuctModal = function() {
        $scope.productModal.hide();
    }
    $scope.addNewCategory = function() {
        $scope.categoryModal.show();
    }
    $scope.closeCategoryModal = function() {
        $scope.categoryModal.hide();
    }
    $scope.addProduct = function(data) {
        ProductService.createProduct(data).then(function(productResponse) {
            $scope.ProductSuccessMessage = true;
            $scope.ProductErrorMessage = false;
        }, function(err) {
            $scope.ProductSuccessMessage = false;
            $scope.ProductErrorMessage = true;
            console.log('There was some Probmem in add products');
        });
    }
    $scope.addCategory = function(data) {
        CategoryService.createCategory(data).then(function(categoryResponse) {
            $scope.CategorySuccessMessage = true;
            $scope.CategoryErrorMessage = false;
            $scope.data = {};
        }, function(err) {
            $scope.CategorySuccessMessage = false;
            $scope.CategoryErrorMessage = true;
            console.log('There was some problem in add category');
        });
    }
    $scope.addInput = function() {
        $scope.inputs.push({});
    }
    $scope.removeInput = function(index) {
        $scope.inputs.splice(index, 1);
    }
    $scope.saveProductTemplate = function(data) {
        ProductService.saveProductTemplate(data, $scope.inputs).then(function(templateSaveResponse) {
            $scope.successMessage = true;
            $scope.errorMessage = false;
            $scope.productOptions = templateSaveResponse.data;
        }, function(err) {
            $scope.successMessage = false;
            $scope.errorMessage = true;
            console.log('There was some problem in save product template');
        });
    }
    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };
    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };
    
}).controller('groupController', function($scope, CategoryService) {
    $scope.successMessage = false;
    $scope.errorMessage = false;
    $scope.addGroup = function(data) {
        CategoryService.addGroup(data).then(function(gruopResponse) {
            $scope.successMessage = true;
            $scope.errorMessage = false;
            $scope.data = {};
        }, function(err) {
            $scope.successMessage = false;
            $scope.errorMessage = true;
            console.log('not saved');
        });
    }
}).controller('ProductViewController', function($scope, ProductService, CategoryService) {
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
    $scope.getFormView = function(input) {
            ProductService.getFormDetails(input).then(function(formViewResponse) {
                $scope.entity = formViewResponse.data;
            }, function(err) {
                console.log('not saved');
            });
        }
        //	$scope.entity={
        //	   formName:"catgoryform",
        //       fields:[
        //         {type:"text",name:"firstname",label:"FirstName",required:!0,data:""},
        //         {type:"text",name:"midlename",label:"MidleName",required:!0,data:""},
        //         {type:"text",name:"Lasttname",label:"LastName",required:!0,data:""},
        //         {type:"textarea",name:"Address",label:"Address",required:!0,data:""},
        //         {type:"email",name:"emailUser",label:"Email",required:!0,data:""},{type:"text",name:"city",label:"City",required:!0,data:""},
        //         {type:"password",name:"pass",label:"Password",min:6,max:20,required:!0,data:""},
        //		   {type:"radio",name:"color_id",label:"Colors",options:[{id:1,name:"orange"},{id:2,name:"pink"},{id:3,name:"gray"},{id:4,name:"cyan"}],required:!0,data:""},
        //         {type:"select",name:"teacher_id",label:"Teacher",options:[{name:"Mark"},{name:"Claire"},{name:"Daniel"},{name:"Gary"}],required:!0,data:"",value:"Mark"},
        //         {type:"checkbox",name:"car_id",label:"Cars",options:[{id:1,name:"bmw"},{id:2,name:"audi"},{id:3,name:"porche"},{id:4,name:"jaguar"}],required:!0,data:""}
        //       ]};
});