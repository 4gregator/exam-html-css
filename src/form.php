<?php
$name = inputFilter($_POST['name']);
$namePattern = '/^[a-zA-Zа-яёА-ЯЁ\s]+$/';
$tel = inputFilter($_POST['phone']);
$telPattern = '/[+\(\)\-\s\d]/';
$mail = inputFilter($_POST['email']);
$mailPattern = '/.+@.+\..+/';

if (preg_match($namePattern, $name) && preg_match($telPattern, $tel) && preg_match($mailPattern, $mail)) {
  $result = "success";
  $status = 200;
} else {
  $result = "error";
  $status = '';
  if (!preg_match($namePattern, $name)) $status .= 'Проверьте Ваше имя<br>';
  if (!preg_match($telPattern, $tel)) $status .= 'Проверьте Ваш телефон<br>';
  if (!preg_match($mailPattern, $mail)) $status .= 'Проверьте Вашу почту<br>';
}
echo json_encode(["result" => $result, "status" => $status]);

// фильтрация пользовательского ввода
function inputFilter($input) {
  $output = trim($input);
  $output = strip_tags($output);
  $output = htmlspecialchars($output);
  return $output;
}
?>