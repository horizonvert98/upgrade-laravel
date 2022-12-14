<?php
return [
    'name' => 'My Application',
    'env' => env('APP_ENV', 'development'),
    'debug' =>  env('APP_DEBUG', 'false'),
    'url' => env('APP_URL', 'http://localhost'),
    'filesurl' => env('FILES_URL', 'http://localhost'),
    'urlname' => env('URL_NAME', 'localhost'),
    'topsiteurl' => env('TOP_SITE_URL', 'localhost'),
    'timezone' => 'Asia/Kolkata',
    'locale' => 'en',
    'fallback_locale' => 'en',
    'key' => env('APP_KEY'),
    'cipher' => 'AES-256-CBC',
    'log' => env('APP_LOG', 'single'),
    'log_level' => env('APP_LOG_LEVEL', 'debug'),
    'debug_blacklist' => [
        '_ENV' => [
            'APP_KEY',
            'DB_PASSWORD',
            'DB_DATABASE',
            'DB_USERNAME',
            'INVISIBLE_RECAPTCHA_SITEKEY',
            'INVISIBLE_RECAPTCHA_SECRETKEY',
            'DOS_BUCKET',
            'DOS_ENDPOINT',
            'FILESYSTEM_DRIVER',
            'DOS_ACCESS_KEY_ID',
            'MAIL_USERNAME',
            'MAIL_PASSWORD',
            'DOS_SECRET_ACCESS_KEY',
        ],

        '_SERVER' => [
            'APP_KEY',
            'DB_PASSWORD',
            'DB_DATABASE',
            'DB_USERNAME',
            'INVISIBLE_RECAPTCHA_SITEKEY',
            'INVISIBLE_RECAPTCHA_SECRETKEY',
            'DOS_BUCKET',
            'DOS_ENDPOINT',
            'FILESYSTEM_DRIVER',
            'DOS_ACCESS_KEY_ID',
            'MAIL_USERNAME',
            'MAIL_PASSWORD',
            'DOS_SECRET_ACCESS_KEY',
        ],

        '_SERVER' => [
            'APP_KEY',
            'DB_PASSWORD',
            'DB_DATABASE',
            'DB_USERNAME',
            'INVISIBLE_RECAPTCHA_SITEKEY',
            'INVISIBLE_RECAPTCHA_SECRETKEY',
            'DOS_BUCKET',
            'DOS_ENDPOINT',
            'FILESYSTEM_DRIVER',
            'DOS_ACCESS_KEY_ID',
            'MAIL_USERNAME',
            'MAIL_PASSWORD',
            'DOS_SECRET_ACCESS_KEY',
        ],

        '_POST' => [
            'password',
            'APP_KEY',
            'DB_PASSWORD',
            'DB_DATABASE',
            'DB_USERNAME',
            'INVISIBLE_RECAPTCHA_SITEKEY',
            'INVISIBLE_RECAPTCHA_SECRETKEY',
            'DOS_BUCKET',
            'DOS_ENDPOINT',
            'FILESYSTEM_DRIVER',
            'DOS_ACCESS_KEY_ID',
            'MAIL_USERNAME',
            'MAIL_PASSWORD',
            'DOS_SECRET_ACCESS_KEY',
        ],
    ],

    'providers' => [
        Illuminate\Auth\AuthServiceProvider::class,
        // Illuminate\Broadcasting\BroadcastServiceProvider::class,
        // Illuminate\Bus\BusServiceProvider::class,
        Illuminate\Cache\CacheServiceProvider::class,
        Illuminate\Foundation\Providers\ConsoleSupportServiceProvider::class,
        Illuminate\Cookie\CookieServiceProvider::class,
        Illuminate\Database\DatabaseServiceProvider::class,
        Illuminate\Encryption\EncryptionServiceProvider::class,
        Illuminate\Filesystem\FilesystemServiceProvider::class,
        Illuminate\Foundation\Providers\FoundationServiceProvider::class,
        Illuminate\Hashing\HashServiceProvider::class,
        // Illuminate\Mail\MailServiceProvider::class,
        // Illuminate\Notifications\NotificationServiceProvider::class,
        Illuminate\Pagination\PaginationServiceProvider::class,
        // Illuminate\Pipeline\PipelineServiceProvider::class,
        Illuminate\Queue\QueueServiceProvider::class,
        // Illuminate\Redis\RedisServiceProvider::class,
        Illuminate\Auth\Passwords\PasswordResetServiceProvider::class,
        Illuminate\Session\SessionServiceProvider::class,
        Illuminate\Translation\TranslationServiceProvider::class,
        Illuminate\Validation\ValidationServiceProvider::class,
        Illuminate\View\ViewServiceProvider::class,
        Intervention\Image\ImageServiceProvider::class,
        // Laravel\Socialite\SocialiteServiceProvider::class,
        // App\Providers\AppServiceProvider::class,
        App\Providers\AuthServiceProvider::class,
        // App\Providers\EventServiceProvider::class,
        App\Providers\RouteServiceProvider::class,
        App\Providers\ViewServiceProvider::class,
        // AlbertCht\InvisibleReCaptcha\InvisibleReCaptchaServiceProvider::class,
        Arcanedev\LogViewer\LogViewerServiceProvider::class,
        // Biscolab\ReCaptcha\ReCaptchaServiceProvider::class,
    ],
    'aliases' => [
        'HH' => App\Helper::class,
        'App' => Illuminate\Support\Facades\App::class,
        'Artisan' => Illuminate\Support\Facades\Artisan::class,
        'Auth' => Illuminate\Support\Facades\Auth::class,
        'Blade' => Illuminate\Support\Facades\Blade::class,
        'Cache' => Illuminate\Support\Facades\Cache::class,
        'Config' => Illuminate\Support\Facades\Config::class,
        'Cookie' => Illuminate\Support\Facades\Cookie::class,
        'Crypt' => Illuminate\Support\Facades\Crypt::class,
        'DB' => Illuminate\Support\Facades\DB::class,
        // 'Eloquent' => Illuminate\Database\Eloquent\Model::class,
        'Event' => Illuminate\Support\Facades\Event::class,
        'File' => Illuminate\Support\Facades\File::class,
        // 'Gate' => Illuminate\Support\Facades\Gate::class,
        'Hash' => Illuminate\Support\Facades\Hash::class,
        'Lang' => Illuminate\Support\Facades\Lang::class,
        'Log' => Illuminate\Support\Facades\Log::class,
        // 'Mail' => Illuminate\Support\Facades\Mail::class,
        // 'Notification' => Illuminate\Support\Facades\Notification::class,
        'Password' => Illuminate\Support\Facades\Password::class,
        'Queue' => Illuminate\Support\Facades\Queue::class,
        'Redirect' => Illuminate\Support\Facades\Redirect::class,
        // 'Redis' => Illuminate\Support\Facades\Redis::class,
        'Request' => Illuminate\Support\Facades\Request::class,
        'Response' => Illuminate\Support\Facades\Response::class,
        'Route' => Illuminate\Support\Facades\Route::class,
        // 'Schema' => Illuminate\Support\Facades\Schema::class,
        'Session' => Illuminate\Support\Facades\Session::class,
        'Str' => Illuminate\Support\Str::class,
        'Storage' => Illuminate\Support\Facades\Storage::class,
        'URL' => Illuminate\Support\Facades\URL::class,
        'Validator' => Illuminate\Support\Facades\Validator::class,
        'View' => Illuminate\Support\Facades\View::class,
        'Image' => Intervention\Image\Facades\Image::class,
        'Form' => Collective\Html\FormFacade::class,
        'Html' => Collective\Html\HtmlFacade::class,
        // 'Socialite' => Laravel\Socialite\Facades\Socialite::class,
        'ReCaptcha' => Biscolab\ReCaptcha\Facades\ReCaptcha::class
    ],
];