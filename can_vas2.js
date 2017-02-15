debug=0;
title = "Digital Colour Services ";
card_select =0;

// set care size - move this to a database later
var card_size = [];
card_size[0] = ['5" x 7"',127,178,5,4];
card_size[1] = ['A5',148,210];
card_size[2] = ['DL',99,210];
card_size[3] = ['A6',105,148];
card_size[4] = ['150mm Square',150,150];
card_size[5] = ['145mm Square',145,145];
card_size[6] = ['125mm Square',125,125];
card_size[7] = ['100mm Square',100,100];
	
//change to an array	
var x_start = 0;
var y_start = 0;
var x_end = 300;
var y_end = 300;
var x_pos = 0;
var y_pos =0;
var ratio = 1;
var c_size = 3;
var text1_Hei = 0.05;
var text1_Hpos = 0.8;
var y_space_per=0;
var x_space_per=0;
var small_image = 0;
var text1= "";
var small_size = 0.2;
var image_y_pos = 0;
var image_x_pos = 0;
var xps_per = 0;
var xpe_per = 0;
var yps_per = 0;
var ype_per = 0;
var xis_per = 0;
var xie_per = 0;
var yis_per = 0;
var yie_per = 0;
var portrait = 1;
var longEdge = 1;


var bleed_per = 0.01; 
var real_bleed = 3; //3mm bleed in real world 
var real_spine_bleed = 1; //1mm bleed on spine - the user able to change this
var bleed = 10;

var real_height = 150; //start with 150
var real_width = 150;

var card_width = 300; // no idea why I picked 300
var card_height = 300;

var magins = 20;
var canvas_width = card_width + card_width + bleed;
var canvas_height = card_height + bleed + bleed;

