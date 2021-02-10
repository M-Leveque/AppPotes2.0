<?php

namespace App\Http\Middleware;

use Closure;
use App\Photo;
use App\Album;
use App\Services\AlbumService;
use App\Services\UserService;

class CheckPhotoRights
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $userService = new UserService();
        $albumService = new AlbumService($userService);

        $idPhoto = $request->route('photo');
        $photo = Photo::find($idPhoto);
        $album = Album::find($photo->id_album);
        $user = auth()->guard('api')->user();

        $albumService->checkUserRights($album, $user);

        return $next($request);
    }
}
