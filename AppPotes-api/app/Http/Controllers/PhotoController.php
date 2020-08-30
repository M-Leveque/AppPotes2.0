<?php

namespace App\Http\Controllers;

use App\Photo;
use App\Album;
use App\Services\AlbumService;
use App\Services\PhotoService;
use App\Services\ImageService;
use App\Shared\Constants;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class PhotoController extends Controller
{

    private $photoService;
    private $albumService;
    private $authUser;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->albumService = new AlbumService();
        $this->photoService = new PhotoService($this->albumService);
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
     * Show the form for creating a new resource.
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

        // Check right
        if(!$this->photoService->checkRigths($this->authUser, $idAlbum)){
            return response(json_encode("User has no right to this album"), Response::HTTP_FORBIDDEN);
        }

        // Check validity
        if(!$this->photoService->checkValidity($name)){
            return response(json_encode("Image name already exist"), Response::HTTP_BAD_REQUEST);
        } 

        $path = $this->photoService->generatePath($idAlbum, $name);

        // Persist photo
        $photo = $this->photoService->persist($name, $path, $idAlbum);

        // Store photo on serveur
        ImageService::uploadB64Img($file, $path);

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
     * Display Photos link to album.
     *
     * @param  int $idAlbum
     * @return Response
     */
    public function showByAlbum(int $idAlbum)
    {   
        $album = Album::find($idAlbum);
        return response()->json($album);
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

        if(!$this->photoService->checkValidity($name)){
            return response(json_encode("Image name already exist"), Response::HTTP_BAD_REQUEST);
        } 

        $path = $this->photoService->generatePath($idAlbum, $name);

        $photo = $this->photoService->update($name, $path, $idAlbum, $photo);

        // Store photo on serveur
        ImageService::uploadB64Img($file, $path);

        return response()->json($photo);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return httpResponse
     */
    public function destroy(int $id)
    {   
        // Get photo in database
        $photo = Photo::find($id);
        
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
        $path = ImageService::generatePath(Constants::ALBUMS_PATH, $photo->name, $photo->id_album);
        Storage::disk('public')->delete($path);
        return response();
    }
}
