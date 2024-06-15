<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description')->nullable();
            $table->string('price_and_quantity')->nullable();
            $table->string('location')->nullable();
            $table->string('tags')->nullable();
            $table->decimal('rating', 2, 1)->nullable()->comment('from 0.0 to 5.0');
            $table->integer('no_of_likes')->default(0);
            $table->integer('no_of_comments')->default(0);
            $table->boolean('is_archived')->default(false);
            $table->boolean('is_comment_disabled')->default(false);
            $table->timestamps();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->uuid()->nullable()->unique();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
