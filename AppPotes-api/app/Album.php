<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    protected $table        = 'albums';
    protected $connection   = 'mysql';
    protected $primaryKey   = 'id';

    public $timestamps      = false;


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function photos()
    {
        return $this->hasMany('App\Photo', 'id_album');
    }
}
