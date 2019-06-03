var app = angular.module("myShoppingList", []); 
app.controller("myCtrl", function($scope,$http) {
    $scope.formData={};

    //-------Showing Data-------
      console.log("Showing values from DB");
      //fetching values from db(Server.js)
      $http.get('/api/showData')
        .success(function(data) {
            $scope.lists = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });


    //-------Add item-------
    $scope.addItem = function () {
       flag=0;//defined
       $scope.flag=0;
       $scope.errortext = "";
       console.log($scope.lists.length);
       if (!$scope.addMe) {return;}        
       for( var i=0; i< $scope.lists.length ; i++)
       {
         if( $scope.addMe.charAt(0).toUpperCase()+$scope.addMe.slice(1) == $scope.lists[i].productname)
          {
            $scope.flag=1;
            /*console.log($scope.flag); //checking
            console.log($scope.addMe.charAt(0).toUpperCase()+$scope.addMe.slice(1)+" equal "+$scope.lists[i].productname);*/
          }  
        } 
        if($scope.flag==0){
              console.log('Clicked submit');
              console.log($scope.addMe);

              $scope.formData = {
                     item: $scope.addMe.charAt(0).toUpperCase()+ $scope.addMe.slice(1)
                    };

              $http.post('/api/addValue', $scope.formData)
            .success(function(data) {
                $scope.lists = data; //assigning value from db(Server.js)
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ');
            });

            $scope.flag=0;
            $scope.addMe="";
            $scope.showValues();
          }
         else {
            $scope.errortext = "The item is already in your shopping list.";
            $scope.addMe="";
         }
       

    }
    
    //-------Remove item-------
    $scope.removeItem = function (x) {
        $scope.errortext = "";    
        console.log('Clicked Remove'+ x);

        $scope.formData = {
                         productname: x
                    };
        $http.post('/api/removeValue', $scope.formData )
            .success(function(data) {
                $scope.lists = data; //assigning value from db(Server.js)
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ');
            });
            $scope.showValues();

    }

      //-------Showing Data via function call-------
      $scope.showValues=function(){
        console.log("Showing Values from DB via function call");
        //fetching values from db(Server.js)
        $http.get('/api/showData')
          .success(function(data) {
              $scope.lists = data;
              console.log(data);
          })
          .error(function(data) {
              console.log('Error: ' + data);
          });
      }
    

});