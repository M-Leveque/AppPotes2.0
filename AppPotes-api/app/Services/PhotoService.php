<?php

namespace App\Services;

use Carbon\Carbon;
use App\Photo;
use App\Album;
use App\Shared\Constants;
use App\User;
use Faker\Provider\Image;

class PhotoService
{

    private AlbumService $albumService;

    public function __construct(AlbumService $albumService){
        $this->albumService = $albumService;
    }

    /**
     * Persist photo in bdd
     */
    public function persist($name, $path, $idAlbum){
        // Date now
        $now = Carbon::now();

        // Store photo to bdd
        $photo = new Photo();
        $photo->name = $name;
        $photo->path = Constants::STORAGE_PATH.$path;
        $photo->date = $now->toDateTimeString();
        $photo->date_upload = $now->toDateTimeString();
        $photo->id_user = 1;
        $photo->id_album = $idAlbum;
        $photo->save();

        return $photo;
    }

    /**
     * Persist photo in bdd
     */
    public function update($name, $path, $idAlbum, $photo){
        // Date now
        $now = Carbon::now();

        $photo->name = $name;
        $photo->path = Constants::STORAGE_PATH.$path;
        $photo->date = $now->toDateTimeString();
        $photo->id_album = $idAlbum;
        $photo->save();

        return $photo;
    }

    /**
     * Check photo validity
     */
    public function checkValidity($name){
        // Check if name is null
        if($name == null) return false;
        // Check if name exist
        $photo = Photo::query()->where("name", '=', $name)->first();
        if($photo != null) return false;
        return true;
    }

    /**
     * Check if user is allowed to use this album
     */
    public function checkRigths(User $user ,int $idAlbum) :bool{
        // Get access albums
        $albums = $this->albumService->getAlbumsByUser($user);
        foreach($albums as $album){
            if ($album->id == $idAlbum) return true;
        }

        return false;
    }

    /**
     * Generate path for photo
     */
    public function generatePath($idAlbum, $name, $type)
    {
        $album = Album::find($idAlbum);
        return ImageService::generatePath(Constants::ALBUMS_PATH, $name, $type, $album->id);
    }
}