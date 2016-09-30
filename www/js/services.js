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
                console.log(data);
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
    return {
      createCategory: createCategory
    };
    
}).service('ProductService', function($q, $http) {
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
                console.log(data);
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
    return {
      createCategory: createCategory
    };
    
});
