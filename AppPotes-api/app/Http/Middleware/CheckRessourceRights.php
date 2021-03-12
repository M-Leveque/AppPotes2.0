<?php

namespace App\Http\Middleware;

use Closure;
use App\Photo;
use App\Album;
use App\User;
use App\Services\AlbumService;
use App\Services\UserService;

class CheckRessourceRights
{
    private $userSession;

    private $userService;
    private $albumService;

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $this->userService = new UserService();
        $this->albumService = new AlbumService($this->userService);

        $this->userSession = auth()->guard('api')->user();

        $photo = $request->route('photo');
        $album = $request->route('album');
        $user = $request->route('user');

        if($photo != null){
            $this->managePhotoRigths($photo);
        }
        else if($album != null){
            $this->manageAlbumRigths($album);
        }
        else if($user != null){
            $this->manageUserRigths($user);
        }

        return $next($request);
    }

    private function managePhotoRigths($photo){
        $this->manageAlbumRigths($photo->id_album);
    }


    private function manageAlbumRigths($album){
        $this->albumService->checkUserRights($album, $this->userSession);
    }


    private function manageUserRigths($user){
        $this->userService->checkUserUpdateRights($this->userSession, $user);
    }
}
