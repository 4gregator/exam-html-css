<?php
$name = inputFilter($_POST['name']);
$namePattern = '/^[a-zA-Zа-яёА-ЯЁ\s]+$/u';
$tel = inputFilter($_POST['phone']);
$telPattern = '/[+\(\)\-\s\d]/';
$mail = inputFilter($_POST['email']);
$mailPattern = '/.+@.+\..+/';

if (preg_match($namePattern, $name) && preg_match($telPattern, $tel) && preg_match($mailPattern, $mail)) {
  $success = true;
  $status = 200;
} else {
  $success = false;
  $status = [];
  if (!preg_match($namePattern, $name)) $status []= 'name';
  if (!preg_match($telPattern, $tel)) $status []= 'phone';
  if (!preg_match($mailPattern, $mail)) $status []= 'email';
}
echo json_encode(["success" => $success, "status" => $status]);

// фильтрация пользовательского ввода
function inputFilter($input) {
  $output = trim($input);
  $output = strip_tags($output);
  $output = htmlspecialchars($output);
  return $output;
}
?>