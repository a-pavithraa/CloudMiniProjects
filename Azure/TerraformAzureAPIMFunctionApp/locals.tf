locals {
  api_paths = [
    {
      url_path     = "/HotelLocations"
      operation_id = "get-hotel-location"
      method       = "GET"
      description  = "Get list of locations"
      jwtAuth      = true
      }, {
      url_path     = "/Hotels"
      operation_id = "get-hotels"
      method       = "GET"
      description  = "Get list of hotels"
      jwtAuth      = false
      }, {
      url_path     = "/HotelReviews"
      operation_id = "get-reviews"
      method       = "GET"
      description  = "Get list of reviews for the hotel"
      jwtAuth      = false
      }, {
      url_path     = "/HotelPhotos"
      operation_id = "get-photos"
      method       = "GET"
      description  = "Get list of photos for the hotel"
      jwtAuth      = false
      }, {
      url_path     = "/HotelFacilities"
      operation_id = "get-facilities"
      method       = "GET"
      description  = "Get list of Facilities for the selected hotel"
      jwtAuth      = false
    },
    {
      url_path     = "/HotelDescription"
      operation_id = "get-description"
      method       = "GET"
      description  = "Get hotel Description"
      jwtAuth      = false
    },
    {
      url_path     = "/FavoriteHotels"
      operation_id = "get-favhotels"
      method       = "GET"
      description  = "Get Bookmarked Props"
      jwtAuth      = false
    },
    {
      url_path     = "/FavoriteHotels"
      operation_id = "post-favhotels"
      method       = "POST"
      description  = "Bookmark a property"
      jwtAuth      = false
    }
  ]


}