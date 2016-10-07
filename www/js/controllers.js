angular.module('starter')
.controller('ProductDesignController', function($scope, $ionicModal, ProductService, CategoryService, FieldService) {
    $scope.successMessage = false;
    $scope.errorMessage = false;
    $scope.ProductSuccessMessage = false;
    $scope.ProductErrorMessage = false;
    $scope.CategorySuccessMessage = false;
    $scope.CategoryErrorMessage = false;
    $scope.fieldErrorMessage = false;
    $scope.groups = [];
    $scope.inputs = [];
    $scope.selection = [];
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
    $ionicModal.fromTemplateUrl('templates/tab-fieldSearch.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.fieldModal = modal;
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
	ProductService.getFormDetails(input).then(function(formViewResponse) {
		$scope.entity = formViewResponse.data;
      }, function(err) {
          console.log('Problem in loading all fields');
      });
	
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
    $scope.addNewField = function(productId) {
    	$scope.productId = productId;
    	FieldService.getAllField().then(function(allFieldResponse) {
            $scope.allFields = allFieldResponse.data;
            $scope.fieldModal.show();
        }, function(err) {
            console.log('There was some problem in add category');
        });
    }
    $scope.closeFieldModal = function() {
        $scope.fieldModal.hide();
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
    $scope.search = function(data) {
    	$scope.selection = [];
    	FieldService.getAllField(data).then(function(fieldResponse) {
            $scope.allFields = fieldResponse.data;
        }, function(err) {
            console.log('There was some problem in add category');
        });
    }
    $scope.toggleSelection = function toggleSelection(option) {
        var idx = $scope.selection.indexOf(option);
        if (idx > -1) {
          $scope.selection.splice(idx, 1);
        }
        else {
          $scope.selection.push(option);
        }
      };
    $scope.addField = function() {
    	var productId = $scope.productId;
    	var selectedFields = $scope.selection;
    	FieldService.addField(productId, selectedFields).then(function(fieldResponse) {
            $scope.allFields = fieldResponse.data;
            $scope.closeFieldModal();
            $scope.selection = [];
            FieldService.getSelectedFields(productId).then(function(selectedFieldResponse) {
                $scope.seletedFields = selectedFieldResponse.data;
            }, function(err) {
                console.log('There was some problem in add category');
            });
        }, function(err) {
        	$scope.fieldErrorMessage = true;
            console.log('There was some problem in add category');
        });
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