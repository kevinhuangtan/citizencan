
<?php


class Gov_Crawler {

    

    public function Gov_Crawler()
    {

        

    }

    public function goGetIt($url)
    {

        
        $html = $this->downloadHtml($url);
        preg_match_all('/"committee_id":"(USC003679|USC003951|USC003784|USC003653|USC003762|USC003646|USC003844|USC003918|USC003910|USC003883|USC003472|USC003645|USC003398|USC004046|USC004001|USC003659|USC003688|USC003610|USC003897|USC003318|USC002703|USC002656|USC003649|USC003931|USC002875|USC002887|USC003616|USC003626|USC002777|USC004015|USC003415|USC003879|USC003733|USC003632|USC004036|USC002654|USC002906)",/ms', $html, $listmatch);

        return $listmatch[1];

    }

    public function getIt($url)
    {

        
        $html = $this->downloadHtml($url);
        echo $html;

    }

    public function downloadHtml($url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        
        // exec curl request
        $response = curl_exec($ch);
        if(curl_errno($ch))
        {
            echo 'error: ' . curl_error($ch)."<br>";
        }
        curl_close($ch);

        return $response;

    }


    public function is_dir_empty($dir) {
        if (!is_readable($dir)) return NULL; 
        $handle = opendir($dir);
        while (false !== ($entry = readdir($handle))) {
            if ($entry != "." && $entry != "..") {
                return FALSE;
            }
        }
        return TRUE;
    }

    public function downloader()
    {
        $query="SELECT * FROM app_table";
        if ($stmt = mysqli_prepare(Db_Connection::getInstance()->getConnection(), $query)){
            $stmt->execute();

            /* bind variables to prepared statement */
            //$stmt->bind_result($id, $name, $url, $html);

            /* fetch values */
            $result = $stmt->get_result();
            $resultArray = $result->fetch_all(MYSQLI_ASSOC);
            foreach ($resultArray as $entry) {
                if($entry["html"]==''){
                $html = $this->downloadHtml($entry["url"]);
                $html = preg_replace('[\r\n]', '', $html);
                $html = mysqli_real_escape_string(Db_Connection::getInstance()->getConnection(), $html);
                $id = $entry["id"];
                $query2 = "UPDATE app_table SET html ='".$html."' WHERE id ='".$id."'";
                        
                $stmt2 = mysqli_prepare(Db_Connection::getInstance()->getConnection(), $query2);
                if ( !$stmt2 ) {
                  die('mysqli error: '.mysqli_error(Db_Connection::getInstance()->getConnection() ));
                }

                $stmt2->execute();}


                // Db_Connection::getInstance()->executeQuery($stmt2);

                // $files = $this->getFiles($html);
                // echo $url."<br>";
                // print_r($files);

                // $query3 = "INSERT INTO files (appId, filename, path) VALUES (?, ?, ?)";
                        
                // $stmt3 = mysqli_prepare(Db_Connection::getInstance()->getConnection(), $query3);

                // mysqli_stmt_bind_param($stmt3, "sss", $id, $files[1], $files[2]);

                // Db_Connection::getInstance()->executeQuery($stmt3);
            }
        }

    }

    public function extractListingsFromHtml($html)
    {

        preg_match_all('/<td class="project">.*?<a href="(.+?)">(.+?)<\/a>.*?<td class="download">.*?<img alt="(.*?)"/ms', $html, $listmatch);

        // array containing urls (key) and names (value)
        $listings = array();
        for($i=0; $i<count($listmatch[1]);$i++) {
            if($listmatch[3][$i]=='Yes'){
                $listmatch[1][$i] = "http://opencores.org/" . $listmatch[1][$i];
                $listings[$listmatch[1][$i]] = $listmatch[2][$i];
            }
        }

        //print_r($listings);

        return $listings;


    }



}