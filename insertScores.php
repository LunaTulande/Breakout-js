<?php
/*Web server-side application which allows insert data into a data base to save the player's scores (time) from a form showed to the player. The insert is done by a prepared and bind statement which allows safely inserts (prevent to run sql-code from the insertion -SQL-injection-)  
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
 
 if(empty($_POST['name'])){
	 echo "Name can not miss!";
	 header("Refresh:1; url=http://localhost/Test/prov/saveScore.php?time=".$_POST['score']);
 } else {
	//Insert by create the prepared statement
	if ($stmt = mysqli_prepare($connect, "INSERT INTO Score (Name, Score) VALUES (?, ?)"))
	{
		//Parameters from form
		$name = $_POST['name'];
		$score = $_POST['score'];
		//Bind parameters
		mysqli_stmt_bind_param($stmt, "ss", $name, $score);
		//statement executes
		mysqli_stmt_execute($stmt);
		//statement closes
		mysqli_stmt_close($stmt);
	} else {
		echo "Insert failed!";
	}
	//Show all scores in another side
	$php = file_get_contents("http://localhost/Test/prov/scores.php");
	echo $php;
 }
 //Connection closes
 mysqli_close($connect);
?>