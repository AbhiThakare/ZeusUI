angular.module('starter').controller('ProductDesignController', function($scope, $ionicModal, $state, $filter, ProductService, CategoryService, FieldService) {
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
    $ionicModal.fromTemplateUrl('templates/tab-editField.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.editFieldModal = modal;
    });
    CategoryService.fetchAllCategory().then(function(allCategoryResponse) {
        $scope.categoryOptions = allCategoryResponse.data;
    }, function(err) {
        console.log('Problem in loading all categories');
    });
//    ProductService.fetchAllProducts().then(function(allProductResponse) {
//        $scope.productOptions = allProductResponse.data;
//    }, function(err) {
//        console.log('Problem in loading all products');
//    });
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
    $scope.addProduct = function(data) {
        ProductService.createProduct(data).then(function(productResponse) {
            $scope.ProductSuccessMessage = true;
            $scope.ProductErrorMessage = false;
            $state.go('productDesign', {}, {
                reload: true
            });
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
    $scope.addCategory = function(data) {
        CategoryService.createCategory(data).then(function(categoryResponse) {
            $scope.CategorySuccessMessage = true;
            $scope.CategoryErrorMessage = false;
            $scope.data = {};
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
    $scope.updateFields = function(data) {
    	var input = data.productId;
        FieldService.updateFields(data).then(function(updateFieldResponse) {
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
}).controller('ProductViewController', function($scope, ProductService, CategoryService, FieldService) {
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
});