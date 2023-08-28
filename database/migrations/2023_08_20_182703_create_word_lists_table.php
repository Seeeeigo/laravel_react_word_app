<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWordListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(!Schema::hasTable('word_lists')) {
            Schema::create('word_lists', function (Blueprint $table) {
                $table->id();
                $table->integer('num');
                $table->string('ja', 255);
                $table->string('en', 255);
                $table->string('ex', 255);
                $table->string('ja_ex', 255);
                $table->timestamps();
                $table->string('update_user');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('word_lists');
    }
}
