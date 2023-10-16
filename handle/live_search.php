<?php
include('connection.php');
// Lấy giá trị tìm kiếm từ trường nhập liệu
$searchName = $_GET['name'];

// Xây dựng truy vấn tìm kiếm
$query = "SELECT ST_X(geom) AS longitude, ST_Y(geom) AS latitude, name FROM points WHERE name LIKE '%$searchName%' AND type='bus_stop'";

// Thực thi truy vấn
$result = pg_query($conn, $query);

if (!$result) {
    echo json_encode(['error' => 'Lỗi khi tìm kiếm']);
    exit();
}

// Xử lý kết quả tìm kiếm
$results = [];
while ($row = pg_fetch_assoc($result)) {
    $results[] = $row;
}
echo json_encode($results);
