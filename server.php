<?php

ob_start();
var_dump(file_get_contents('php://input'));
error_log(ob_get_clean(), 4);
