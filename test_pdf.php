<?php
//============================================================+
// File name   : example_009.php
// Begin       : 2008-03-04
// Last Update : 2013-05-14
//
// Description : Example 009 for TCPDF class
//               Test Image
//
// Author: Nicola Asuni
//
// (c) Copyright:
//               Nicola Asuni
//               Tecnick.com LTD
//               www.tecnick.com
//               info@tecnick.com
//============================================================+

/**
 * Creates an example PDF TEST document using TCPDF
 * @package com.tecnick.tcpdf
 * @abstract TCPDF - Example: Test Image
 * @author Nicola Asuni
 * @since 2008-03-04
 */

// Include the main TCPDF library (search for installation path).
require_once('tcpdf_include.php');
ini_set("include_path", '/php:' . ini_get("include_path") );
//ini_set("include_path", '/home/dwjlewis/php:' . ini_get("include_path") );

$file = 'img/img-03.jpg';
$thumb = new Imagick($file);
$thumb->cropImage($_COOKIE['x_img_E'],$_COOKIE['y_img_E'],$_COOKIE['x_img_S'],$_COOKIE['y_img_S']);
$thumb->writeImage('img/img-03_crop.jpg');

// create new PDF document
//$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
$custom_layout = array($_COOKIE['real_cropped_height'], $_COOKIE['real_cropped_width']);
$pdf = new TCPDF("l", "mm", $custom_layout, true, 'UTF-8', false);
$pdf->SetPrintHeader(false);
$pdf->SetPrintFooter(false);



// set document information
//$pdf->SetCreator(PDF_CREATOR);
//$pdf->SetAuthor('Nicola Asuni');
if ( ! empty( $_COOKIE['title'] ) ) {
	$pdf->SetTitle($_COOKIE['title']);
} else {
	$pdf->SetTitle("not set");
}
//$pdf->SetSubject('TCPDF Tutorial');
//$pdf->SetKeywords('TCPDF, PDF, example, test, guide');

// set default header data
//$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE.' 009', PDF_HEADER_STRING);

// set header and footer fonts
//$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
//$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
//$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
//$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
//$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
$pdf->SetMargins(0, 0, 0);


// set auto page breaks
//$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
$pdf->SetAutoPageBreak(TRUE, 0);

// set image scale factor
//$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
	require_once(dirname(__FILE__).'/lang/eng.php');
	$pdf->setLanguageArray($l);
}

// -------------------------------------------------------------------

// add a page
$pdf->AddPage();

//$resolution= array(100, 100);
//$pdf->AddPage('P', $resolution);

// set JPEG quality
//$pdf->setJPEGQuality(75);

// Image method signature:
// Image($file, $x='', $y='', $w=0, $h=0, $type='', $link='', $align='', $resize=false, $dpi=300, $palign='', $ismask=false, $imgmask=false, $border=0, $fitbox=false, $hidden=false, $fitonpage=false)

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// Image example with resizing
$GC_x_start = 150;
$GC_x_leng = 166;
$imageLeftMM = $_COOKIE['x_pos_S'];
$imageTopMM = $_COOKIE['y_pos_S'];
$imageWidthMM = $_COOKIE['x_pos_E'];
$imageHeightMM = $_COOKIE['y_pos_E'];


$pdf->StartTransform();
//$pdf->Rect(0, 0, 600, 600, 'CNZ'); //Clipping mask (CNZ style makes your day)
$pdf->Image('img/img-03_crop.jpg', $imageLeftMM, $imageTopMM, $imageWidthMM, $imageHeightMM, 'JPG', 'http://www.digitalcolourservices.co.uk', '', false, 30, '', false, false, 1, false, false, false);
//$pdf->Image('img/img-03.jpg', 50, 20, 300, 400, '', true, '', false, 300);
//this would actually cut off a 50 units a in each direction.
$pdf->StopTransform();


//$pdf->Image('img/img-03.jpg', 50, 20, 75, 113, 'JPG', 'http://www.digitalcolourservices.co.uk', '', false, 150, '', false, false, 1, false, false, false);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


// corner crop marks

//$pdf->cropMark(8, 8, 8, 8, 'TL');
//$pdf->cropMark(308, 8, 8, 8, 'TR');
//$pdf->cropMark(8, 158, 8, 8, 'BL');
//$pdf->cropMark(308, 158, 8, 8, 'BR');


//Close and output PDF document
$pdf->Output('testpdf.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+

