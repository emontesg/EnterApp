<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNewsVisitedUser extends Migration{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(){
      Schema::create('news_visited_user', function (Blueprint $table){
          $table->increments('id');
          $table->integer('idUser')->unsigned();
          $table->integer('idNews');
          $table->integer('quant_visits');
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
