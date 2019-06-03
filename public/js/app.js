var app = angular.module("myShoppingList", []); 
app.controller("myCtrl", function($scope,$http) {
    $scope.formData={};


    //-------Create/Add item-------
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
            console.log('Clicked submit ');
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


    //-------Read/Showing Data-------
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


    //-------Update/Edit item-------
    $scope.updateItem = function (x) {  //Edit btn function
      $scope.myAdd=false;
      $scope.myUpd=true;
      console.log("Edit btn working "+ x);
      var old;
      $scope.old=x;
    }
    $scope.updItem=function(){          //Update btn function
       console.log("Update btn working "+ $scope.old);
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
          $scope.errortext = "";    
          console.log('Clicked Update '+ $scope.addMe);
          $scope.formDataa = {
                    oldproductname: $scope.old, 
                    newproductname: $scope.addMe
                };
          console.log($scope.formDataa);
          $http.post('/api/updateValue', $scope.formDataa )
            .success(function(data) {
                $scope.lists = data; //assigning value from db(Server.js)
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: Updating');
            });
            $scope.showValues();
            $scope.addMe="";
            $scope.myAdd=true;
            $scope.myUpd=false;
        }
        else {
            $scope.errortext = "The item is already in your shopping list.";
            $scope.addMe="";
         }
  }

    
    //-------Delete/Remove item-------
    $scope.removeItem = function (x) {
        var result = confirm("Are you sure to delete?");
        if(result){
          $scope.errortext = "";    
          console.log('Clicked Remove'+ x);
          $scope.formData = { productname: x }; 
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
    }


    //-------Read/Showing Data via function call-------
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