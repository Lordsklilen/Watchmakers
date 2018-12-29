

function getEmployees() {
      $.getJSON( "/api/employees", {
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
                    items+= "<form class='tr' id='StaticFields" + id + "'>";
                    hiddentUpdate+= "<form class='tr hidden' action='/api/employee/update/"+id+"' method='post' id='HiddenFields" + id + "'>";
                  }
                items += "<span class='td'>" + val + "</span>";
                if(key!="password")
                    hiddentUpdate+= "<span class='td'><input type='text' value='"+val+"' name='"+key+"' class='form-control' placeholder='"+ key + "'></span>"
                else 
                    hiddentUpdate+= "<span class='td'><input type='password' value='"+val+"' name='password' class='form-control' placeholder='Password'></span>";
              });
            items += "<span class='td'> <form action='/api/employee/delete/"+ id +"' method='post'>";
            items += "<button type='submit' class='btn btn-danger'>Delete User</button>";
            items += "</span>"
            items += "<span class='td'><button type='button' class='btn btn-warning' onclick='ShowHidden(\""+id+"\")'>Update User</button></span></form>";

            hiddentUpdate += "<span class='td'><button type='submit' class='btn btn-warning'>Edit User</button></span>";
            hiddentUpdate += "<span class='td'><button type='button' class='btn btn-light' onclick='Hide(\""+id+"\")'>Cancel</button></span>";
            hiddentUpdate+="</form>";
            items += hiddentUpdate;
            });
            $(".tbodyEmployee").append(items);
    });

}
function ShowHidden(id){
    console.log("visible" + id);
    document.getElementById("HiddenFields" + id).style.display = "table-row";  
    document.getElementById("HiddenFields" + id).style.width = w;

}
function Hide(id){
    document.getElementById("HiddenFields" + id).style.display = "none";   
}