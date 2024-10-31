<?php

echo "<h1>PHP Verification</h1>";
echo "<h2>PHP Version: " . PHP_VERSION . "</h2>";
echo "<h2>Document Root: " . $_SERVER['DOCUMENT_ROOT'] . "</h2>";
echo "<h2>Request URI: " . $_SERVER['REQUEST_URI'] . "</h2>";
echo "<h2>Server Software: " . $_SERVER['SERVER_SOFTWARE'] . "</h2>";
echo "<pre>";
print_r($_SERVER);
echo "</pre>";