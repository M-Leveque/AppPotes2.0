<?php

namespace App\Services;

class UserService
{
    /**
     * Check if user has access to specific album.
     */
    public function checkUserRights($album, $user){
        if($album->status == AlbumService::PRIVATE_STATUS && $album->id_user != $user->id){
            throw new \Exception("The user does not have access to this album");
        } 
    }
}