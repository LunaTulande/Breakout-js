<?php
/*Web server-side application which shows data from a data base with previosly saved players' scores (time). The scores and name of the players show in another client side.
*/
//Variables of database
 $servName = "localhost";
 $dbName = "breakout";
 //Connection with database creates
 $connect = mysqli_connect($servName, "root", "", $dbName);
 //Connection checks
 if (mysqli_connect_error()) {
    die("Connection failed: " .mysqli_connect_error());
 }
  
 //Show all scores in another client side
 $sql = "SELECT Name,Score FROM Score ORDER BY Score";
 $result = mysqli_query($connect, $sql);
 
 $html = file_get_contents("Scores.html");
 $html_pieces = explode("<!--===xxx===-->", $html);
 echo $html_pieces[0];

 if (mysqli_num_rows($result) > 0) {
    //Data of each row
    while($row = mysqli_fetch_assoc($result)) {
		$temp = $html_pieces[1];
		$temp = str_replace('---$name---', $row["Name"], $temp);
		$temp = str_replace('---$score---', $row["Score"], $temp);
	echo $temp;
    }
 } else {
    echo "0 results";
 }
 echo $html_pieces[2];
 //Connection closes
 mysqli_close($connect);
?>