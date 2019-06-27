<?php
/* Задаем переменные */
$name = htmlspecialchars($_POST["name"]);
$email = htmlspecialchars($_POST["email"]);
$message = htmlspecialchars($_POST["message"]);
$bezspama = htmlspecialchars($_POST["ahtung"]);

/* Ваш адрес и тема сообщения */
$address = "radiot4k@gmail.com";
$sub = "Сообщение с сайта spyrydonov.top";

/* Формат письма */
$mes = "Сообщение с сайта spyrydonov.top\n\n
Имя отправителя: $name\n
Электронный адрес отправителя: $email\n
Текст сообщения:
$message";

if (empty($bezspama)) /* Оценка поля ahtung - должно быть пустым*/
  {
    /* Отправляем сообщение, используя mail() функцию */
    $from  = "From: $name <$email> \r\n Reply-To: $email \r\n";
    if (mail($address, $sub, $mes, $from)) {
      header('Refresh: 5; URL=https://spyrydonov.top');
      echo '<head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>
        <body class="message">Письмо отправлено, через 5 секунд вы вернетесь на главную страницу.</body>';}
    else {
      header('Refresh: 5; URL=http://vantuva.com');
      echo '<head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>
        <body class="message">Письмо не отправлено, через 5 секунд вы вернетесь на главную страницу.</body>';}
  }
exit; /* Выход без сообщения, если поле ahtung заполнено спам ботами */
?>
