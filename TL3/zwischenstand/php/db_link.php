<?php
// database connection information
$db_host = "localhost";
$db_name = "BornToRun";
$db_user = "root";
$db_password = "";

$db_table = "Runs";

// establish database connection
$db_link = mysqli_connect($db_host, $db_user, $db_password) or die('Verbindung nicht möglich : ' . mysqli_connect_error());

// create database
$create_database_sql = "CREATE DATABASE IF NOT EXISTS " . $db_name;
mysqli_query($db_link, $create_database_sql) or die('Erstellen der Datenbank nicht möglich : ' . mysqli_error($db_link));
mysqli_select_db($db_link, $db_name) or die('Benutzung der Datenbank '. $db_name . ' nicht möglich: ' . mysqli_error($db_link)); 


function get_all_entries() {
    global $db_link, $db_table;

    $get_all_entries = "SELECT * FROM `" . $db_table . "` ORDER BY Datum DESC";
  
    $entries = mysqli_query($db_link, $get_all_entries) or die('Holen aller Datensätze nicht möglich : ' . mysqli_error($db_link));
    return $entries;
    
}

function add_entry($input_date, $input_duration, $input_distance) {
    global $db_link, $db_table;

    $add_table_entry = "INSERT INTO `" . $db_table . 
    "` (Datum, Dauer, Distanz)
    VALUES (
    '" . $input_date . "',
    " . $input_duration . ",
    " . $input_distance . "
    )";
  
    mysqli_query($db_link, $add_table_entry) or die('Einfügen des Datensatzes nicht möglich : ' . mysqli_error($db_link));
}

function delete_entry($entry_id) {
    global $db_link, $db_table;

    $delete_entry = "DELETE FROM `" . $db_table . "`
    WHERE ID = " . $entry_id . " ";
  
    mysqli_query($db_link, $delete_entry) or die('Entfernen des Datensatzes nicht möglich : ' . mysqli_error($db_link));
}

function ensure_table_exists() {
    global $db_link, $db_table;

    $create_run_table = "CREATE TABLE IF NOT EXISTS `" . $db_table . "`
    (ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Datum DATE NOT NULL,
    Dauer INT NOT NULL,    
    Distanz FLOAT NOT NULL
    )";
  
    mysqli_query($db_link, $create_run_table) or die('Erstellen der Datenbanktabelle nicht möglich : ' . mysqli_error($db_link));
}

function reset_table() {
    global $db_link, $db_table;

    $reset_table = "TRUNCATE `" . $db_table . "` ";
  
    mysqli_query($db_link, $reset_table) or die('Zurücksetzen der Tabelle nicht möglich : ' . mysqli_error($db_link));
}

?>