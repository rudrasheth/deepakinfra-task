<?php
/**
 * Configuration for SMTP Email Sending
 * Please fill in your details below.
 */

// SMTP Server Settings
define('SMTP_HOST', 'smtp.gmail.com');      // e.g., smtp.gmail.com
define('SMTP_PORT', 587);                  // 587 for TLS, 465 for SSL
define('SMTP_USER', 'stockmaster577@gmail.com'); // Your email address
define('SMTP_PASS', 'obuauvyjlerywxke');   // Your email password (use App Password for Gmail)
define('SMTP_AUTH', true);
define('SMTP_SECURE', 'tls');              // 'tls' or 'ssl'

// Receiver Settings
define('RECEIVER_EMAIL', 'rudrasheth2201@gmail.com');
define('RECEIVER_NAME', 'Deepak Infra Engineering');

// Branding & Contact
define('SITE_NAME', 'Deepak Infra Engineering');
define('SITE_URL', 'https://deepakinfraengineering.in');
define('PHONE_NUMBER', '919552084097');
define('OFFICE_ADDRESS', 'D 504, 3rd Floor, Vashi Plaza, Sector 17, Vashi, Navi Mumbai 400703');

// Auto-Reply Settings
define('AUTO_REPLY', true);
define('THANK_YOU_SUBJECT', 'Thank you for contacting Deepak Infra Engineering');
define('THANK_YOU_MESSAGE', "Dear Customer,\n\nThank you for reaching out to us! We have received your inquiry and our team is currently reviewing it. We aim to respond within 24 business hours.\n\nBest regards,\nThe Deepak Infra Engineering Team");
?>
