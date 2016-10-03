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
                if (data.data.status == 'SUCCESS') {
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
                url: "http://localhost:8080/zeus/group",
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { 
                    "name": userData.name,
                    "labelName" : userData.displayname,
                    "orderOfDisplay" : userData.orderingDis
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
      addGroup: addGroup
    };
    
}).service('ProductService', function($q, $http) {
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
    	createProduct: getFormDetails,
    	fetchAllProducts: fetchAllProducts,
    	getFormDetails: getFormDetails
    };
    
});
