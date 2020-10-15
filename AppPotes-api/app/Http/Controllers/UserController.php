<?php

namespace App\Http\Controllers;

use App\User;
use App\Services\UserService;
use App\Exceptions\UserException;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->userService = new UserService();
        $this->authUser = auth()->guard('api')->user();
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // 
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // task completed by register
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return response()->json(User::with('photo')->find($user->id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        return auth()->guard('api')->user();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {

        // Feed fields
        try{
            $photo = json_decode($request->getContent())->photo;
            $name = $this->userService->getNameFromRequest($request);
            $description = $this->userService->getDescriptionFromRequest($request);
            $email = $this->userService->getEmailFromRequest($request);
        }
        catch(ValidationException $e){
            throw new UserException(UserException::USER_NOT_VALID, UserException::createError("User", "The user does not have access to this user"));
        }
        
        $this->userService->checkUserUpdateRights($this->authUser, $user);

        // Update user infos
        $user->name = $name;
        $user->description = $description;
        $user->email = $email;
        $user->id_photo = $photo->id;
        $user->save();
                
        return $user;
    }

    /**
     * Update password for specified user
     */
    public function updatePassword(Request $request, User $user){
        // Convert body to user
        $password = $request->input('password');
        $oldPassword = $request->input('oldPassword');

        if($password != null && $oldPassword != null){

            $credentials = ['email'=> $user->email, 'password' => $oldPassword];
            if (Auth::attempt($credentials)) {
                $user->password = Hash::make($password);
                $user->api_token = Str::random(60);
                $user->save();
            }
            else {
                return response("Wrong password", 403);
            }
        }

        return response($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
    }
}
