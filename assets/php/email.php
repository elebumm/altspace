<?php
mb_internal_encoding("UTF-8");

$to = 'email@example.com';
$subject = 'Message from Propper';

$name = "";
$email = "";
$phone = "";
$message = "";

if( isset($_POST['name']) ){
    $name = $_POST['name'];
    //echo $name;

    $body .= "Name: ";
    $body .= $name;
    $body .= "\n\n";
}
if( isset($_POST['email']) ){
    $email = $_POST['email'];
    //echo $email;

    $body .= "";
    $body .= "Email: ";
    $body .= $email;
    $body .= "\n\n";
}
if( isset($_POST['phone']) ){
    $phone = $_POST['phone'];
    //echo $phone;

    $body .= "";
    $body .= "Phone: ";
    $body .= $phone;
    $body .= "\n\n";
}
if( isset($_POST['message']) ){
    $message = $_POST['message'];
    //echo $message;

    $body .= "";
    $body .= "Message: ";
    $body .= $message;
    $body .= "\n\n";
}

$headers = 'From: ' .$email . "\r\n";

if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
mb_send_mail($to, $subject, $body, $headers);
    echo '<div class="status-icon valid"><i class="icon_check"></i></div>';
}
else{
    echo '<div class="status-icon invalid"><i class="icon_close"></i></div>';
}
