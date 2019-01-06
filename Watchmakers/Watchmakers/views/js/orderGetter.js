

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
                if(key!= "__v")
                  items += "<span class='td'>" + val + "</span>";
             
            });

          items += "<span class='td'><button type='button' class='btn btn-warning' onclick='ShowHidden(\""+id+"\")'>Edit</button></span></div>";

          hiddentUpdate += "<div class='tr hidden' id='HiddenFields" + id + "'>";

          hiddentUpdate += "<span class='td'> <form action='/api/order/approve/"+ id +"' method='post'><button type='submit' class='btn btn-success'>Approve</button></form></span>";
          hiddentUpdate += "<span class='td'> <form action='/api/order/ready/"+ id +"' method='post'><button type='submit' class='btn btn-success'>Ready</button></form></span>";
          hiddentUpdate += "<span class='td'> <form action='/api/order/complete/"+ id +"' method='post'><button type='submit' class='btn btn-success'>Complete</button></form></span>";
          hiddentUpdate += "<span class='td'> <form action='/api/order/cancel/"+ id +"' method='post'><button type='submit' class='btn btn-warning'>Cancel</button></form></span>";

          hiddentUpdate += "<span class='td'><form action='/api/order/delete/"+id+"' method='post'><button type='submit' class='btn btn-danger'>Delete</button></form></span>";
          hiddentUpdate += "<span class='td'><button type='button' class='btn btn-light' onclick='Hide(\""+id+"\")'>Cancel edit</button></span></div>";
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