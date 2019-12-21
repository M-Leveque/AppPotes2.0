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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Routes for Photos controller
Route::delete('/photos/deleteTmpFile/{name}', 'PhotoController@destroyFile');
Route::resource('photos','PhotoController');

// Routes for Album controller
Route::get('/albums/infos/{id}', 'AlbumController@infos');
Route::post('/albums/{id}', 'AlbumController@update');
Route::resource('albums','AlbumController');
