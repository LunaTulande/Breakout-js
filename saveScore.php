<?php
/*Web server-side application which takes the player's score (time) from the game web side and puts it in the form which asks the player to save his/her score (time). 
*/
 $html = file_get_contents("SaveScore.html");
 $html = str_replace('---$score---', $_GET['time'], $html);
 echo $html;
?>