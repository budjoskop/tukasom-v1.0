$(document).ready(function() 
{    $("#check").click(function() {                

if (!$("input[@name=q1]:checked").val()            
           
) {            
alert("You're not done yet!");        
}        

else {            
  
  function eraseText() {
    document.getElementById("check").value = "";
}                        
            
// ovde se menja kviz

var cat1 = ($("input[@name=q1]:checked").val() != "a"); 
var cat2 = ($("input[@name=q1]:checked").val() == "a");           

if (cat1) { $("#false").show("slow");$("#true").hide("slow"); };   
if (cat2) { $("#true").show("slow"); $("#false").hide("slow"); };                         

{ $("#closing").show("slow"); };
}
    });});