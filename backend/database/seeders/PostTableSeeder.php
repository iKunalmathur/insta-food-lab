<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PostTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('posts')->delete();
        $json = file_get_contents(database_path('json/posts.json'));
        $data = json_decode($json);
        foreach ($data as $value) {

            $randomUser = User::inRandomOrder()->first();
            Auth::onceUsingId($randomUser->id);

            Post::create([
                'title' => $value->title,
                'description' => $value->description,
                'price_and_quantity' => $value->price_and_quantity,
                'location' => $value->location,
                'tags' => $value->tags,
                'rating' => $value->rating,
                'no_of_likes' => $value->no_of_likes,
                'no_of_comments' => $value->no_of_comments,
                'is_archived' => $value->is_archived,
                'is_comment_disabled' => $value->is_comment_disabled,
                'created_at' => $value->created_at,
                'updated_at' => $value->updated_at,
            ]);
        }
    }
}
