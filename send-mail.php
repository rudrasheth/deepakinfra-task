<?php
/**
 * Real-time Email Handler for Contact and Quote Forms
 * Powered by PHPMailer for reliable SMTP delivery.
 */

// Error reporting for debugging (Remove in production)
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

require_once 'config.php';

// Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load PHPMailer manually since no Composer
require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

// Set JSON header for real-time AJAX response
header('Content-Type: application/json');

// Check if credentials are still placeholders
if (SMTP_USER === 'your-email@gmail.com' || SMTP_PASS === 'your-app-password') {
    echo json_encode(['status' => 'error', 'message' => 'Email system is not configured yet. Please enter your SMTP credentials in config.php.']);
    exit;
}

// Check if data is coming from POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Sanitize and collect form data
    $full_name = filter_var($_POST['full_name'] ?? '', FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $mobile = filter_var($_POST['mobile'] ?? '', FILTER_SANITIZE_STRING);
    $service = filter_var($_POST['service'] ?? 'General Inquiry', FILTER_SANITIZE_STRING);
    $message = filter_var($_POST['message'] ?? '', FILTER_SANITIZE_STRING);
    $form_type = filter_var($_POST['form_type'] ?? 'Quote/Contact Request', FILTER_SANITIZE_STRING);

    // Validation
    if (empty($full_name) || empty($email) || empty($mobile)) {
        echo json_encode(['status' => 'error', 'message' => 'Please fill in all required fields (Name, Email, Mobile).']);
        exit;
    }

    // Helper to setup internal PHPMailer
    $getMailer = function() {
        $m = new PHPMailer(true);
        $m->isSMTP();
        $m->Host       = SMTP_HOST;
        $m->SMTPAuth   = SMTP_AUTH;
        $m->Username   = SMTP_USER;
        $m->Password   = SMTP_PASS;
        $m->SMTPSecure = (SMTP_SECURE === 'tls') ? PHPMailer::ENCRYPTION_STARTTLS : PHPMailer::ENCRYPTION_SMTPS;
        $m->Port       = SMTP_PORT;
        
        // DISABLE SSL Verification (common issue on shared hosts)
        $m->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );
        return $m;
    };

    try {
        // --- EMAIL 1: TO ADMIN (SALES TEAM) ---
        $mailAdmin = $getMailer();
        $mailAdmin->setFrom(SMTP_USER, SITE_NAME);
        $mailAdmin->addAddress(RECEIVER_EMAIL, RECEIVER_NAME);
        $mailAdmin->addReplyTo($email, $full_name);
        $mailAdmin->isHTML(true);
        $mailAdmin->Subject = "New $form_type from $full_name";
        
        $adminBody = "
            <div style='font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee;'>
                <h2 style='color: #2563eb;'>$form_type Details</h2>
                <p><strong>Name:</strong> $full_name</p>
                <p><strong>Email:</strong> $email</p>
                <p><strong>Mobile:</strong> $mobile</p>
                <p><strong>Service:</strong> $service</p>
                <p><strong>Message:</strong><br>" . nl2br($message) . "</p>
            </div>
        ";
        $mailAdmin->Body = $adminBody;
        $mailAdmin->send();

        // --- EMAIL 2: TO CUSTOMER (AUTO-REPLY) ---
        if (defined('AUTO_REPLY') && AUTO_REPLY) {
            $mailCustomer = $getMailer();
            $mailCustomer->setFrom(SMTP_USER, SITE_NAME);
            $mailCustomer->addAddress($email, $full_name);
            $mailCustomer->isHTML(true);
            $mailCustomer->Subject = THANK_YOU_SUBJECT;

            $customerBody = "
                <div style='font-family: sans-serif; max-width: 600px; padding: 20px; background: #f9fafb; border-radius: 12px;'>
                    <div style='background: #2563eb; padding: 20px; border-radius: 8px 8px 0 0; color: #fff;'>
                        <h1 style='margin:0; font-size: 20px;'>" . SITE_NAME . "</h1>
                    </div>
                    <div style='padding: 20px; border: 1px solid #e5e7eb; border-top: 0; background: #fff;'>
                        <p style='color: #374151;'>" . nl2br(THANK_YOU_MESSAGE) . "</p>
                        <div style='margin-top: 25px; padding-top: 20px; border-top: 1px solid #eee; font-size: 13px; color: #6b7280;'>
                            <p><strong>Contact Us:</strong> " . PHONE_NUMBER . "</p>
                            <p><strong>Location:</strong> " . OFFICE_ADDRESS . "</p>
                        </div>
                    </div>
                </div>
            ";
            $mailCustomer->Body = $customerBody;
            $mailCustomer->send();
        }

        echo json_encode(['status' => 'success', 'message' => 'Thank you! Your request has been sent. Please check your email for confirmation.']);
    } catch (\Throwable $t) {
        // Log error server-side for internal debugging
        error_log("SUBMISSION ERROR: " . $t->getMessage());
        $msg = "Error: " . $t->getMessage();
        if (strpos($msg, 'Username and Password not accepted') !== false) {
            $msg = "Authentication failed. Please check your SMTP credentials. If using Gmail, you need an 'App Password'.";
        }
        echo json_encode(['status' => 'error', 'message' => $msg]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
