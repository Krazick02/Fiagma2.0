<?php

namespace App\Http\Controllers;

use App\Models\Canva;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class CanvaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     // dd($request);
        
    // }
    public function store(Request $request)
    {
        $datosFiguras = $request->figuras;

        // dd(json_encode($datosFiguras));

        $lienzo = new Canva;
        // $lienzo->nombre = 'Nombre del lienzo';
        $lienzo->user_id = Auth::user()->id;
        $lienzo->figures = json_encode($datosFiguras);
        $lienzo->save();

        return response()->json([
            'message' => 'Datos de las figuras almacenados correctamente',
            'data' => $lienzo,
            'figuras' => json_decode($lienzo->figures),
            'code' => 200
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Canva $canva)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Canva $canva)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Canva $canva)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Canva $canva)
    {
        //
    }
}
