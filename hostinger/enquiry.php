<?php
/**
 * Seenteco enquiry handler (Hostinger / any PHP host).
 * Receives the contact-form JSON, validates it, emails it to you and keeps a private log.
 * >>> Change the two settings below. <<<
 */
$TO_EMAIL   = 'email@seenteco.com';      // where enquiries are delivered
$FROM_EMAIL = 'no-reply@seenteco.com';   // must be an address on YOUR domain (create it in Hostinger > Emails)

ini_set('display_errors', '0');                       // never show PHP errors to visitors
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function out($code, $arr) { http_response_code($code); echo json_encode($arr); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') out(405, ['ok' => false, 'error' => 'Method not allowed']);

// only accept requests that come from this website (blocks other sites posting to the form)
$host = preg_replace('/^www\./i', '', strtolower($_SERVER['HTTP_HOST'] ?? ''));
$from = strtolower((string)parse_url($_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? ''), PHP_URL_HOST));
if ($from === '' || preg_replace('/^www\./i', '', $from) !== $host) out(403, ['ok' => false, 'error' => 'Request not allowed']);
if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) out(415, ['ok' => false, 'error' => 'Invalid request']);

$raw = file_get_contents('php://input', false, null, 0, 20000);
$d = json_decode($raw, true);
if (!is_array($d)) out(400, ['ok' => false, 'error' => 'Invalid request']);
if (!empty($d['website'])) out(200, ['ok' => true]);   // hidden spam-trap field filled in: pretend success, send nothing

$clean = function ($v, $n = 500) {
    $v = trim((string)($v ?? ''));
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/', '', $v);
    return mb_substr($v, 0, $n);
};
$e = [
    'name' => $clean($d['name'] ?? '', 120), 'company' => $clean($d['company'] ?? '', 120), 'title' => $clean($d['title'] ?? '', 120),
    'email' => $clean($d['email'] ?? '', 160), 'phone' => $clean($d['phone'] ?? '', 40), 'country' => $clean($d['country'] ?? '', 80),
    'interest' => $clean($d['interest'] ?? '', 80), 'message' => $clean($d['message'] ?? '', 2000),
];
if (mb_strlen($e['name']) < 2 || !filter_var($e['email'], FILTER_VALIDATE_EMAIL) || mb_strlen($e['message']) < 10) {
    out(422, ['ok' => false, 'error' => 'Please check your name, email and message.']);
}

// very small rate limit: 1 request / 20 s per visitor
$ip = $_SERVER['REMOTE_ADDR'] ?? 'x';
$flag = sys_get_temp_dir() . '/sen_' . md5($ip);
if (is_file($flag) && time() - filemtime($flag) < 20) out(429, ['ok' => false, 'error' => 'Please wait a moment and try again.']);
@touch($flag);
// overall cap: at most 40 messages an hour for the whole site (stops mail flooding)
$cap = sys_get_temp_dir() . '/sen_cap_' . date('YmdH');
$n = (int)@file_get_contents($cap);
if ($n >= 40) out(429, ['ok' => false, 'error' => 'Please try again later.']);
@file_put_contents($cap, (string)($n + 1), LOCK_EX);

$body = "New website enquiry\n\n";
foreach ($e as $k => $v) { $body .= ucfirst($k) . ': ' . $v . "\n"; }
$body .= "\nSent: " . date('c') . "\n";   // (visitor IP is deliberately not stored)

$headers = "From: Seenteco Website <$FROM_EMAIL>\r\nReply-To: " . str_replace(["\r", "\n"], '', $e['email']) . "\r\nContent-Type: text/plain; charset=utf-8\r\n";
$sent = @mail($TO_EMAIL, 'New enquiry from ' . str_replace(["\r", "\n"], ' ', $e['name']), $body, $headers);

// private log (api/.htaccess blocks web access to it)
$log = __DIR__ . '/enquiries.log';
@file_put_contents($log, json_encode($e + ['at' => date('c')], JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);

if (!$sent && !is_file($log)) out(500, ['ok' => false, 'error' => 'Could not send right now. Please email us directly.']);
out(200, ['ok' => true]);
