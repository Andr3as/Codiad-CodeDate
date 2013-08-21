<?php
/*
 * Copyright (c) Codiad & Andr3as, distributed
 * as-is and without warranty under the MIT License. 
 * See [root]/license.md for more information. This information must remain intact.
 */

    require_once('../../common.php');
    
    checkSession();
    error_reporting(0);
        
    switch($_GET['action']) {
        
        case 'saveSettings':
            if (isset($_POST['settings'])) {
                $result = file_put_contents("settings.json", $_POST['settings']);
                if ($result === false) {
                    echo '{"status":"error","message":"Failed to save settings"}';
                } else {
                    echo '{"status":"success","message":"Settings saved"}';
                }
            } else {
                echo '{"status":"error","message":"Missing parameter"}';
            }
            break;
        
        default:
            echo '{"status":"error","message":"No type"}';
            break;
    }
    
?>