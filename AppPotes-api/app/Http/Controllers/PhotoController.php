<?php

namespace App\Http\Controllers;

use App\Photo;
use App\Album;
use Carbon\Carbon;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class PhotoController extends Controller
{
    const PHOTO_PATH = "img/";

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
        $idAlbum = $request->input('id');

        // Get album infos
        $album = Album::find($idAlbum);

        var_dump($idAlbum);
        var_dump($album);

        $date = $request->input('date');
        $name = $request->input('name');
        $file = $request->file('file');
        $path = $album->name .'/'.$name.".".$file->extension();

        // Store photo in serve
        $this->upload($path, $file);

        // Date now
        $now = Carbon::now();

        // Initialise date
        if(!is_string($date) || empty($date)){
            $date = $now->toDateTimeString();
        }

        // Store photo in database
        try {
            $photo = new Photo();
            $photo->name = $name;
            $photo->path = $path;
            $photo->date = $date;
            $photo->date_upload = $now->toDateTimeString();
            $photo->id_user = 1;
            $photo->id_album = $idAlbum;
            $photo->save();
        }
        catch(Exception $e){
            return Response::create("Error during store the new photo", Response::HTTP_BAD_REQUEST);
        }

        return Response::create("Photo created", Response::HTTP_CREATED);
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

        $path = $path = asset(self::PHOTO_PATH . $photo->path);
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
        // Get an array of photo
        $request = $request->json()->all();

        // Find photo in database
        $photo = Photo::query()->where("id", "=", $id)->first();

        // Update photo
        if($photo != null )
        {
            if (isset($request["name"]))
                $photo->name = $request["name"];
            if (isset($request["path"]))
                $photo->path = $request["path"];
            if (isset($request["date"]))
                $photo->date = $request["date"];
            if (isset($request["date_upload"]))
                $photo->date_upload = $request["date_upload"];
            if (isset($request["id_user"]))
                $photo->id_user = $request["id_user"];
            var_dump($photo);
            $photo->save();
        }
        // If photo wasn't found
        else
        {
            return Response::create("Photo not found", Response::HTTP_NOT_FOUND);
        }

        // Return HTTP OK
        return Response::create("Photo as been update", Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return void
     */
    public function destroy(int $id)
    {   
        // Get photo in database
        $photo = Photo::find($id);

        var_dump(self::PHOTO_PATH.$photo->path);

        //Delete photo on server
        Storage::disk('public')->delete(self::PHOTO_PATH.$photo->path);

        // Delete photo in database
        $photo->delete();
    }

    /**
     * Method for upload file
     * @param $name
     * @param $file
     * @return string
     */
    private function upload(String $name, UploadedFile $file){
        $file->storePubliclyAs(self::PHOTO_PATH, $name, 'public');
    }
}
