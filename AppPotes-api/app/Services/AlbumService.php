<?php

namespace App\Services;

use App\Album;
use App\Exceptions\AlbumException;
use App\Shared\RequestFieldUtils;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;

class AlbumService
{

    const FIELD_ID_COVER = "id_photo";
    const FIELD_NAME = "name";
    const FIELD_DESCRIPTION = "description";
    const FIELD_PUBLIC = "status";

    const PRIVATE_STATUS = 0;
    const PUBLIC_STATUS = 1;

    private $userService;

    public function __construct($userService){
        $this->userService = $userService;
    }

    /**
     * Check if user has access to specific album.
     */
    public function checkUserRights($album, $user){
        if(!($album instanceof Album) || ($album->status == AlbumService::PRIVATE_STATUS && $album->id_user != $user->id)){
            throw new AlbumException(AlbumException::ALBUM_FORBIDDEN, AlbumException::createError("User","The user does not have access to this album"));
        } 
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
        $this->checkValidity($album, $isPublic, true, $name);
        // Set creator of album
        $album->id_user = $authUser->id;
        $this->persist($album, $name, $description, $idCover, $isPublic);
        return $album;
    }

    /**
     * This function update existing album
     * @param $id
     * @param $name
     * @param $description
     * @param $photos
     */
    public function update($album, $idCover, $name, $description, $authUser, $isPublic) {
        $this->checkValidity($album, $isPublic, false);
        $this->persist($album, $name, $description, $idCover, $isPublic);
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
    private function persist($album, $name, $description, $idCover, $isPublic){
        // Date now
        $now = Carbon::now();
        // Feed album fields
        $album->name = $name;
        $album->description = $description == null ? "" : $description;
        $album->status = $isPublic ? self::PUBLIC_STATUS : self::PRIVATE_STATUS;
        $album->date = $now->toDateTimeString();
        $album->date_created = $now->toDateTimeString();
        $album->id_photo = isset($idCover) ? $idCover : 0;
        // Persist on bdd
        $album->save();
    }

    /**
     * Check if album and cover exist in bdd or is new one.
     */
    private function checkValidity($album, $isPublic, $isCreation, $name=null){

        // Check if album exist
        if($isCreation){
            // Two album can't have same name
            $albumDB = Album::where('name', '=', $name)->get();
            if(!$albumDB->isEmpty()) throw new AlbumException(AlbumException::ALBUM_ALREADY_EXIST, AlbumException::createError('id', 'Album already exist'));
        }
        else {
            // Album must exist to be modified
            if(is_null($album)) throw new AlbumException(AlbumException::ALBUM_NOT_EXIST, AlbumException::createError('id', 'Album does not exist'));
        }
        // Check public value
        if(!is_bool($isPublic) || is_null($isPublic)) throw new AlbumException(AlbumException::ALBUM_FIELD_NOT_VALID, AlbumException::createError(self::FIELD_PUBLIC, self::FIELD_PUBLIC.' must be a valid boolean'));
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

    /**
     * Check if album cover is valid and return value
     */
    public function getCoverFromRequest($request){
        $error = [self::FIELD_ID_COVER.'.integer' => self::FIELD_ID_COVER.' must be a integer'];
        return RequestFieldUtils::validRequestField($request, self::FIELD_ID_COVER, 'nullable|integer', $error);
    }

    /**
     * Check if album name is valid and return value
     */
    public function getNameFromRequest($request){
        $error = [
            self::FIELD_NAME.'.required' => self::FIELD_NAME.' is Required', 
            self::FIELD_NAME.'.max' => self::FIELD_NAME.' must be less than 25 characters long',
            self::FIELD_NAME.'.regex' => self::FIELD_NAME.' contains invalid characters'
        ];
        return RequestFieldUtils::validRequestField($request, self::FIELD_NAME, 'required|max:25|regex:/'.RequestFieldUtils::TEXT_REGEX.'/i', $error);
    }

    /**
     * Check if description is valid and return value
     */
    public function getDescriptionFromRequest($request){
        $error = [
            self::FIELD_DESCRIPTION.'.max' => self::FIELD_DESCRIPTION.' must be less than 255 characters long', 
            self::FIELD_DESCRIPTION.'.regex' => self::FIELD_DESCRIPTION.' contains invalid characters'
        ];
        return RequestFieldUtils::validRequestField($request, self::FIELD_DESCRIPTION, 'nullable|max:255|regex:/'.RequestFieldUtils::TEXT_REGEX.'/i', $error);
    }

    /**
     * Check if status is valid and returun value
     */
    public function getStatusFromRequest($request){
        $error = [self::FIELD_PUBLIC.'.boolean' => self::FIELD_PUBLIC.' must be a boolean'];
        return RequestFieldUtils::validRequestField($request, self::FIELD_PUBLIC, 'boolean', $error);
    }
}