locals {
  dynamodb_table_name = "BookmarkedHotels"
  lambda_list = [
    {

      function_name = "Hotel_Location"
      file_name     = "LocationFn"
      route         = "/HotelLocations"
      method        = "GET"
      dynamodbAccess =false

    },
    {
      function_name = "Hotel_Search"
      file_name     = "SearchFn"
      route         = "/Hotels"
      method        = "GET"
      dynamodbAccess =false
    },
    {
      function_name = "Hotel_Description"
      file_name     = "DescriptionFn"
      route         = "/HotelDescription"
      method        = "GET"
      dynamodbAccess =false
    },
    {
      function_name = "Hotel_Facilties"
      file_name     = "FacilitiesFn"
      route         = "/HotelFacilities"
      method        = "GET"
      dynamodbAccess =false
    },
    {
      function_name = "Hotel_Reviews"
      file_name     = "ReviewsFn"
      route         = "/HotelReviews"
      method        = "GET"
      dynamodbAccess =false
    },
     {
      function_name = "Hotel_Data"
      file_name     = "HotelDataFn"
      route         = "/HotelData"
      method        = "GET"
      dynamodbAccess =false
    },
    {
      function_name = "Hotel_Photos"
      file_name     = "PhotosFn"
      route         = "/HotelPhotos"
      method        = "GET"
      dynamodbAccess =false
  }]
  authenticated_lambda_list = [{

    function_name = "Fav_Hotels"
    file_name     = "FavHotelsFn"
    route         = "/FavoriteHotels"
    method        = "GET"
    dynamodbAccess =true

    },
    {
      function_name = "Fav_Hotels_Post"
      file_name     = "PostFavHotelsFn"
      route         = "/FavoriteHotels"
      method        = "POST"
       dynamodbAccess =true
  }]

  combined_lambdas_list=flatten([local.lambda_list,local.authenticated_lambda_list])
}