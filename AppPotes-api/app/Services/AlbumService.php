<?php

namespace App\Services;

use App\Album;
use App\Photo;
use Carbon\Carbon;

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
        $this->checkValidity($album, $idCover);
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
        $this->checkValidity($album, $idCover);
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
        $album->id_photo = isset($idCover) ? $idCover : 0;
        // Persist on bdd
        $album->save();
    }

    /**
     * Check if album and cover exist in bdd or is new one.
     */
    private function checkValidity($album, $idCover){
        // Check if album exist
        if(is_null($album)) throw new \Exception('Album not exist');
        $photo = Photo::find($idCover);
        // Check if photo exist
        if(is_null($photo)) throw new \Exception('Cover not exist');
    }
}