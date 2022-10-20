<?php

require_once '../../../config.php';

$action = $_GET['action'];
$res = [];
$res['success'] = false;
switch($action) {
    case 'send':
        $data = $_GET['args'];
        if(empty($data['text'])) {
            $res['message'] = 'Fill comment text input';
            break;
        }
        $query = "INSERT INTO comments (userID, commentText, articleID) VALUES('".$data['userID']."', '".$data['text']."', '".$data['articleID']."')";
  	    mysqli_query($db, $query);
        $res['success'] = true;
        break;
    
    case 'getComments':
        $data = $_GET['args'];
        var_dump($data['articleID']);
        if($data['articleID'] < 0) {
            $res['message'] = 'Article was not found!';
            break;
        }
        $getcom = "SELECT * FROM comments WHERE articleID='".$data['articleID']."' LIMIT 100";
        $result = mysqli_query($db, $getcom);
        $comments = mysqli_fetch_assoc($result);
        foreach($comments as $c) {
            array_push($res['comments'], $c['commentText']);
        }
        break;
}

echo json_encode($res);