function setSize() {
    
	

	JS_selectBox = document.getElementById("selectBox");
	for (iterator = 0; iterator < card_size.length; iterator++) {
                JS_selectBox.options[iterator].text = card_size[iterator][0];
                //JS_selectBox.options[iterator].value = card_size[iterator][0];
	}	
	
    //var w = window.outerWidth;
	w = 800;
    var h = window.outerHeight;
	
	//debug **
	if (debug) {
		var txt = "Window size: width=" + w + ", height=" + h + "(" + ratio + ")";
		//var txt = "Window size: width=" + w + ", height=" + h + "(" + ")";
		document.getElementById("debug").innerHTML = txt;    
	} // end debug
	
	//if mobile then size=2?

	
	//if screen is portrait then take away margins
	if (h > w) {
		card_width = (w/2)-(w*0.03);
	} else {
		card_width = (w/c_size)-magins;
	}
	
	
	//card height will depend on version of card i.e. 5 x 7, A5
    card_height = card_width * ratio;
	
		
	// work out bleed as percentage then multiple by current bleed or spine bleed	
	if (longEdge) {
		bleed = card_width * (real_bleed/real_width); 		
		spine_bleed = card_width * (real_spine_bleed/real_width); 
		bleed_per= (real_bleed/real_width);
	} else {
		bleed = card_width * (real_bleed/real_height); 		
		spine_bleed = card_width * (real_spine_bleed/real_height); 
		bleed_per= (real_bleed/real_width);
	}
	
	
	// Change the sharp of the canvas if long or short edge fold
	if (portrait) {
		var canvas_width = card_width + card_width + bleed;
		var canvas_height = card_height + bleed + bleed;				
	} else {
		var canvas_width = card_width + bleed + bleed;
		var canvas_height = card_height + card_height + bleed;
	}
	
	// ** dedug **
	if (debug) {
		var txt = "canvas_width=" + canvas_width + " ; canvas_width=" + canvas_width + " ; card_width=" + card_width + " ; card_height=" + card_height + "bleed=" + bleed + " ; " + "spine_bleed=" + spine_bleed + " ; bleed_per= " + bleed_per;
		//var txt = "Window size: width=" + w + ", height=" + h + "(" + ")";
		document.getElementById("debug1").innerHTML = txt;
	} // end debug
	
	document.getElementById('test').style.height = canvas_height + "px";
    document.getElementById('test').style.width = canvas_width + "px";	 
    document.getElementById('test').style.margin = "auto";
	
	var canvas_size=document.getElementById("canvas2");
	canvas_size.width  = canvas_width;
    canvas_size.height = canvas_height;
	
	
	var canvas1=document.getElementById("canvas2");
	var ctx=canvas1.getContext("2d");
	ctx.clearRect(0,0,canvas_width,canvas_height);
	var img1=document.getElementById("Image");   
	image_width = img1.width;
	image_height = img1.height;
	
  
	if (portrait) {
		var imagesize_wid = card_width + bleed + spine_bleed;
		var imagesize_hei = card_height + bleed + bleed;		
	} else {
		var imagesize_wid = card_width + bleed + bleed;
		var imagesize_hei = card_height + bleed + spine_bleed;			
	}    
  
	y_space=y_space_per * imagesize_hei;
	x_space=x_space_per * imagesize_wid;

	x_img_S =x_start+(imagesize_wid*xis_per);
	y_img_S =y_start+(imagesize_wid*xis_per)
	x_img_E =x_end+(imagesize_wid*xie_per);
	y_img_E =y_end+(imagesize_hei*yie_per);

	if (portrait) {
	  x_pos_S =(card_width-spine_bleed)+x_space+(imagesize_wid*xps_per);
	  y_pos_S =y_space+(imagesize_wid*xps_per);
	  x_pos_E =imagesize_wid+(imagesize_wid*xpe_per);;
	  y_pos_E =imagesize_hei+(imagesize_hei*ype_per);
	} else {
	  x_pos_S =x_space+(imagesize_wid*xps_per);
	  y_pos_S =y_space+(imagesize_wid*xps_per);
	  x_pos_E =imagesize_wid+(imagesize_wid*xpe_per);;
	  y_pos_E =imagesize_hei+(imagesize_hei*ype_per);  
	}

	
	//work out the size of the actual real cards in mm
	if (longEdge) {
		real_page_height=card_size[card_select][2];
		real_page_width=card_size[card_select][1];
	} else {
		real_page_height=card_size[card_select][1];
		real_page_width=card_size[card_select][2];
	}
	
	if (portrait) {
		real_cropped_height=real_page_height;
		real_cropped_width=(real_page_width*2);
	} else {
		real_cropped_height=(real_page_height*2);
		real_cropped_width=real_page_width;
	}

	ctx.drawImage(img1,x_img_S,y_img_S,x_img_E,y_img_E,x_pos_S,y_pos_S,x_pos_E,y_pos_E);
	
	// debug **
	if (debug) {
		txt = "; 2 = " +x_img_S + "; 3 = " +y_img_S + "; 4 = " +x_img_E + "; 5 = " +y_img_E + "; 6 = " +x_pos_S + "; 7 = " +y_pos_S + "; 8 = " +x_pos_E + "; 9 = " +y_pos_E;
		document.getElementById("debug2").innerHTML = txt;
	} // end debug
	
	//send cookies to pdf creater
	document.cookie = "title=" + title;
	document.cookie = "real_cropped_height=" + real_cropped_height;
	document.cookie = "real_cropped_width=" + real_cropped_width;
	document.cookie = "x_img_S="+x_img_S;
	document.cookie = "y_img_S="+y_img_S;
	document.cookie = "x_img_E="+x_img_E;
	document.cookie = "y_img_E="+y_img_E;
	
	//convert pos into mm	
	document.cookie = "x_pos_S="+(x_pos_S/canvas_width)*real_cropped_width;
	document.cookie = "y_pos_S="+(y_pos_S/canvas_height)*real_cropped_height;
	document.cookie = "x_pos_E="+(x_pos_E/canvas_width)*real_cropped_width;
	document.cookie = "y_pos_E="+(y_pos_E/canvas_height)*real_cropped_height;
	
	//var TestSession = "Test Session";
    //'<%Session["TestSession"] = "' + TestSession + '"; %>';
  
  
  var canvas2 = document.getElementById('canvas2');
  var context = canvas2.getContext('2d');

  if (portrait) {
		context.beginPath();
		context.rect(0, bleed, card_width, card_height);  
		context.lineWidth = 0.5;
		context.strokeStyle = 'black';
		context.stroke();

		context.beginPath();
		context.rect(card_width, bleed, card_width, card_height);  
		context.setLineDash([15, 5]);
		context.lineWidth = 0.8;
		context.strokeStyle = 'black';
		context.stroke();
	} else {
		context.beginPath();
		context.rect(bleed, (card_height + bleed), card_width, card_height);  
		context.lineWidth = 0.5;
		context.strokeStyle = 'black';
		context.stroke();
	
		context.beginPath();
		context.rect(bleed, bleed, card_width, card_height);  
		context.setLineDash([15, 5]);
		context.lineWidth = 0.8;
		context.strokeStyle = 'black';
		context.stroke();	
	
	}

	  
  if (small_image) {
	  var canvas3=document.getElementById("canvas2");
	  var ctx2=canvas3.getContext("2d");
	  var img2=document.getElementById("Image"); 
	  // 20% size	 
	  small_width = card_width * small_size;
	  small_height = card_height * small_size;
	  ctx2.drawImage(img2,x_start,y_start,x_end,y_end,((card_width-small_width)/2)+(x_space*small_size)+(small_width*image_x_pos),((card_height-small_height)/2)+(y_space*small_size)+(image_y_pos*small_height),small_width,small_height);	
  }
  
  if (text1 > "") {
	  var canvas4=document.getElementById("canvas2");
	  var ctx4=canvas4.getContext("2d");
	  
	  ctx4.textAlign="center"; 
	  ctx4.font= (card_width*text1_Hei) + "px Georgia";
	  ctx4.fillText(text1,(card_width/2),(card_height*text1_Hpos));
  }
  
	
}

