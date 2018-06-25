<?php
include_once ("db_link.php");

add_entry($_POST["inputDate"], $_POST['inputDuration'], $_POST['inputDistance']);

header('Location: http:/../index.php');

?>