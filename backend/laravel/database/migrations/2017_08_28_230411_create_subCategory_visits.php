<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubCategoryVisits extends Migration{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(){
      Schema::create('subCategory_visits', function (Blueprint $table){
          $table->increments('id');
          $table->integer('idUser')->unsigned();
          $table->integer('idSubCategory');
          $table->integer('quant_visits');
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
