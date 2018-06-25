<?php
include_once ("db_link.php");

delete_entry($_POST['value']);

header('Location: http:/../index.php');

?>