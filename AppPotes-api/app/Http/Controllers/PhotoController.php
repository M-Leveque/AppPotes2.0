<?php

namespace App\Http\Controllers;

use App\Photo;
use App\Album;
use App\Services\AlbumService;
use App\Services\PhotoService;
use App\Services\ImageService;
use App\Services\UserService;
use App\Exceptions\PhotoException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use phpDocumentor\Reflection\Types\Boolean;
use Symfony\Component\HttpFoundation\Response;

class PhotoController extends Controller
{

    private $photoService;
    private $albumService;
    private $authUser;

    const THUMBNAIL_WIDTH = 600;
    const THUMBNAIL_HEIGHT =  370;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->albumService = new AlbumService(new UserService());
        $this->photoService = new PhotoService($this->albumService);
        $this->userServce = new UserService();
        $this->authUser = auth()->guard('api')->user();
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return Photo::all();
    }

    /**
     * Show the form for creating a new resource.        $album = Album::find($idAlbum);
     *
     * @return Response
     */
    public function create()
    {
        $array = array(
            "id_album" => 0,
            "name" => null,
            "b64_image" => "");
            
        return response()->json($array);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {   
        // Get fields
        $idAlbum = $request->input('id_album');
        $name = $request->input('name');
        $file = $request->input('b64_image');

        $type = ImageService::getImageType($file);

        $b64File = ImageService::formatB64($file);

        // Check right
        if(!$this->photoService->checkRigths($this->authUser, $idAlbum)){
            return response(json_encode("User has no right to this album"), Response::HTTP_FORBIDDEN);
        }

        // Check validity
        if(!$this->photoService->checkValidity($name)){
            throw new PhotoException(PhotoException::PHOTO_ALREADY_EXIST, PhotoException::createError('photo', 'Image is not valid'));
        }

        $path = $this->photoService->generatePath($idAlbum, $name, $type);
        $thumbPath = $this->photoService->generatePath($idAlbum, $name, $type, true);

        // Store photo on serveur
        ImageService::uploadB64Img($b64File, $path);

        // Store thumbnail on serveur
        ImageService::uploadB64Img($b64File, $thumbPath);

        // Create thumbnail form uplaoded img
        ImageService::createThumbnail($thumbPath, self::THUMBNAIL_WIDTH, self::THUMBNAIL_HEIGHT);

        // Persist photo
        $photo = $this->photoService->persist($name, $path, $thumbPath, $idAlbum, $this->authUser->id);
        
        return response()->json($photo);
    }

    /**
     * Display the specified resource.
     *
     * @param  Photo $photo
     * @return Response
     */
    public function show(Photo $photo)
    {
        return response()->json($photo);
    }

    /**
     * Display the specified photo
     * 
     * @param Photo $photo
     * @return Response File
     */
    public function showFile(Photo $photo, bool $thumb)
    {
        $photopath = $thumb ? $photo->path_thumb : $photo->path;
        return response()->file(Storage::disk('public')->path($photopath));
    }

    /**
     * Display Photos link to album.
     *
     * @param  Album $album
     * @return Response
     */
    public function showByAlbum(Album $album)
    {   
        $this->albumService->checkUserRights($album, $this->authUser);
        return response()->json($album->photos);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Photo $photo
     * @return void
     */
    public function edit(Photo $photo)
    {
        $array = array(
            "id_album" => 0,
            "name" => null,
            "b64_image" => "");
            
        return response()->json($array);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Photo photo
     * @return Response
     */
    public function update(Request $request, Photo $photo)
    {
        // Get fields
        $idAlbum = $request->input('id_album');
        $name = $request->input('name');
        $file = $request->input('b64_image');

        $type = ImageService::getImageType($file);

        $b64File = ImageService::formatB64($file);

        // Delete old photo on serveur
        $this->destroyFile($photo);

        $path = $this->photoService->generatePath($idAlbum, $name, $type);
        $thumbPath = $this->photoService->generatePath($idAlbum, $name, $type, true);

        $photo = $this->photoService->update($name, $path, $thumbPath, $idAlbum, $photo);

        // Store photo on serveur
        ImageService::uploadB64Img($b64File, $path);

        // Store thumbnail on serveur
        ImageService::uploadB64Img($b64File, $thumbPath);
        // Create thumbnail form uplaoded img
        ImageService::createThumbnail($thumbPath, self::THUMBNAIL_WIDTH, self::THUMBNAIL_HEIGHT);

        return response()->json($photo);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Photo $photo
     * @return httpResponse
     */
    public function destroy(Photo $photo)
    {   
        
        if($photo == null) {
            return response()->json("Photo not found", Response::HTTP_NOT_FOUND);
        }

        // Delete photo on server
        $this->destroyFile($photo);

        // Delete photo in database
        $photo->delete();
        return response()->json('Photo deleted');
    }

    /**
     *  Remove file in serveur.
     * @param int $id
     * @return httpResponse
     */
    public function destroyFile(Photo $photo)
    {
        // Delete photo
        Storage::disk('public')->delete($photo->path);
        // Delete thumbnail
        Storage::disk('public')->delete($photo->path_thumb);
        return response();
    }
}
