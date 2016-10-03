angular.module('starter').service('CategoryService', function($q, $http, URL) {
  var createCategory = function(userData) {
        return $q(function(resolve, reject) {
            var req = {
                url: URL.url+"category",
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
                url: URL.url+"feild/group",
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
                url: URL.url+"feild/group",
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
                url: URL.url+"category",
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
    
}).service('ProductService', function($q, $http, URL) {
	var saveProductTemplate = function(categoryData, fieldData) {
        return $q(function(resolve, reject) {
        	var formFieldbean = [];
        	for(var i=0; i < fieldData.length; i++){
        		formFieldbean[i] = {
        			  "groupId": fieldData[i].groupId,
                   	  "productId" : categoryData.selectProduct,
                   	  "categoryId" : categoryData.selectCategory,
                   	  "name": fieldData[i].name,
                   	  "labelName" : fieldData[i].lableName,
                   	  "inputType" : fieldData[i].selectInput,
                   	  "commissionDate" :fieldData[i].commissionDate,
                   	  "sunsetDate" : fieldData[i].sunsetDate,
                   	  "sequenceInGroup" : fieldData[i].sequenceNo, 
                   	  "minLength" :144,
                   	  "maxLength" : 122,
                   	  "mandatoryValue" : fieldData[i].isMandatory,
                   	  "defaultValue" : fieldData[i].defaultValue
        		}
        	}
        		
            var req = {
                url: URL.url+"feild",
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
                url: URL.url+"product",
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
                url: URL.url+"product",
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
                url: URL.url+"feild/"+input.selectCategory+"/"+input.selectProduct,
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
    	createProduct: createProduct,
    	fetchAllProducts: fetchAllProducts,
    	getFormDetails: getFormDetails,
    	saveProductTemplate: saveProductTemplate
    };
    
});