function fit_hori() {    
	xps_per = 0;
    xpe_per = 0;
    yps_per = 0;
    ype_per = 0;
    xis_per = 0;
    xie_per = 0;
    yis_per = 0;
    yie_per = 0;
	
	x_end = image_width;
	y_end = image_width * ratio;
	if (y_end > image_height) {
		//image is not large enough to fill the canvas, look how big the space is left, divide that by two and to work out the space above. Then work that space out as a percentage of the image.
		
		y_space_per = (((y_end - image_height)/2)/y_end);
		
	} 
	setSize();	
}

function fit_vert(){
    
	xps_per = 0;
    xpe_per = 0;
    yps_per = 0;
    ype_per = 0;
    xis_per = 0;
    xie_per = 0;
    yis_per = 0;
    yie_per = 0;
	
	y_space_per=0;
	x_end = image_height / ratio;
	y_end = image_height ;
	if (y_end > image_height) {
		//image is not large enough to fill the canvas, look how big the space is left, divide that by two and to work out the space above. Then work that space out as a percentage of the image.
		
		x_space_per = (((x_end - image_width)/2)/x_end);
		
	} 	
	setSize();	
}

function land_port() {
	if (portrait) {
		portrait = 0;
	} else {
		portrait = 1;
	}	
	short_long();	
}


function short_long() {
	if (longEdge) {
		longEdge = 0;
	} else {
		longEdge = 1;
	}
	changeFunc();	
}


