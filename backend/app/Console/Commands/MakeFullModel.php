<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Str;

class MakeFullModel extends Command
{
    protected $signature = 'make:full-model {name} {directory?}';
    protected $description = 'Create a model, migration, resource controller, request, and resource files';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $name = $this->argument('name');
        $directory = $this->argument('directory') ?? '';

        $modelPath = $directory ? Str::studly($directory) . '/' . $name : $name;

        // Create the model and migration
        Artisan::call('make:model', ['name' => $modelPath, '-m' => true]);
        $this->info('Model and migration created successfully.');

        // Create the resource controller
        Artisan::call('make:controller', ['name' => "{$modelPath}Controller", '--resource' => true]);
        $this->info('Resource controller created successfully.');

        // Create the form request
        Artisan::call('make:request', ['name' => "{$modelPath}Request"]);
        $this->info('Form request created successfully.');

        // Create the resource
        Artisan::call('make:resource', ['name' => "{$modelPath}Resource"]);
        $this->info('Resource created successfully.');
    }
}
