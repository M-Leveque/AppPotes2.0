<?php

namespace App\Http\Controllers;

use App\Album;
use App\Exceptions\AlbumException;
use App\Services\AlbumService;
use App\Services\ImageService;
use App\Services\UserService;
use App\Shared\Constants;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class AlbumController extends Controller
{

    private $albumService;
    private $userService;
    private $authUser;

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
     * Display a listing of Albums
     * for wich the user has access.
     *
     * @return Response
     */
    public function index()
    {
        $user = $this->authUser;
        return $this->albumService->getAlbumsByUser($user);
    }

    /**
     * Display a listing of Albums
     * created by specific user
     * 
     * @return Response
     */
    public function createdByUser()
    {
        $user = $this->authUser;
        return $this->albumService->getAlbumsCreatedByUser($user);
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
        try{
            $idCover = $this->albumService->getCoverFromRequest($request);
            $name = $this->albumService->getNameFromRequest($request);
            $description = $this->albumService->getDescriptionFromRequest($request);
            $isPublic = $this->albumService->getStatusFromRequest($request);
        }
        catch(ValidationException $e){
            throw new AlbumException( AlbumException::ALBUM_FIELD_NOT_VALID ,$e->errors());
        }

        $album = null;
        $album = $this->albumService->create($idCover, $name, $description, $this->authUser, $isPublic);

        return response($album, Response::HTTP_OK);
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
        // Feed fields
        try{
            $idCover = $this->albumService->getCoverFromRequest($request);
            $name = $this->albumService->getNameFromRequest($request);
            $description = $this->albumService->getDescriptionFromRequest($request);
            $isPublic = $this->albumService->getStatusFromRequest($request);
        }
        catch(ValidationException $e){
            throw new AlbumException(AlbumException::ALBUM_FIELD_NOT_VALID, $e->errors());
        }

        $album = $this->albumService->update($id, $idCover, $name, $description, $this->authUser, $isPublic);          
        return response($album, Response::HTTP_OK);
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
        if($this->authUser->id != $album->id_user){
             throw new AlbumException(AlbumException::ALBUM_FORBIDDEN, AlbumException::createError('id', 'Only creator can delete Album'));
        }
        // Delete photos on serveur
        foreach($album->photos() as $photo ){
            $path = ImageService::generatePath(Constants::ALBUMS_PATH, $photo->name, $album->id);
            ImageService::deleteImage($path);
        }
        // Delete photos in BDD
        $album->photos()->delete();
        // Delete cover
        $album->photo()->delete();
        // Delete album
        $album->delete();
        return response(\json_encode('Album delete'), Response::HTTP_OK);
    }
}
