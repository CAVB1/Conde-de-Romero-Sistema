fetch('../db/apis/check_login.php')
.then(repsonse=>repsonse.json())
.then(data=>{
    if(data.nivel==="1"){
        console.log("aña");
        return;
    }else if(data.nivel=="2"){
        window.location.href="../index.html";
    }else if(data.nivel=="3"){
        window.location.href="../index.html";
    }
})
.catch(error=>{
    window.location.href="../index.html";
});