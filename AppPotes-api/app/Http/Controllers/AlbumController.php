<?php

namespace App\Http\Controllers;

use App\Album;
use App\Services\AlbumService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AlbumController extends Controller
{

    private $albumService;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

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
        $this->albumService = new AlbumService();

        $id = $request->input('id');
        $isUpdate = $id ? true : false;

        $idCover = $request->input('id-cover');
        $name = $request->input('name');
        $description = $request->input('description');
        $idsPhoto = json_decode($request->input('ids-photo'), true);

        if($idCover === "undefined") $idCover = false;
        
        try {
            if($isUpdate){
                $this->albumService->update($id, $idCover, $name, $description, $idsPhoto);
            }
            else{
                $this->albumService->create($idCover, $name, $description, $idsPhoto);
            }               
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
    public function destroy($id)
    {
        $album = Album::find($id);

        if(isset($album)){
                    // delete photo link to this album
            $album->photos()->delete();

            // delete album
            $album->delete();
            $response =  response(json_encode('Album delete'), Response::HTTP_OK);
        }
        else {
            $response = reponse(\json_encode('Album not found'), Response::HTTP_BAD_REQUEST);
        }

        return $response;
    }
}
