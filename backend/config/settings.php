<?php

return [
    'pagination_per_page' => 9,
    'models' => [
        'like' => [
            'default' => [
                'is_liked' => true
            ]
        ],
        'post' => [
            'default' => [
                'is_archived' => false,
                'is_comment_disabled' => false
            ]
        ]
    ]
];
