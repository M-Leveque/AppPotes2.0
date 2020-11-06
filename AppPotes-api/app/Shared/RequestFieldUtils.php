<?php

namespace App\Shared;

use App\Services\AlbumService;

class RequestFieldUtils
{

    public const TEXT_REGEX = "^[0-9A-Za-zÀ-ÖØ-öø-ÿ '_-]+$";

    /**
     * Valid field and return value.
     * @param $request
     * @param $field : request field to validate
     * @param $validationRequirement : condition for validation ( ex : 'required|max:255')
     * @param $errorArray : Array of error message for validationRequirement ( ex : ['field.required' => 'field required'])
     */
    public static function validRequestField($request, $field, $validationRequirement, $errorArray){
        $data = $request->validate([$field => $validationRequirement], $errorArray);
        if(empty($data)) return null;
        return $data[$field];
    }
}