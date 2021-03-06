<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecentUserSearch extends Migration{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(){
      Schema::create('user_recent_search', function (Blueprint $table){
          $table->increments('id');
          $table->integer('idUser')->unsigned();
          $table->string('search');
          $table->date('date');
          $table->foreign('idUser')->references('id')->on('users');
          $table->timestamps();
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(){
        //
    }
}
