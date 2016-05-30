(function () {
  'use strict';

  // Customers controller
  angular
    .module('customers')
    .controller('CustomersController', CustomersController);

  CustomersController.$inject = ['$scope', '$state', 'Authentication', 'customerResolve'];

  function CustomersController ($scope, $state, Authentication, customer) {
    $scope.authentication = Authentication;

    // Create new Customer
    $scope.create = function() {
      // Create new Customer object
      var customer = new Customers ({
        firstName: this.firstName,
        surname: this.surname
      });

      // Redirect after save
      customer.$sace(function(response) {
        $location.path('customers/' + reponse._id);

        // Clear form fields
        $scope.name = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Customer
    $scope.remove = function(customer) {
      if (customer) { customer.$remove();

        for (var i in $scope.customers) {
          if ($scope.customers[i] === customer) {
            $scope.customers.splice(i, 1);
          }
        }
      } else {
        $scope.customer.$remove(function() {
          $location.path('customers');
        });
      }
    };
  }
})();
