<?php

namespace App\Http\Controllers;

use App\Photo;
use App\Album;
use App\Services\AlbumService;
use App\Services\ImageService;
use App\Shared\Constants;
use Carbon\Carbon;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class PhotoController extends Controller
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
        return Photo::all();
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
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {   
        // Get fields
        $idalbum = $request->input('id_album');
        $name = $request->input('name');
        $file = $request->input('b64_image');

        // Check if name exist
        $photo = Photo::query()->where("name", '=', $name)->first();
        if($photo != null) return response(json_encode("Image name already exist"), Response::HTTP_BAD_REQUEST);

        // Date now
        $now = Carbon::now();

        // Construct path
        $album = Album::find($idalbum);
        $path = ImageService::generatePath(Constants::IMG_PATH, $name, $album->id);

        // Store photo to bdd
        $photo = new Photo();
        $photo->name = $name;
        // Add 'storage/'.
        $photo->path = Constants::STORAGE_PATH.$path;
        $photo->date = $now->toDateTimeString();
        $photo->date_upload = $now->toDateTimeString();
        $photo->id_user = 1;
        $photo->id_album = $idalbum;
        $photo->save();

        // Store photo on serveur
        ImageService::uploadB64Img($file, $path);

        return response(json_encode($photo), Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show(int $id)
    {
        return Photo::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return void
     */
    public function edit(int $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, int $id)
    {

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
            return  response(json_encode('Photo not found'), Response::HTTP_NOT_FOUND);
        }

        // Delete photo on server
        $this->destroyFile($photo);

        // Delete photo in database
        $photo->delete();

        return response(json_encode('Photo deleted'), Response::HTTP_OK);
    }

    /**
     *  Remove file in serveur.
     * @param int $id
     * @return httpResponse
     */
    public function destroyFile(Photo $photo)
    {
        $path = ImageService::generatePath(Constants::IMG_PATH, $photo->name, $photo->id_album);
        Storage::disk('public')->delete($path);
    }
}
