angular.module('starter').config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  // Each tab has its own nav history stack:
  .state('category', {
    url: '/category',
    templateUrl: 'templates/tab-category.html',
    controller: 'CategoryController'
   
  })
  .state('product', {
      url: '/product',
      cache: false,
      templateUrl: 'templates/tab-product.html',
      controller: 'ProductController'
  })
  .state('productDesign', {
    url: '/productDesign',
    cache: false,
    templateUrl: 'templates/tab-productDesign.html',
    controller: 'ProductDesignController'
  })
  .state('viewProduct', {
    url: '/viewProduct',
    templateUrl: 'templates/tab-viewProduct.html',
    controller: 'ProductViewController'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/category');

});