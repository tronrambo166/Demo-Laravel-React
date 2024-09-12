<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function checkAuth() {
         return response()->json([
            'user' => Auth::user()
            //'auth' => Auth::check()
        ]);
    }
    
    public function login(LoginRequest $request)
    {   
        //if(Auth::check()) return 'yes'; else return 'no';
        $data = $request->validated();
        if(!Auth::attempt($data)){
            return response([
                'message' => 'email or password are wrong',
                'auth' => Auth::check()
            ]);
        }
        $user = Auth::user(); 
        $token = $user->createToken('main')->plainTextToken; 

        return response()->json([
            'user' => $user,
            'token' => $token,
            'auth' => Auth::check()
        ]);

    }

    public function register(RegisterRequest $request)
    {   
        $mname = $request->mname;
        $gender = $request->gender;
        $dob = $request->dob;

        $data = $request->validated();
        $user = User::create([

            'fname' => $data['fname'],
            'mname' => $mname,
            'lname' => $data['lname'],
            'email' => $data['email'],
            'gender' => $mname,
            'dob' => $dob,
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
            'auth' => Auth::check()
        ]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        $user->currentAccessToken()->delete();

        return response('',204);
    }
}