<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserInterests extends Migration{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(){
      Schema::create('user_interests', function (Blueprint $table){
          $table->increments('id');
          $table->integer('idSubCategory');
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
