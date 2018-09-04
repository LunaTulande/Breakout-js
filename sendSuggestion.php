<?php
/*Web server-side application which allows sending suggestions for improvement by an e-mail form from the web client. Once the user has sent the message, a copy of which was sent appears in response. In addition, at the end of all messages should also be a warning about this type of mail.
*/
 if(empty($_POST['fromEmail']) || empty($_POST['message'])) {
	echo "Message could not be sent. You must provide one sender email address and a message. The field 'From' and 'Message' are required!";
} else {
	$from = $_POST['fromEmail'];
	$to = "lutu6728@student.su.se";
	$subject = $_POST['subject'];
	$message = $_POST['message'] ."\n\nNote: This message is sent from a form on the Internet, and the sender may be inaccurate!";
		
	$headers = "From: " .$from;
	//control if the mail could be sent
	if(mail($to, $subject, $message, $headers)) {
		header("Content-type: text/plain");
		echo "This message has been sent:\n";
		$reply = "\nFrom: " .$from ."\nTo: " .$to;
		$reply .= "\nSubject: " .$subject ."\nMessage: " .$message;
		echo $reply;
	} else {
		echo ("Error sending message.");
	}
 }
?>