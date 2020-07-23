<?php

namespace App\Http\Controllers;

use App\Album;
use App\Services\AlbumService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AlbumController extends Controller
{

    private $albumService;

    private const UNDEFINED = "undefined";
    private const FIELD_ID = "id";
    private const FIELD_ID_COVER = "id_cover";
    private const FIELD_NAME = "name";
    private const FIELD_DESCRIPTION = "description";
    private const ERROR = "ALBUM ERROR :";

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->albumService = new AlbumService();
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
        // Feed fields
        $id             = $request->input(self::FIELD_ID);
        $idCover        = $request->input(self::FIELD_ID_COVER);
        $name           = $request->input(self::FIELD_NAME);
        $description    = $request->input(self::FIELD_DESCRIPTION);
        $isUpdate = $id ? true : false;
        $idCover = $idCover === self::UNDEFINED ? false : $idCover;
        try {
            if($isUpdate){
                $this->albumService->update($id, $idCover, $name, $description);
            }
            else{
                $this->albumService->create($idCover, $name, $description);
            }               
        }
        catch(\Exception $e){
            return  response(json_encode(SELF::ERROR." Store : ".$e->getTraceAsString()), Response::HTTP_BAD_REQUEST);
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
            $photos = Album::find($idAlbum);
        }
        catch(\Exception $e){
            return  response(json_encode(SELF::ERROR."Show"), Response::HTTP_BAD_REQUEST);
        }
        return $photos;
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
            $response =  response(\json_encode('Album delete'), Response::HTTP_OK);
        }
        else {
            $response = response(\json_encode('Album not found'), Response::HTTP_BAD_REQUEST);
        }

        return $response;
    }
}
