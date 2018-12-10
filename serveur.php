 <?php

if(isset($_GET["q"])){
  header("Content-Type: application/json");
  $q=$_GET["q"];
  $dir          = $q;
  $return_array = array();

  if(is_dir($dir)){
    $return_array[0] = $dir;
    $return_array[1] = dirname($dir);
      if($dh = opendir($dir)){
          while(($file = readdir($dh)) != false){

              if($file == "." or $file == ".."){

              } else {
                  $return_array[] = $file;
              }
          }
      }

      echo json_encode($return_array);
  }
}
else if(isset($_GET["f"])){
  header("Content-Type: application/json");
  $f=$_GET["f"];
  $return_arr = array();
  $return_arr[0] = file_get_contents($f);
  echo json_encode($return_arr);
  
}
