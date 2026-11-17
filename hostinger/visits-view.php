<?php
/** Private viewer for tagged visits:  https://seenteco.com/api/visits-view.php?key=YOUR_SECRET   (same key as in visit.php) */
require __DIR__ . '/visit-config.php';
if (strlen($VIEW_KEY) < 16 || stripos($VIEW_KEY, 'CHANGE-THIS') !== false) { http_response_code(403); echo 'Set a strong VIEW_KEY in visit-config.php first.'; exit; }   // never open with the default password
if (!hash_equals($VIEW_KEY, (string)($_GET['key'] ?? ''))) { sleep(1); http_response_code(403); echo 'Forbidden'; exit; }
header('Cache-Control: no-store'); header('Referrer-Policy: no-referrer');
header('Content-Type: text/html; charset=utf-8'); header('X-Robots-Tag: noindex');
$rows = [];
$f = __DIR__ . '/visits.log';
if (is_file($f)) foreach (array_reverse(file($f, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES)) as $l) { $r = json_decode($l, true); if ($r) $rows[] = $r; }
$h = fn($s) => htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8');
echo '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Seenteco visits</title>
<body style="font:14px system-ui;padding:20px"><h2>Tagged visits</h2><p>Newest first. "open" = they opened the link. "leave" = they left (time on page, how far they scrolled).</p>
<table border="0" cellpadding="8" style="border-collapse:collapse;min-width:640px"><tr style="text-align:left;background:#eee"><th>When</th><th>Who (tag)</th><th>Event</th><th>Time on page</th><th>Reached</th><th>Opened form</th><th>Sent form</th><th>Device</th></tr>';
foreach ($rows as $r) {
    $m = floor(($r['seconds'] ?? 0) / 60); $s = ($r['seconds'] ?? 0) % 60;
    echo '<tr style="border-top:1px solid #ddd"><td>' . $h(str_replace('T', ' ', substr($r['at'], 0, 19))) . '</td><td><b>' . $h($r['tag']) . '</b></td><td>' . $h($r['event']) . '</td><td>' .
         ($r['event'] === 'leave' ? "{$m}m {$s}s" : '-') . '</td><td>' . $h($r['reached'] ?: '-') . '</td><td>' . (!empty($r['form']) ? 'yes' : '-') . '</td><td>' . (!empty($r['sent']) ? 'yes' : '-') . '</td><td>' . $h(substr($r['ua'], 0, 60)) . '</td></tr>';
}
echo '</table>' . (count($rows) ? '' : '<p>No tagged visits yet.</p>') . '</body>';
