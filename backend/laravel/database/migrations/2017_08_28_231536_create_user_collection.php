<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserCollection extends Migration{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(){
      Schema::create('user_collection', function (Blueprint $table){
          $table->increments('id');
          $table->string('name');
          $table->string('color');
          $table->date('date');
          $table->integer('idUser')->unsigned();
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
