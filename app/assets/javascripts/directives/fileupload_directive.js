rails_spa.directive('fileupload', ['$http', function ($http) {
  return {
    scope: {
      fileupload: "=",
      ngModel: "=ngModel"
    },
    restrict: 'A',
    link: function($scope, element, attrs) {  
      element.bind('change', function(){
        var fd = new FormData();
        _.each(element[0].files, function (file) {
          fd.append("attachments[]", file);
        })
        $http.post($scope.fileupload, fd, {headers: {'Content-Type': undefined}})
          .success(function (res) {
            _.each(res, function (attachment) {
              if (attrs.multiple) {
                $scope.ngModel = $scope.ngModel || [];
                $scope.ngModel.push(attachment);
              } else {
                $scope.ngModel = res[0];
              }
            });
          })

        element[0].value = '';
      });
    }
  };
}]);