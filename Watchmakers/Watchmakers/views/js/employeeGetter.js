

function getEmployees() {
      $.getJSON( "/api/employees", {
        format: "json"
      })
        .done(function( data ) {
            var items = "";
            $.each( data, function( user, userVal ) {
              items+= "<tr id='" + user + "'>";
              let id = "";
              $.each( userVal, function( key, val ) {
                  if(id=="")
                    id = val;
                items += "<td id='" + key + "'>" + val + "</td>";
              });
            let button = "<td> <form action='/api/employee/delete/"+ id +"' method='post'>";
            button += "<button type='submit' class='btn btn-danger'>Delete User</button>";
            button += "</form></td></tr>"
            items += button + "</tr>";
            });

            $(".tbodyEmployee").empty();
            $(".tbodyEmployee").append(items);
    });

}