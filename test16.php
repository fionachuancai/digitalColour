<html>

<script type="text/javascript" src="can_vas2.js"></script>

<script type="text/javascript">
window.onload = function() {    
  setSize();
  
}  
  

</script>

<body onresize="setSize()">
<!-- body onload="setup_first();"> -->
<br/>
<br/>
<br/>
<p id="debug"></p>
<p id="debug1"></p>
<p id="debug2"></p>
<p id="debug3"></p>
<br/>
<br/>
<br/>
	
	
	
Select card type
<select id="selectBox" onchange="changeFunc();">
   <option value=0>5" x 7"</option> 
   <option value=1>A5</option> 
   <option value=2>2</option> 
   <option value=3>3</option> 
   <option value=4>4</option> 
   <option value=5>5</option> 
   <option value=6>6</option> 
   <option value=7>7</option> 
</select>	

<div id="test">   
   <!-- <canvas id="canvas2" ></canvas>   -->
   <canvas id="canvas2" width="800" height="800" ></canvas>   
   
</div>


<img id="Image" src="./img/img-03.jpg" alt="Image" style="display: none;">




<script type="text/javascript">


</script>
<br/>
<button onclick="land_port()">Landscape/Portrait</button>
<button onclick="short_long()">Edge:short/Long</button>
<br/>
<br/>
Back of Card
<br/>



<input id="smallImage" name="smallImage" type="checkbox" onchange="addsmall();">
<label for="smallImage">Add small image</label>
<button onclick="img1_up()">Up</button>
<button onclick="img1_down()">Down</button>
<button onclick="img1_left()">Left</button>
<button onclick="img1_right()">Right</button>
<button onclick="img1_centre()">Centre</button>
<button onclick="img1_inc()">Bigger</button>
<button onclick="img1_dec()">Smaller</button>
<br/>
Text for back: <input type="text" name="text1" onchange="text1_func(this.value)">
<button onclick="text1_up()">Up</button>
<button onclick="text1_down()">Down</button>
<button onclick="text1_inc()">Bigger</button>
<button onclick="text1_dec()">Smaller</button>

<br/>
<br/>
<b>Front of card</b>
<br/>
Bleed on fold of card: <input type="number" name="spine_val" min="1" max="30" value="1" onchange="spine_val_func(this.value)">
mm
<br/>
<button onclick="fit_hori()">Fit Horizontally</button>
<button onclick="fit_vert()">Fit Vertical</button>
<button onclick="Mainpos_up()">Up</button>
<button onclick="Mainpos1_down()">Down</button>
<button onclick="Mainpos1_left()">Left</button>
<button onclick="Mainpos1_right()">Right</button>
<button onclick="Mainpos1_centre()">Centre</button>
<button onclick="Mainpos1_inc()">Bigger</button>
<button onclick="Mainpos1_dec()">Smaller</button>
What part of the image
<button onclick="Mainimg1_up()">Up</button>
<button onclick="Mainimg1_down()">Down</button>
<button onclick="Mainimg1_left()">Left</button>
<button onclick="Mainimg1_right()">Right</button>
<button onclick="Mainimg1_inc()">Bigger</button>
<button onclick="Mainimg1_dec()">Smaller</button>
<br/>
<br/>

 <form  method="post" name="myform" action="test_pdf.php">
     <input type="hidden" name="mytext" value="Content of the extra variable" >    
    <input type="submit" value="Make PDF" >
</form>


</body>   
</html>