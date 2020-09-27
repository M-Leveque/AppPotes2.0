<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
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

        // Convert body to user
        $userUpdate = json_decode($request->getContent());

        // Update user infos
        $user->name = $userUpdate->name;
        $user->description = $userUpdate->description;
        $user->email = $userUpdate->email;
        $user->id_photo = $userUpdate->photo->id;
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
