<?php
return [
    'paths' => ['api/*', 'cart/*'], // Adjust paths as necessary
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:8000'], // Frontend origin
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
