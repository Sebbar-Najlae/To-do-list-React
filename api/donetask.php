<?php
$id = $_POST["sid"];
$dbh = new PDO("mysql:host=localhost;dbname=tasks","root","");
$sql = "UPDATE todotoday SET done = :done WHERE idtasks = $id";
$addClassesQuery = $dbh->prepare($sql);
$addClassesQuery->bindParam(":done",$_POST["done"],PDO::PARAM_STR);
$addClassesQuery->execute();
?>