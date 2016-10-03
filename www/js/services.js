angular.module('starter').service('CategoryService', function($q, $http) {
  var createCategory = function(userData) {
        return $q(function(resolve, reject) {
            var req = {
                url: "http://localhost:8080/zeus/category",
                method: 'POST',
                data: { 
                  "name": userData.name,
                  "displayName" : userData.displayname,
                  "orderOfDisplay" : userData.orderingDis,
                  "commissionDate" : userData.commissionDate,
                  "sunsetDate" : userData.sunsetDate
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            $http(req).then(function(data) {
                if (data.statusText == 'OK') {
                    resolve(data);
                } else {
                    reject('Update Expertise Failed!');
                }
            }, function(err) {
                reject(err);
            });
        });
    };
    var addGroup = function(userData) {
        return $q(function(resolve, reject) {
            var req = {
                url: "http://localhost:8080/zeus/feild/group",
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data:  { 
	                "name": userData.name,
	                "label" : userData.displayname,
	                "displaySequence" : userData.orderingDis
	            },
            }
            $http(req).then(function(data) {
                if (data.statusText == 'OK') {
                    resolve(data);
                } else {
                    reject('Update Expertise Failed!');
                }
            }, function(err) {
                reject(err);
            });
        });
    };
    var fetchAllGroup = function() {
        return $q(function(resolve, reject) {
            var req = {
                url: "http://localhost:8080/zeus/feild/group",
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            $http(req).then(function(data) {
                if (data.statusText == 'OK') {
                    resolve(data);
                } else {
                    reject('Update Expertise Failed!');
                }
            }, function(err) {
                reject(err);
            });
        });
    };
    var fetchAllCategory = function() {
        return $q(function(resolve, reject) {
            var req = {
                url: "http://localhost:8080/zeus/category",
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            $http(req).then(function(data) {
                if (data.statusText == 'OK') {
                    resolve(data);
                } else {
                    reject('Update Expertise Failed!');
                }
            }, function(err) {
                reject(err);
            });
        });
    };
    return {
      createCategory: createCategory,
      fetchAllCategory: fetchAllCategory,
      addGroup: addGroup,
      fetchAllGroup: fetchAllGroup
    };
    
}).service('ProductService', function($q, $http) {
	var saveProductTemplate = function(categoryData, fieldData) {
        return $q(function(resolve, reject) {
        	var formFieldbean = [];
        	for(var i=0; i < fieldData.length; i++){
        		formFieldbean[i] = {
        			  "groupId": fieldData.groupName,
                   	  "productId" : categoryData.selectProduct,
                   	  "categoryId" : categoryData.selectCategory,
                   	  "name": fieldData.name,
                   	  "labelName" : fieldData.lableName,
                   	  "inputType" : fieldData.selectInput,
                   	  "commissionDate" :fieldData.commissionDate,
                   	  "sunsetDate" : fieldData.sunsetDate,
                   	  "sequenceInGroup" : fieldData.sequenceNo, 
                   	  "minLength" :144,
                   	  "maxLength" : 122,
                   	  "mandatoryValue" : fieldData.isMandatory,
                   	  "defaultValue" : fieldData.defaultValue
        		}
        	}
        		
            var req = {
                url: "http://localhost:8080/zeus/feild",
                method: 'POST',
                data: formFieldbean,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            $http(req).then(function(data) {
                if (data.statusText == 'OK') {
                    resolve(data);
                } else {
                    reject('Update Expertise Failed!');
                }
            }, function(err) {
                reject(err);
            });
        });
    };
	
    var createProduct = function(userData) {
        return $q(function(resolve, reject) {
            var req = {
                url: "http://localhost:8080/zeus/product",
                method: 'POST',
                data: { 
                  "categoryId": userData.selectCategory,
                  "name": userData.name,
                  "displayName" : userData.displayname,
                  "commissionDate" : userData.commissionDate,
                  "sunsetDate" : userData.sunsetDate
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            $http(req).then(function(data) {
                if (data.statusText == 'OK') {
                    resolve(data);
                } else {
                    reject('Update Expertise Failed!');
                }
            }, function(err) {
                reject(err);
            });
        });
    };
    var fetchAllProducts = function() {
        return $q(function(resolve, reject) {
            var req = {
                url: "http://localhost:8080/zeus/product",
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            $http(req).then(function(data) {
                if (data.statusText == 'OK') {
                    resolve(data);
                } else {
                    reject('Update Expertise Failed!');
                }
            }, function(err) {
                reject(err);
            });
        });
    };
    var getFormDetails = function(input) {
        return $q(function(resolve, reject) {
            var req = {
                url: "http://localhost:8080/zeus/product",
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { 
                    "categoryId": input.selectCategory,
                    "productId": input.selectProduct
                  },
            }
            $http(req).then(function(data) {
                if (data.statusText == 'OK') {
                    resolve(data);
                } else {
                    reject('Update Expertise Failed!');
                }
            }, function(err) {
                reject(err);
            });
        });
    };
    return {
    	createProduct: createProduct,
    	fetchAllProducts: fetchAllProducts,
    	getFormDetails: getFormDetails,
    	saveProductTemplate: saveProductTemplate
    };
    
});
