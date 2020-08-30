<?php

namespace App\Http\Controllers;

use App\Album;
use App\Services\AlbumService;
use App\Services\ImageService;
use App\Services\UserService;
use App\Shared\Constants;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AlbumController extends Controller
{

    private $albumService;
    private $userService;
    private $authUser;

    private const FIELD_ID_COVER = "id_photo";
    private const FIELD_NAME = "name";
    private const FIELD_DESCRIPTION = "description";
    private const FIELD_PUBLIC = "public";
    private const ERROR = "ALBUM ERROR :";

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->userService = new UserService();
        $this->albumService = new AlbumService($this->userService);
        $this->authUser = auth()->guard('api')->user();
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $user = $this->authUser;
        return $this->albumService->getAlbumsByUser($user);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        $album = new album();
        $album->id_cover= null;
        $album->name=null;
        $album->description=null;
        return $album;
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
        $idCover        = $request->input(self::FIELD_ID_COVER);
        $name           = $request->input(self::FIELD_NAME);
        $description    = $request->input(self::FIELD_DESCRIPTION);
        $isPublic       = $request->input(self::FIELD_PUBLIC);

        try {
            $this->albumService->create($idCover, $name, $description, $this->authUser, $isPublic);
        }
        catch(\Exception $e){
            return  response(json_encode(SELF::ERROR." Store : ".$e->getMessage()), Response::HTTP_BAD_REQUEST);
        }
        return response(json_encode('Album created'), Response::HTTP_OK);
    }

    /**
     * Get album informations and photos ids.
     *
     * @param int $idAlbum
     * @return Response
     */
    public function show(Album $album)
    {
        $user = $this->authUser;
        return $this->albumService->getAlbumByUser($user, $album);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Album  $album
     * @return Response
     */
    public function edit(Album $album)
    {
        $album = new album();
        $album->id_cover    =null;
        $album->name        =null;
        $album->description =null;
        return $album;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return Response
     */
    public function update(Request $request, $id)
    {
        // Check user right
        if($this->authUser->id != $id) return response()->json("Only creator can update album", Response::HTTP_FORBIDDEN);
        // Get field
        $idCover        = $request->input(self::FIELD_ID_COVER);
        $name           = $request->input(self::FIELD_NAME);
        $description    = $request->input(self::FIELD_DESCRIPTION);
        $isPublic       = $request->input(self::FIELD_PUBLIC);

        try {
                $this->albumService->update($id, $idCover, $name, $description, $this->authUser, $isPublic);          
        }
        catch(\Exception $e){
            return  response(json_encode(SELF::ERROR." Update : ".$e->getMessage()), Response::HTTP_BAD_REQUEST);
        }
        return response(json_encode('Album created'), Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Album  $album
     * @return Response
     */
    public function destroy(Album $album)
    {
        // Check user right
        if($this->authUser->id != $album->id_user) return response()->json("Only creator can delete album", Response::HTTP_FORBIDDEN);
        // Delete photos on serveur
        foreach($album->photos() as $photo ){
            $path = ImageService::generatePath(Constants::ALBUMS_PATH, $photo->name, $album->id);
            ImageService::deleteImage($path);
        }
        // Delete photos in BDD
        $album->photos()->delete();
        // Delete album
        $album->delete();
        return response(\json_encode('Album delete'), Response::HTTP_OK);
    }
}
