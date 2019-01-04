

function getOrders() {
    $.getJSON( "/api/orders", {
      format: "json"
    })
      .done(function( data ) {
          var items = "";
          $.each( data, function( user, userVal ) {
            
            let id = "";
            var hiddentUpdate = "";
            $.each( userVal, function( key, val ) {
                if(id==""){
                  id = val;
                  items+= "<div class='tr' id='StaticFields" + id + "'>";
                }
                items += "<span class='td'>" + val + "</span>";
             // items+= "<span class='td'><input type='text' value='"+val+"' name='"+key+"' class='form-control' placeholder='"+ key + "'></span>"
             
            });

          items += "<span class='td'><button type='button' class='btn btn-warning' onclick='ShowHidden(\""+id+"\")'>Edit order</button></span></div>";

          hiddentUpdate += "<div class='tr hidden' id='HiddenFields" + id + "'>";
          hiddentUpdate += "<span class='td'> <form action='/api/order/approve/"+ id +"' method='post'><button type='submit' class='btn btn-success'>Approve Order</button></form></span>";

          hiddentUpdate += "<span class='td'><form action='/api/order/delete/"+id+"' method='post'><button type='submit' class='btn btn-danger'>Delete order</button></form></span>";
          hiddentUpdate += "<span class='td'><button type='button' class='btn btn-light' onclick='Hide(\""+id+"\")'>Cancel</button></span></div>";
          items += hiddentUpdate;
          });
          $(".tbodyEmployee").append(items);
  });

}
function ShowHidden(id){
  console.log("visible " + id);
  document.getElementById("HiddenFields" + id).style.display = "table-row";  

}
function Hide(id){
  document.getElementById("HiddenFields" + id).style.display = "none";   
}