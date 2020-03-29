<?php

namespace App\Http\Controllers;

use App\Photo;
use App\Album;
use App\Services\AlbumService;
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
        $id = $request->input('id');
        $file = $request->input('file');
        $path = 'tmp/'.$id.".png";

        AlbumService::uploadImg($file, $path);

        return response(json_encode(array('id' => $id)), Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show(int $id)
    {
        $photo = Photo::query()->where("id", '=', $id)->first();

        if($photo == null)
        {
            return Response::create("Photo not found", Response::HTTP_NOT_FOUND);
        }

        $path = $path = asset(Constants::IMG_PATH . $photo->path);
        $ext = explode('.',$photo->path);

        return response()->download($path, $photo->path, ['Content-Type' => $ext]);
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
            return  response(json_encode('Photo deleted'), Response::HTTP_BAD_REQUEST);
        }

        //Delete photo on server
        Storage::disk('public')->delete(Constants::IMG_PATH.$photo->path);

        // Delete photo in database
        $photo->delete();

        return response(json_encode('Photo deleted'), Response::HTTP_OK);
    }

    /**
     *  Remove file in serveur.
     * @param int $id
     * @return httpResponse
     */
    public function destroyFile(int $id)
    {
        Storage::disk('public')->delete(Constants::IMG_PATH."tmp/".$id.'.png');
        return response(json_encode('File deleted'), Response::HTTP_OK);
    }
}
