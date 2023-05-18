<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function create()
    {
        return view('users.create');
    }

    public function store(Request $request)
    {

        $user = new User();
        $user->name = $request['username'];
        $user->email = $request['email'];
        $user->password = bcrypt($request['password']); 
        
        $user->save();

        return redirect()->route('login');
    }
}
