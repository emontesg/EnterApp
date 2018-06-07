<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class News extends Model{
    /**
    * The table associated with the model.
    *
    * @var string
    */
    protected $table = 'news';

    /**
    * The attributes that are mass assignable.
    *
    * @var array
    */
	protected $fillable = [
		'idNews', 'quant_visits', 'date'
	];
}
