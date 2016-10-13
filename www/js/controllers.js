angular.module('starter').controller('ProductDesignController', function($scope, $ionicModal,$ionicPopup, $state, $filter, ProductService, CategoryService, FieldService) {
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
    var currentDate = new Date();
    $scope.commissionDate = new Date();
    $scope.sunsetDate = new Date(currentDate.setFullYear(currentDate.getFullYear() +1));
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
    $ionicModal.fromTemplateUrl('templates/tab-editField.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.editFieldModal = modal;
    });
    $scope.clearData = function(){
    	$scope.data= [];
    	$scope.groups= [];
    	$scope.entity = [];
    	$scope.productOptions = [];
    }
    CategoryService.fetchAllCategory().then(function(allCategoryResponse) {
        $scope.categoryOptions = allCategoryResponse.data;
    }, function(err) {
        console.log('Problem in loading all categories');
    });
    CategoryService.fetchAllGroup().then(function(allGroupResponse) {
        $scope.fieldGroups = allGroupResponse.data;
    }, function(err) {
        console.log('Problem in loading all groups ');
    });
    $scope.fetchExsitingFields = function(input) {
        ProductService.getFormDetails(input).then(function(formViewResponse) {
            $scope.entity = formViewResponse.data;
            FieldService.getGroupByProduct(input).then(function(groupByProductResponse) {
                $scope.groups = groupByProductResponse.data;
            }, function(err) {
                console.log('Problem in loading all fields');
            });
        }, function(err) {
            console.log('Problem in loading all fields');
        });
    }
    $scope.addNewProduct = function(categoryId) {
    	$scope.categoryId = categoryId;
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
    $scope.closeFieldModal = function() {
        $scope.fieldModal.hide();
    }
    $scope.closeEditFieldModal = function() {
        $scope.editFieldModal.hide();
    }
    $scope.addNewField = function(productId) {
        $scope.productId = productId;
        FieldService.getAllField(undefined, productId).then(function(allFieldResponse) {
            $scope.allFields = allFieldResponse.data;
            $scope.fieldModal.show();
        }, function(err) {
            console.log('There was some problem in add category');
        });
    }
    $scope.addProduct = function(data,commissionDate,sunsetDate) {
    	var categoryId = $scope.categoryId;
        ProductService.createProduct(data,categoryId, commissionDate, sunsetDate).then(function(productResponse) {
            $scope.ProductSuccessMessage = true;
            $scope.ProductErrorMessage = false;
            $scope.closeProuctModal ();
            $scope.addNewField(productResponse.data.insertedRecordId);
        }, function(err) {
            $scope.ProductSuccessMessage = false;
            $scope.ProductErrorMessage = true;
            console.log('There was some Probmem in add products');
        });
    }
    $scope.newValue = function(workType, categoryId) {
    	 ProductService.fetchAsPerType(workType, categoryId).then(function(productTemplateResponse) {
    		 $scope.productOptions = productTemplateResponse.data;
         }, function(err) {
             console.log('There was some Probmem in add products');
         });
    	
    }
    $scope.addCategory = function(data,commissionDate,sunsetDate) {
        CategoryService.createCategory(data,commissionDate,sunsetDate).then(function(categoryResponse) {
            $scope.CategorySuccessMessage = true;
            $scope.CategoryErrorMessage = false;
            $scope.closeCategoryModal();
            $state.go('productDesign', {}, {
                reload: true
            });
        }, function(err) {
            $scope.CategorySuccessMessage = false;
            $scope.CategoryErrorMessage = true;
            console.log('There was some problem in add category');
        });
    }
    $scope.search = function(data) {
        $scope.selection = [];
        FieldService.getAllField(data, $scope.productId).then(function(fieldResponse) {
            $scope.allFields = fieldResponse.data;
        }, function(err) {
            console.log('There was some problem in add category');
        });
    }
    $scope.toggleSelection = function toggleSelection(option) {
        var idx = $scope.selection.indexOf(option);
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
        } else {
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
            $scope.fetchExsitingFields(productId);
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
    $scope.deleteField = function(fieldId, productId){
		   var confirmPopup = $ionicPopup.confirm({
		     title: 'Please Confirm',
		     template: 'Are you sure you want to delete this field?'
		   });
		   confirmPopup.then(function(res) {
		    if(res) {
		     	FieldService.deleteField(fieldId).then(function(fieldDeleteResponse) {
		     		$scope.fieldDetails = fieldDeleteResponse.data;
		     		$scope.fetchExsitingFields(productId);
		        }, function(err) {
		            console.log('There was some problem in delete field');
		        });
		     } else {
		       console.log('canceled');
		     }
		   });
    }
    $scope.editField = function(fieldId) {
        FieldService.getFieldDetails(fieldId).then(function(fieldResponse) {
            $scope.fieldDetails = fieldResponse.data;
            $scope.fieldDetails.commissionDate = $filter('date')(fieldResponse.data.commissionDate, 'yyyy-MM-dd');
            $scope.fieldDetails.sunsetDate = $filter('date')(fieldResponse.data.sunsetDate, 'yyyy-MM-dd');
            CategoryService.fetchAllGroup().then(function(allGroupsResponse) {
                $scope.fieldGroups = allGroupsResponse.data;
            }, function(err) {
                console.log('There was some problem in add category');
            });
            $scope.editFieldModal.show();
        }, function(err) {
            console.log('There was some problem in add category');
        });
    }
    $scope.updateFields = function(data,commissionDate,sunsetDate) {
    	var input = data.productId;
        FieldService.updateFields(data,commissionDate,sunsetDate).then(function(updateFieldResponse) {
            $scope.fieldDetails = updateFieldResponse.data;
            $scope.editFieldModal.hide();
            $scope.fetchExsitingFields(input);
        }, function(err) {
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
}).controller('ProductViewController', function($scope, ProductService,$ionicPopup, CategoryService, FieldService) {
    CategoryService.fetchAllCategory().then(function(allCategoryResponse) {
        $scope.categoryOptions = allCategoryResponse.data;
    }, function(err) {
        console.log('not saved');
    });
    $scope.getAllproducts = function(categoryId) {
    	$scope.productOptions = [];
    	$scope.data= [];
    	$scope.groups= [];
    	ProductService.fetchAsPerType('no', categoryId).then(function(productTemplateResponse) {
   		 $scope.productOptions = productTemplateResponse.data;
       }, function(err) {
           console.log('There was some Probmem in add products');
       });
    	
    };
    $scope.showUnderConstuction = function(){
    	var confirmPopup = $ionicPopup.confirm({
		     title: 'oops!..',
		     template: 'This is under construction !'
		   });
    };
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
    $scope.getFormView = function(input) {
        ProductService.getFormDetails(input).then(function(formViewResponse) {
            $scope.entity = formViewResponse.data;
            FieldService.getGroupByProduct(input).then(function(groupByProductResponse) {
                $scope.groups = groupByProductResponse.data;
            }, function(err) {
                console.log('Problem in loading all fields');
            });
        }, function(err) {
            console.log('Problem in loading all fields');
        });
    }
}).controller('MenuController', function($scope){
	$scope.activeButton = 'a';	
});