<?php
$dbh = new PDO("mysql:host=localhost;dbname=tasks","root","");
$sql = " INSERT INTO todotoday(taskname) VALUES (:taskname)";
$addTaskQuery = $dbh->prepare($sql);
$addTaskQuery->bindParam(":taskname",$_POST["taskname"],PDO::PARAM_STR);
// $addTaskQuery->bindParam(":taskdate",$_POST["taskdate"],PDO::PARAM_STR);
// $addTaskQuery->bindParam(":done",$_POST["done"],PDO::PARAM_STR);
$addTaskQuery->execute();
?>