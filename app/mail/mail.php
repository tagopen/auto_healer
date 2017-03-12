<?php
  if (is_file('lib/class.phpmailer.php')) {
    require_once("lib/class.phpmailer.php");
  }

  if (is_file('lib/class.smtp.php')) {
    require_once("lib/class.smtp.php");
  }

  $http_host = $_SERVER['HTTP_HOST'];
  $body = '';

  if ( substr($http_host, 0, 4)=='www.') {
    $host_name = substr($http_host, 4);
  } else {
    $host_name = $http_host;
  }

  define ('HTTP_SERVER', 'http://' . $http_host . '/');
  define ('HOST_NAME', $host_name);

  $post = array( 
    'host_name'     => HOST_NAME,
    'host_dir'      => HTTP_SERVER,
    );

  if (!empty($_POST["form"])) {
    $post['user_form'] = filter_input(INPUT_POST, 'form', FILTER_SANITIZE_EMAIL);
    $body .= 'Заявка с формы: ' . $post['user_form'] . chr(10) . chr(13);
  }

  if (!empty($_POST["email"])) {
    $post['user_email'] = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $body .= 'Почта: ' . $post['user_email'] . chr(10) . chr(13);
  }

  if (!empty($_POST["name"])) {
    $post['user_name'] = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $body .= 'Имя: ' . $post['user_name'] . chr(10) . chr(13);
  }

  if (!empty($_POST["phone"])) {
    $post['user_phone'] = filter_input(INPUT_POST,'phone', FILTER_SANITIZE_STRING);
    $body .= 'Телефон: ' . $post['user_phone'] . chr(10) . chr(13);
  }

  if (!empty($_POST["message"])) {
    $post['user_message'] = filter_input(INPUT_POST,'message', FILTER_SANITIZE_STRING);
    $body .= 'Сообщение: ' . $post['user_message'] . chr(10) . chr(13);
  }

  if (!empty($_POST["carMark"])) {
    $post['car__mark'] = filter_input(INPUT_POST,'carMark', FILTER_SANITIZE_STRING);
    $body .= 'Марка автомобиля: ' . $post['car__mark'] . chr(10) . chr(13);
  }

  if (!empty($_POST["carGeneration"])) {
    $post['car__generation'] = filter_input(INPUT_POST,'carGeneration', FILTER_SANITIZE_STRING);
    $body .= 'Поколение автомобиля: ' . $post['car__generation'] . chr(10) . chr(13);
  }

  if (!empty($_POST["carSerie"])) {
    $post['car__serie'] = filter_input(INPUT_POST,'carSerie', FILTER_SANITIZE_STRING);
    $body .= 'Серия автомобиля: ' . $post['car__serie'] . chr(10) . chr(13);
  }

  if (!empty($_POST["carModification"])) {
    $post['car__modification'] = filter_input(INPUT_POST,'carModification', FILTER_SANITIZE_STRING);
    $body .= 'Модификация автомобиля: ' . $post['car__modification'] . chr(10) . chr(13);
  }

  if (!empty($_POST["carSerie"])) {
    $post['car__serie'] = filter_input(INPUT_POST,'carSerie', FILTER_SANITIZE_STRING);
    $body .= 'Серия автомобиля: ' . $post['car__serie'] . chr(10) . chr(13);
  }

  if (!empty($_POST["sparePart"])) {
    $post['spare__part'] = filter_input(INPUT_POST,'sparePart', FILTER_SANITIZE_STRING);
    $body .= 'Искомая деталь: ' . $post['spare__part'] . chr(10) . chr(13);
  }

  if (!empty($_POST["position1"])) {
    $post['position_1'] = filter_input(INPUT_POST,'position1', FILTER_SANITIZE_STRING);
    $body .= 'Расположение детали №1: ' . $post['position_1'] . chr(10) . chr(13);
  }

  if (!empty($_POST["position2"])) {
    $post['position_2'] = filter_input(INPUT_POST,'position2', FILTER_SANITIZE_STRING);
    $body .= 'Расположение детали №2: ' . $post['position_2'] . chr(10) . chr(13);
  }

  if (!empty($_POST["position3"])) {
    $post['position_3'] = filter_input(INPUT_POST,'position3', FILTER_SANITIZE_STRING);
    $body .= 'Расположение детали №3: ' . $post['position_3'] . chr(10) . chr(13);
  }

  if (!empty($_POST["position4"])) {
    $post['position_4'] = filter_input(INPUT_POST,'position4', FILTER_SANITIZE_STRING);
    $body .= 'Расположение детали №4: ' . $post['position_4'] . chr(10) . chr(13);
  }

  if (!empty($_POST["carVin"])) {
    $post['car__vin'] = filter_input(INPUT_POST,'carVin', FILTER_SANITIZE_STRING);
    $body .= 'VIN: ' . $post['car__vin'] . chr(10) . chr(13);
  }


  $mail = new PHPMailer();

  $mail->CharSet      = 'UTF-8';

  $mail->IsSendmail();

  $from = 'no-reply@tagopen.com';
  $to = "Artem2431@gmail.com";
  $mail->SetFrom($from, HOST_NAME);
  $mail->AddAddress($to);

  $mail->isHTML(false);

  $mail->Subject      = "Новая заявка с сайта";
  $mail->Body         = $body;

  if(!$mail->send()) {
    echo 'Что-то пошло не так. ' . $mail->ErrorInfo;
    return false;
  } else {
    echo 'Сообщение отправлено';
    return true;
  }

?>