function changeFunc() {
	var selectBox = document.getElementById("selectBox");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;   	
	
	if (longEdge) {
		real_height = card_size[selectedValue][1];
	    real_width = card_size[selectedValue][2];		
	} else {
		real_height = card_size[selectedValue][2];
	    real_width = card_size[selectedValue][1];
	}
    ratio = real_width/real_height;
	title = "Digital Colour Services " + card_size[selectedValue][0]; "digital proof";
	card_select = selectedValue;
	
	//debug ***
	if (debug) {
		var txt1 = selectedValue + " width=" + card_size[selectedValue][2] + ", height=" + card_size[selectedValue][1] + "(" + ratio + ")"; 
		//var txt = "Window size: width=" + w + ", height=" + h + "(" + ")";
		//document.getElementById("debug3").innerHTML = txt1;
	} //end debug ***

	if (ratio < 1) {		
		c_size = 3;
	} else {
		if (ratio < 2) {		
			c_size = 4;
		} else {		
			c_size = 5;
		}
	}	
	
	x_end = y_end / ratio;	 
	setSize();	
	//fit_vert();
}

function addsmall() {
	if (document.getElementById('smallImage').checked){
          small_image = 1;
	} else {
		small_image = 0;
	}
	setSize();	
}

function text1_func(val) {
	text1 = val;	
	setSize();	
}

function spine_val_func(val) {
	real_spine_bleed= val;	
	setSize();	
}


function text1_up() {
	text1_Hpos = text1_Hpos - 0.005;
	setSize();	
}	

function text1_down() {
	text1_Hpos = text1_Hpos + 0.005;
	setSize();	
}

function text1_inc() {
	text1_Hei = text1_Hei + 0.005;
	setSize();	
}	

function text1_dec() {
	text1_Hei = text1_Hei - 0.005;
	setSize();	
}	

function img1_up() {
	image_y_pos = image_y_pos - 0.05;
	setSize();	
}	

function img1_down() {
	image_y_pos = image_y_pos + 0.05;
	setSize();	
}	

function img1_left() {
	image_x_pos = image_x_pos - 0.05;
	setSize();	
}	

function img1_right() {
	image_x_pos = image_x_pos + 0.05;
	setSize();	
}	

function img1_centre() {
	image_x_pos = 0;
	image_y_pos = 0;
	setSize();	
}	

function img1_inc() {
	small_size +=  0.01;
	setSize();	
}

function img1_dec() {
	small_size -=  0.01;
	setSize();	
}	

function Mainimg1_up() {
	yis_per +=  0.01;
	yie_per +=  0.01;
	setSize();	
}	

function Mainimg1_down() {
	yis_per -= 0.01;
	yie_per -= 0.01;
	setSize();	
}	

function Mainimg1_left() {
	xis_per +=  0.01;
	xie_per +=  0.01;
	setSize();	
}	

function Mainimg1_right() {
	xis_per -= 0.01;
	xie_per -= 0.01;
	setSize();	
}	

function Mainimg1_inc() {
	xis_per += 0.01;
	xie_per -= 0.01;
	yis_per += 0.01;
	yie_per -= 0.01;
	setSize();	
}

function Mainimg1_dec() {
	xis_per -= 0.01;
	xie_per += 0.01;
	yis_per -= 0.01;
	yie_per += 0.01;
	setSize();	
}	


//end of image changes
//start of image position

function Mainpos1_up() {
	yps_per = yps_per - 0.01;
	ype_per = ype_per - 0.01;
	setSize();	
}	

function Mainpos1_down() {
	yps_per = yps_per + 0.01;
	ype_per = ype_per + 0.01;
	setSize();	
}	

function Mainpos1_left() {
	xps_per = xps_per + 0.01;
	xpe_per = xpe_per + 0.01;
	setSize();	
}	

function Mainpos1_right() {
	xps_per = xps_per - 0.01;
	xpe_per = xpe_per - 0.01;
	setSize();	
}	


function Mainpos1_centre() {
	
	setSize();	
}	

function Mainpos1_inc() {
	xps_per += 0.01;
	xpe_per -= 0.01;
	yps_per += 0.01;
	ype_per -= 0.01;
	setSize();	
}

function Mainpos1_dec() {
	xps_per -= 0.01;
	xpe_per += 0.01;
	yps_per -= 0.01;
	ype_per += 0.01;
	setSize();	
}


