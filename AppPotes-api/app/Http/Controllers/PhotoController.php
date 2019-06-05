<?php

namespace App\Http\Controllers;

use App\Photo;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PhotoController extends Controller
{
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
        $photoArray = $request->json()->all();

        try {
            $photo = new Photo();
            $photo->name = $photoArray["name"];
            $photo->path = $photoArray["path"];
            $photo->date = $photoArray["date"];
            $photo->date_upload = $photoArray["date_upload"];
            $photo->id_user = $photoArray["id_user"];
            $photo->save();
        }
        catch(Exception $e){
            return Response::create("Error during store the new photo", Response::HTTP_BAD_REQUEST);
        }

        return Response::create("The photo was created", Response::HTTP_CREATED);
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

        return Response::create($photo->toJson(), Response::HTTP_OK, Array("Content-Type" => "application/json"));
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
        // Delete photo in database
        Photo::query()->where("id", "=", $id)->delete();
    }
}
