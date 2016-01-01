<?php
    error_reporting(-1);
    ini_set('display_errors', 'On');
    set_error_handler("var_dump");

    $from = $_POST['email'];
    $name = $_POST['name'];

    $to = "alstonlin812@gmail.com";
    $subject = "alstonlin.io Contact";
    $message = $_POST['message'];
    $headers = "From: $from";

    $send = mail($to, $subject, $message, $headers);
    if($send){
        echo "<p class='success'>Your message has been sent!</p>";
     }
     else{
        echo "<p class='success'>The message could not been sent!</p>";
    }
?>