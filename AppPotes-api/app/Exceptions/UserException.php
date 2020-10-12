<?php

namespace App\Exceptions;

use Exception;

class UserException extends Exception
{
    private $errors;

    public const USER_NOT_VALID = 300;
    public const USER_NOT_EXIST = 301;
    public const USER_FORBIDDEN = 302;

    /**
     * Exception constuctor
     */
    public function __construct($code, $errors)
    {
        $this->code = $code;
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
            "code" => $this->code, 
            "label" => "Photo not valid", 
            "fields" => $fields
        ];
        return response(json_encode($error), 400);
    }

    public static function createError($fieldName, $message){
        return [$fieldName => [$message]];
    }
}
