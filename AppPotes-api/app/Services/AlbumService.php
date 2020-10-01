<?php

namespace App\Services;

use App\Album;
use App\Photo;
use Carbon\Carbon;
use Hamcrest\Type\IsBoolean;
use Illuminate\Database\Eloquent\Builder;
use phpDocumentor\Reflection\Types\Boolean;

class AlbumService
{
    const PRIVATE_STATUS = 0;
    const PUBLIC_STATUS = 1;

    private UserService $userService;

    public function __construct(UserService $userService){
        $this->userService = $userService;
    }

    /**
     * This prepare and persist new album.
     * @param $cover
     * @param $name
     * @param $description
     * @param $photos
     */
    public function create($idCover, $name, $description, $authUser, $isPublic) {
        // Create new album object
        $album = new Album();
        $this->checkValidity($album, $isPublic);
        $this->persist($album, $name, $description, $idCover, $authUser, $isPublic);
        return $album;
    }

    /**
     * This function update existing album
     * @param $id
     * @param $name
     * @param $description
     * @param $photos
     */
    public function update($id, $idCover, $name, $description, $authUser, $isPublic) {
        // Create new album object
        $album = Album::find($id);
        $this->userService->checkUserRights($album, $authUser);
        $this->checkValidity($album, $isPublic);
        $this->persist($album, $name, $description, $idCover, $authUser, $isPublic);
        return $album;
    }

    /**
     * This function persist existing or not
     * album in database.
     * @param $album
     * @param $name
     * @param $description
     * @param $path
     */
    private function persist($album, $name, $description, $idCover, $authUser, $isPublic){
        // Date now
        $now = Carbon::now();
        // Feed album fields
        $album->name = $name;
        $album->description = $description;
        $album->status = $isPublic ? self::PUBLIC_STATUS : self::PRIVATE_STATUS;
        $album->date = $now->toDateTimeString();
        $album->date_created = $now->toDateTimeString();
        $album->id_user = $authUser->id;
        $album->id_photo = isset($idCover) ? $idCover : 0;
        // Persist on bdd
        $album->save();
    }

    /**
     * Check if album and cover exist in bdd or is new one.
     */
    private function checkValidity($album, $isPublic){
        // Check if album exist
        if(is_null($album)) throw new \Exception('Album not exist');
        // Check public value
        if(!is_bool($isPublic) || is_null($isPublic)) throw new \Exception('Public field has a wrong type');
    }

    /**
     * Return all albums where user has authorisation
     */
    public function getAlbumsByUser($user){
        
        $status = self::PUBLIC_STATUS;

        return Album::with('photo')->orWhere(function (Builder $query) use ($status) {
            return $query->where('status', $status);
        })->orWhere(function (Builder $query) use ($user) {
            return $query->where('id_user', $user->id);
        })->get();
    }

    public function getAlbumByUser($user, $album){
        
        $status = self::PUBLIC_STATUS;

        return Album::with('photo')->where('id', $album->id)
        ->where(function($q) use ($user, $status){
            $q->where('id_user', $user->id)
            ->orWhere('status', $status);
        })->get();
    }

    public function getAlbumsCreatedByUser($user){
        return Album::with('photo')->where('id_user', $user->id)->get();
    }
}