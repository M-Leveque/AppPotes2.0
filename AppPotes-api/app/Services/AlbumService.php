<?php

namespace App\Services;

use App\Album;
use Carbon\Carbon;
use App\Services\ImageService;
use App\Shared\Constants;

class AlbumService
{
    const PRIVATE_STATUS = 0;
    const PUBLIC_STATUS = 1;

    /**
     * This prepare and persist new album.
     * @param $cover
     * @param $name
     * @param $description
     * @param $photos
     */
    public function create($idCover, $name, $description) {
        // Create new album object
        $album = new Album();
        $this->persist($album, $name, $description, $idCover);
    }

    /**
     * This function update existing album
     * @param $id
     * @param $name
     * @param $description
     * @param $photos
     */
    public function update($id, $idCover, $name, $description) {
        // Create new album object
        $album = Album::find($id);
        // If update -> delete old cover
        if($idCover){
            ImageService::deleteImage(Constants::ALBUMS_PATH.$album->artwork);
        }
        $this->persist($album, $name, $description, $idCover);
    }

    /**
     * This function persist existing or not
     * album in database.
     * @param $album
     * @param $name
     * @param $description
     * @param $path
     */
    private function persist($album, $name, $description, $idCover){
        // Date now
        $now = Carbon::now();
        // Feed album fields
        $album->name = $name;
        $album->description = $description;
        $album->status = self::PUBLIC_STATUS;
        $album->date = $now->toDateTimeString();
        $album->date_created = $now->toDateTimeString();
        $album->id_user = 1;
        $album->id_photo = $idCover;
        // Persist on bdd
        $album->save();
    }
}