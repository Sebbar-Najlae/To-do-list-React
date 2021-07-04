<?php
    $id = $_POST["sid"];
    $dbh = new PDO("mysql:host=localhost;dbname=tasks", "root", "");
    $sql = "DELETE FROM todotoday WHERE idtasks = $id";
    $getClasse = $dbh->prepare($sql) ;
    $getClasse->execute();
    ?>