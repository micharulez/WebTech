<?php
include_once ("php/db_link.php");
?>
<!DOCTYPE html>
<html>
<head>
    <title>Der Lauftracker</title>
    <meta charset="utf-8">

    <link rel="stylesheet" href="css/bootstrap.min.css"/>
  
    <!-- Logo: Silk Icons http://www.famfamfam.com/lab/icons/silk/ -->
    <link rel="icon" href="logo.png" type="image/png">

    <style>
        html {
            overflow-y: scroll;
        }
    </style>

    <script>
        var all_data = <?php echo json_encode([[10,20], [10,10], [55,72]]); ?>;
    </script>

    <script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/d3.v4.js"></script>
    <script type="text/javascript" src="js/mychart.js"></script>
</head>

<body>
<p><a href="index.php">Startseite</a></p>
<p>Statistik</p>

<h2>Scatterplot</h2>

<div class="container">
    <div class="row  justify-content-around">
        <div class="col-sm-12 col-md-8">
            
            <div id="chart_container">
                <svg class="border border-danger" preserveAspectRatio="xMinYMin" viewBox="0 0 500 500" id="chart"></svg>
            <div>
        </div>
    </div>
</div>
</body>
</html>