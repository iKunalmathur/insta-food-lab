<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->delete();
        $json = file_get_contents(database_path('json/users.json'));
        $data = json_decode($json);
        foreach ($data as $value) {
            User::create([
                'name' => $value->name,
                'email' => $value->email,
                'password' => bcrypt($value->password),
            ]);
        }
    }
}
