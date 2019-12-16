<?php

namespace App\Http\Controllers;

use App\Album;
use App\Shared\Constants;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AlbumController extends Controller
{

    const PRIVATE_STATUS = 0;
    const PUBLIC_STATUS = 0;

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
     * Store a newly created album in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $id = $request->input('id');
        $isUpdate = $id ? true : false;
        $file = $request->file('file');
        $name = $request->input('name');
        $date = "";
        $description = $request->input('description');
        if($file != null) {

            $path = $name.".".$file->extension();
            // Store album cover in serve
            $file->storePubliclyAs(Constants::IMG_PATH, $path, 'public');
        }

        // Date now
        $now = Carbon::now();

        // Initialise date
        if(!is_string($date) || empty($date)){
            $date = $now->toDateTimeString();
        }

        if(!$isUpdate){
            $album = new Album();
        }
        else {
            $album = Album::find($id);
        }

        // Persist album in database
        try {
            $album->name = $name;
            $album->description = $description;
            $album->status = self::PUBLIC_STATUS;
            if($file != null) $album->artwork = $path;
            $album->date = $now->toDateTimeString();
            $album->date_created = $now->toDateTimeString();
            $album->id_user = 1;
            $album->save();
        }
        catch(Exception $e){
            return  response(json_encode('Error'), Response::HTTP_BAD_REQUEST);
        }

        return response(json_encode('Album created'), Response::HTTP_OK);
    }

    /**
     * Get album informations and photos ids.
     *
     * @param int $idAlbum
     * @return Response
     */
    public function show(int $idAlbum)
    {
        try{
            $photos = Album::find($idAlbum)->photos;
        }
        catch(\Exception $e){
            return  response(json_encode('Error during show album'), Response::HTTP_BAD_REQUEST);
        }
        return $photos;
    }

    /**
     * Get informations about album.
     *  
     * @param int $idAlbum
     * @return Response
     */
    public function infos(int $idAlbum)
    {
        try{
            $album = Album::find($idAlbum);
        }
        catch(\Exception $e){
            return  response(json_encode('Error during infos album'), Response::HTTP_BAD_REQUEST);
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
     * @return Response
     */
    public function update(Request $request, $id)
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
