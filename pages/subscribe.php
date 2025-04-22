<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../phpmailer/src/Exception.php';
require '../phpmailer/src/PHPMailer.php';
require '../phpmailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['email'])) {
    $subscriberEmail = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

    if (filter_var($subscriberEmail, FILTER_VALIDATE_EMAIL)) {
        $mail = new PHPMailer(true);

        try {
            // SMTP settings
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'xply.comany@gmail.com'; // Replace with your Gmail
            $mail->Password = 'yourapppassword';     // Use an app password (not your Gmail password)
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->Port = 465;

            // Email content
            $mail->setFrom('xply.comany@gmail.com', 'Newsletter Bot');
            $mail->addAddress('xply.company@gmail.com');
            $mail->Subject = 'New Newsletter Subscription';
            $mail->Body    = "A new user subscribed to your newsletter:\n\nEmail: $subscriberEmail";

            $mail->send();
            echo "Subscription successful!";
        } catch (Exception $e) {
            echo "Email could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    } else {
        echo "Invalid email format.";
    }
}
?>
