//A function to submit a new asset to the REST endpoint
function submitNewAsset(){
//Construct JSON Object for new item
    var subObj = {
        AssetLabel: $('#AssetLabel').val(),
        Cost: $('#Cost').val(),
        AssetType: $('#AssetType').val(),
        NameOfOwner: $('#NameOfOwner').val(),
        AddressLine1: $('#AddressLine1').val(),
        AddressLine2: $('#AddressLine2').val(),
        Note: $('#Note').val()
    }
//Convert to a JSON String
    subObj = JSON.stringify(subObj);
//Post the JSON string to the endpoint, note the need to set the content type header
    $.post({
        url: CIAURI,
        data: subObj,
        contentType: 'application/json; charset=utf-8'
    }).done(function (response) {
        getAssetList();
    });
}