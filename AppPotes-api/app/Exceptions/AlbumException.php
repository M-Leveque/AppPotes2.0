<?php

namespace App\Exceptions;

use Exception;

class AlbumException extends Exception
{
    private $errors;

    /**
     * Exception constuctor
     */
    public function __construct($errors)
    {
        $this->errors = $errors;
        parent::__construct();
    }

    /**
     * Report the exception.
     *
     * @return void
     */
    public function report()
    {
        //
    }

    /**
     * Render the exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */
    public function render($request)
    {        
        $fields = [];
        $index = 0;
        foreach($this->errors as $fieldName => $msg){
            $fields[$index] = ["name" => $fieldName, "message" => $msg];
            $index++;
        }

        $error = [
            "code" => 001, 
            "label" => "Album not valid", 
            "fields" => $fields
        ];
        return response(json_encode($error), 400);
    }

    public static function createError($fieldName, $message){
        return [$fieldName => [$message]];
    }
}
