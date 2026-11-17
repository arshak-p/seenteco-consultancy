<?php
/**
 * Seenteco visit tracker (tagged links only).
 * Only visits that arrive through a tagged link, e.g.  https://seenteco.com/?c=aboobacker , are recorded.
 * Normal visitors are NOT tracked. Each record: time, tag, how long they stayed, how far they scrolled.
 * Settings live in visit-config.php.
 */
require __DIR__ . '/visit-config.php';

header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo '{"ok":false}'; exit; }

$d = json_decode(file_get_contents('php://input', false, null, 0, 4000), true);
if (!is_array($d)) { http_response_code(400); echo '{"ok":false}'; exit; }

$fl = sys_get_temp_dir() . '/sen_v_' . md5($_SERVER['REMOTE_ADDR'] ?? 'x');   // at most one record every 2 seconds per visitor
if (is_file($fl) && time() - filemtime($fl) < 2) { http_response_code(204); exit; }
@touch($fl);
$tag = preg_replace('/[^a-z0-9_-]/i', '', (string)($d['tag'] ?? ''));
$tag = substr($tag, 0, 40);
if ($tag === '') { http_response_code(204); exit; }

$rec = [
    'at'      => date('c'),
    'tag'     => $tag,
    'event'   => ($d['event'] ?? 'open') === 'leave' ? 'leave' : 'open',
    'seconds' => max(0, min(36000, (int)($d['seconds'] ?? 0))),
    'reached' => substr(preg_replace('/[^a-z0-9 _-]/i', '', (string)($d['reached'] ?? '')), 0, 30),
    'form'    => !empty($d['form']),
    'sent'    => !empty($d['sent']),
    'screen'  => substr(preg_replace('/[^0-9x]/', '', (string)($d['screen'] ?? '')), 0, 12),
    'ip'      => $_SERVER['REMOTE_ADDR'] ?? '',
    'ua'      => substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 160),
];
@file_put_contents(__DIR__ . '/visits.log', json_encode($rec, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);

// email on the first "open" of a tag (at most once every 6 hours per tag)
if ($rec['event'] === 'open') {
    $flag = sys_get_temp_dir() . '/sen_visit_' . md5($tag);
    if (!is_file($flag) || time() - filemtime($flag) > 6 * 3600) {
        @touch($flag);
        @mail($TO_EMAIL, "Seenteco: '$tag' just opened the website",
              "The link tagged '$tag' was opened.\n\nTime: {$rec['at']}\nDevice: {$rec['ua']}\nIP: {$rec['ip']}\n",
              "From: Seenteco Website <$FROM_EMAIL>\r\nContent-Type: text/plain; charset=utf-8\r\n");
    }
}
http_response_code(204);
