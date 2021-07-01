<?php
// Файлы phpmailer

require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$surname = $_POST['surname'];
$email = $_POST['email'];
$date = $_POST['date'];
$days = $_POST['days'];
$comin = $_POST['comin'];

// Формирование самого письма
$title = "Бронирование апартментов";
$body = "<b>$name $surname</b>, email <b>$email</b>, забронировал апартменты с $date &nbsp; $comin на $days дней.";

// Настройки PHPMailer
$mail = new phpmailer/PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
    $mail->Username   = 'verapoles12345@gmail.com'; // Логин на почте
    $mail->Password   = 'A123123a'; // Пароль на почте
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;
    $mail->setFrom('verapoles12345@gmail.com', 'Вера Полещук'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress(' info@itspro.by');  
    $mail->addAddress($email); // Ещё один, если нужен

   // Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
//echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);
?>