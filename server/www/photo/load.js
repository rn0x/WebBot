document.onreadystatechange = function () {
    var state = document.readyState
    if (state == 'complete') {
        setTimeout(function(){
            document.getElementById('interactive');
           document.getElementById('load').style.visibility="hidden";
        },1000);
    }
  }