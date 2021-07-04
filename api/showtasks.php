<?php
$dbh = new PDO("mysql:host=localhost;dbname=tasks","root","");
$sql = " SELECT * FROM todotoday ";
$TaskQuery = $dbh->query($sql);
$getTask = $TaskQuery->fetchAll(PDO::FETCH_ASSOC);
print_r(json_encode($getTask));
?>