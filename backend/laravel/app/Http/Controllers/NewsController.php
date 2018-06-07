<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\News;

use Illuminate\Support\Facades\DB;

class NewsController extends Controller{

	public function store(Request $request){
      // Creamos las reglas de validación
      	$rules = [
          	'idNews'      	=> 'required',
          	'quant_visits'	=> 'required',
          	'date'      	=> 'required'
        ];

        $news = DB::table('news')->where('idNews', '=', $request->idNews)->get();
        //var_dump($news[0]->quant_visits);
        if(count($news) > 0){
        	$cant = $request->quant_visits + $news[0]->quant_visits;
          $dateRaw = date_parse_from_format("d-m-Y", $request->date);
          $dateTwo = $dateRaw["year"]."-".$dateRaw["month"]."-".$dateRaw["day"];
          $request->date = $dateTwo;
          $old_date_format = strtotime($request->date);
          $new_date_format = date("Y-m-d", $old_date_format); 
          $request->date = $new_date_format;
          DB::table('news')
            ->where('idNews', $request->idNews)
            ->update(['quant_visits' => $cant]);

          return ['updated' => $request->date];
        
        }else{
      		try{// Ejecutamos el validaor, en caso de que falle devolvemos la respuesta
          		$validator = \Validator::make($request->all(), $rules);
          		if ($validator->fails()) {
              		return [
                  	'created' => false,
                  	'errors'  => $validator->errors()->all()
              		];
          		}
              $dateRaw = date_parse_from_format("d-m-Y", $request->date);
              $dateTwo = $dateRaw["year"]."-".$dateRaw["month"]."-".$dateRaw["day"];
              $request->date = $dateTwo;
          		News::create($request->all());
          		return ['created' => $request->date];

      		}catch (Exception $e) {
      			\Log::info('Error creating news: '.$e);
          		return \Response::json(['created' => false], 500);
      		}
        }
  	}

  	public function update(Request $request, $id){
        $user = News::find($id);
        $user->update($request->all());
        return ['updated' => true];
    }

    public function getTopThree(){
      date_default_timezone_set('America/Costa_Rica');
      $date = date("Y-m-d");
      $news = DB::table('news')->select('idNews')
      ->orderBy('quant_visits', 'desc')
      ->where('date', '=', $date)
      ->limit(3)
      ->get();
      // $news = DB::table('news')
      //           ->orderBy('quant_visits', 'desc')
      //           ->where('date', '=', $date)
      //           ->limit(3)
      //           ->get();
      
      if(count($news) > 2){
        return $news;
      }else{
        $news = DB::table('news')->select('idNews')
                  ->orderBy('quant_visits', 'desc')
                  ->latest()
                  ->limit(3)
                  ->get();
        // $news = DB::table('news')
        //         ->orderBy('quant_visits', 'desc')
        //         ->latest()
        //         ->limit(3)
        //         ->get();
        return $news;
      }
    }
//Comment test
//Hola
//sdgds
    public function getMostRelevant(){
      date_default_timezone_set('America/Costa_Rica');
      $date = date("Y-m-d");
      $news = DB::table('news')
                ->orderBy('quant_visits', 'desc')
                ->where('date', '=', $date)
                ->limit(1)
                ->get();
      
      if(count($news) > 0){
        return ['list' => $news];
      }else{
        $news = DB::table('news')
                ->orderBy('quant_visits', 'desc')
                ->latest()
                ->limit(1)
                ->get();
        return ['list' => $news];
      }
    }
}
