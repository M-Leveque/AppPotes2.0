<?php

namespace App\Http\Controllers;

use App\Album;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AlbumController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return Album::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param int $idAlbum
     * @return Response
     */
    public function show(int $idAlbum)
    {
        try{
            $album = Album::find($idAlbum)->photos;
        }
        catch(\Exception $e){
            return Response::create("Error during store the new photo", Response::HTTP_BAD_REQUEST);
        }
        return $album;
    }

    public function infos(int $idAlbum)
    {
        try{
            $album = Album::find($idAlbum);
        }
        catch(\Exception $e){
            return Response::create("Error during store the new photo", Response::HTTP_BAD_REQUEST);
        }
        return $album;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Album  $album
     * @return Response
     */
    public function edit(Album $album)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Album  $album
     * @return Response
     */
    public function update(Request $request, Album $album)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Album  $album
     * @return Response
     */
    public function destroy(Album $album)
    {
        //
    }
}
