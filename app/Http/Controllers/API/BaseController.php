<?php

// app/Http/Controllers/Api/BaseController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TranslationService;

class BaseController extends Controller
{
    /**
     * Success response with translation support
     */
    protected function success($data = null, string $messageKey = null, int $code = 200)
    {
        $response = ['success' => true];

        if ($data !== null) {
            $response['data'] = $data;
        }

        if ($messageKey) {
            $response['message'] = TranslationService::get($messageKey);
        }

        return response()->json($response, $code);
    }

    /**
     * Error response with translation support
     */
    protected function error(string $messageKey, int $code = 400, $errors = null)
    {
        $response = [
            'success' => false,
            'message' => TranslationService::get($messageKey),
        ];

        if ($errors !== null) {
            $response['errors'] = $errors;
        }

        return response()->json($response, $code);
    }

    /**
     * Get current user's locale
     */
    protected function getLocale(): string
    {
        return TranslationService::getCurrentLocale();
    }
}
