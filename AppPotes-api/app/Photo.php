<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    protected $table        = 'photos';
    protected $connection   = 'mysql';
    protected $primaryKey   = 'id';

    public $timestamps      = false;
}
