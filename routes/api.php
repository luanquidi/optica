<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization"); 
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

Route::group(['prefix' => 'v1'], function(){
    Route::apiResource('users','Api\UserController');
    Route::get('search/{document}','Api\UserController@findByDocument');
});