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
        $error = ["Error" => "Album is not valid", "Fields" => $this->errors];
        return response()->json($error);
    }

    public static function createError($fieldName, $message){
        return [$fieldName => [$message]];
    }
}
