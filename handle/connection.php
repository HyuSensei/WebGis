<?php
define('PG_DB', "Db_Bus_Stop"); //cần thay
define('PG_HOST', "localhost"); //cần thay
define('PG_USER', "postgres"); //cần thay
define('PG_PORT', "5432"); // cần thay
define('PG_PASS', "huyphan2002"); // cần thay

#extension = pgsql
#bat config trong apache php.ini

$conn = pg_connect("dbname=" . PG_DB . " password=" . PG_PASS . " host=" . PG_HOST . " user=" . PG_USER . " port=" . PG_PORT);

if (!$conn) {
    echo "conectj xit";
}

//var_dump($conn)
// $conn = pg_connect("dbname = password= host= port =)