function getBathValue(){
    var uiBath = document.getElementsByName('uiBath');
    for(var i in uiBath){
        if(uiBath[i].checked){
            return parseInt(i)+1;
        }
    }
    return -1; //Invalid value
}

function getBedroomsValue(){
    var uiBedrooms = document.getElementsByName('uiBedrooms');
    for(var i in uiBedrooms){
        if(uiBedrooms[i].checked){
            return parseInt(i) + 1;
        }
    }
    return -1; // Invalid value
}

function onClickedEstimatePrice(){
    console.log('Estimate Price button Clicked');
    var sqft = document.getElementById("uiSqft");
    var bedrooms = getBedroomsValue()
    var bath = getBathValue()
    var location = document.getElementById('uiLocations')
    
    var url = "http://127.0.0.1:5000/predict_home_price"
    $.post(url,{
        total_sqft: parseFloat(sqft.value),
        bedrooms: bedrooms,
        bath:bath,
        location:location.value
    },function(data,status){
        console.log("for these parameter: ",sqft.value,bedrooms,bath,location.value);
        console.log("Estimated price: ",data.estimated_price);
        estPrice.innerHTML = "<h2>"+data.estimated_price.toString() + " Lakh<h2>";
        console.log(status);
    });
    var estPrice = document.getElementById('uiEstimatedPrice')

}

function onPageLoad() {
    console.log( "document loaded" );
    var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
    // var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
  }
  
  window.onload = onPageLoad;