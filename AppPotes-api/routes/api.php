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

// Routes for api auth
Route::post('login',[ 'as' => 'login', 'uses' => 'Auth\LoginController@login']);
Route::post('register', 'Auth\RegisterController@create');

// Routes for Photos controller
Route::resource('photos','PhotoController');
Route::get('/photos/byAlbum/{album}', 'PhotoController@showByAlbum');
Route::get('/photos/files/{photo}/{thumb}', 'PhotoController@showFile')->middleware('check.rights.photo');

// Routes for Album controller
Route::get('/albums/byUser', 'AlbumController@createdByUser');
Route::resource('albums','AlbumController');

// Routes for User controlle
Route::resource('users','UserController');
Route::put('/users/{user}/update/password', 'UserController@updatePassword');