<?php

namespace App\Services;

use App\Services\AlbumService;
use App\Exceptions\AlbumException;
use App\Exceptions\UserException;
use App\Shared\RequestFieldUtils;

class UserService
{
    const FIELD_ID_PHOTO = "id_photo";
    const FIELD_NAME = "name";
    const FIELD_DESCRIPTION = "description";
    const FIELD_EMAIL = "email";

    /**
     * Check if user has access to this user
     */
    public function checkUserUpdateRights($userConnected, $user){
        if($userConnected->id != $user->id){
            throw new UserException(UserException::USER_FORBIDDEN, UserException::createError("User", "The user does not have access to this user"));
        }
    }

    /**
     * Check if user name is valid and return value
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
        return RequestFieldUtils::validRequestField($request, self::FIELD_DESCRIPTION, 'max:255|regex:/'.RequestFieldUtils::TEXT_REGEX.'/i', $error);
    }

    /**
     * Check if email is valid and returun value
     */
    public function getEmailFromRequest($request){
        $error = [self::FIELD_EMAIL.'.email' => self::FIELD_EMAIL.' must be a valid email'];
        return RequestFieldUtils::validRequestField($request, self::FIELD_EMAIL, 'required|max:50|email', $error);
    }
}