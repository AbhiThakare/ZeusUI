angular.module('starter').service('CategoryService', function($q, $http, $filter, URL) {
    var createCategory = function(userData) {
        return $q(function(resolve, reject) {
            var req = {
                url: URL.url + "category",
                method: 'POST',
                data: {
                    "name": userData.name,
                    "displayName": userData.displayname,
                    "orderOfDisplay": userData.orderingDis,
                    "commissionDate": $filter('date')(userData.commissionDate, 'dd/MM/yyyy'),
                    "sunsetDate": $filter('date')(userData.sunsetDate, 'dd/MM/yyyy')
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
                url: URL.url + "field/group",
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "name": userData.name,
                    "label": userData.displayname,
                    "displaySequence": userData.orderingDis
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
                url: URL.url + "field/group",
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
                url: URL.url + "category",
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
}).service('FieldService', function($q, $http, URL, $filter) {
    var getAllField = function(data, productId) {
        if (data == undefined) {
            data = {}
        } else {
            data = {
                "name": data.fieldName,
                "description": data.fieldDesc
            }
        }
        return $q(function(resolve, reject) {
            var req = {
                url: URL.url + "field/master/" + productId,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
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
    var addField = function(productId, SelectedFields) {
        return $q(function(resolve, reject) {
            var formFieldbean = [];
            for (var i = 0; i < SelectedFields.length; i++) {
                formFieldbean[i] = {
                    "productId": productId,
                    "name": SelectedFields[i].name,
                    "labelName": SelectedFields[i].label,
                    "fieldMasterId": SelectedFields[i].fieldMasterId
                }
            }
            var req = {
                url: URL.url + "field",
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: formFieldbean
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
    var getSelectedFields = function(productId) {
        return $q(function(resolve, reject) {
            var req = {
                url: URL.url + "field/product/" + productId,
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
    var getFieldDetails = function(fieldId) {
        return $q(function(resolve, reject) {
            var req = {
                url: URL.url + "field/" + fieldId,
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
    var getGroupByProduct = function(productId){
    	return $q(function(resolve, reject) {
            var req = {
                url: URL.url + "field/group/product/" + productId,
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
    }
    var updateFields = function(data) {
        return $q(function(resolve, reject) {
            var req = {
                url: URL.url + "field/update",
                method: 'POST',
                data: {
                    "fieldId": data.fieldId,
                    "fieldMasterId": data.fieldMasterId,
                    "groupId": data.groupId,
                    "productId": data.productId,
                    "name": data.name,
                    "labelName": data.labelName,
                    "inputType": data.inputType,
                    "commissionDate": $filter('date')(data.commissionDate, 'dd/MM/yyyy'),
                    "sunsetDate": $filter('date')(data.sunsetDate, 'dd/MM/yyyy'),
                    "sequenceInGroup": data.sequenceInGroup,
                    "minLength": 144,
                    "maxLength": 122,
                    "mandatory": data.mandatory,
                    "defaultValue": data.defaultValue
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
    return {
        getAllField: getAllField,
        addField: addField,
        getSelectedFields: getSelectedFields,
        getFieldDetails: getFieldDetails,
        updateFields: updateFields,
        getGroupByProduct: getGroupByProduct
    };
}).service('ProductService', function($q, $http, URL, $filter) {
    var saveProductTemplate = function(categoryData, fieldData) {
        return $q(function(resolve, reject) {
            var formFieldbean = [];
            for (var i = 0; i < fieldData.length; i++) {
                formFieldbean[i] = {
                    "groupId": fieldData[i].groupId,
                    "productId": categoryData.selectProduct,
                    "name": fieldData[i].name,
                    "labelName": fieldData[i].lableName,
                    "inputType": fieldData[i].selectInput,
                    "commissionDate": $filter('date')(fieldData[i].commissionDate, 'dd/MM/yyyy'),
                    "sunsetDate": $filter('date')(fieldData[i].sunsetDate, 'dd/MM/yyyy'),
                    "sequenceInGroup": fieldData[i].sequenceNo,
                    "minLength": 144,
                    "maxLength": 122,
                    "isMandatory": fieldData[i].isMandatory,
                    "defaultValue": fieldData[i].defaultValue
                }
            }
            var req = {
                url: URL.url + "field",
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
    var createProduct = function(userData, categoryId) {
        return $q(function(resolve, reject) {
            var req = {
                url: URL.url + "product",
                method: 'POST',
                data: {
                    "categoryId": categoryId,
                    "name": userData.name,
                    "displayName": userData.displayname,
                    "commissionDate": $filter('date')(userData.commissionDate, 'dd/MM/yyyy'),
                    "sunsetDate": $filter('date')(userData.sunsetDate, 'dd/MM/yyyy'),
                    "saveAsTemplate": userData.saveAsTemplate,
                    "productFeature" : userData.saveOption,
                    "templateId" : userData.selectTemplate
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
                url: URL.url + "product",
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
                url: URL.url + "field/product/" + input,
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
    var fetchAsPerType = function(workType,categoryId) {
        return $q(function(resolve, reject) {
            var req = {
                url: URL.url + "product/"+categoryId+"/"+workType,
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
        saveProductTemplate: saveProductTemplate,
        fetchAsPerType: fetchAsPerType
    };
});