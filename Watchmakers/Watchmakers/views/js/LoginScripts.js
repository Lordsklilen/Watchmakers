function sendData(){
    $.ajax({
        url:'/loginCheck',
        type:'post',
        data: {
            Login: document.getElementById("LoginField").value,
            Password: document.getElementById("PasswordField").value
            
    },
        success:function(response){
            console.log(JSON.stringify(response));
            //sessionStorage.setItem("Authorization", 'Token ' + response.token);  
            $.ajax({
                url:'/auth',
                type:'get',
                headers:{
                    Authorization: 'Token ' + response.token
                }
            });          
        }
        
    });

}