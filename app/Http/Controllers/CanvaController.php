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

    public function edit($id)
    {
        $canva = Canva::find($id);
        return view('fiagma.edit', compact('canva'));
    }
    public function get_lienzo($id)
    {
        $lienzo = Canva::find($id);
        return response()->json([
            'data' => $lienzo,
            'figures' => json_decode($lienzo->figures),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $canva = Canva::find($request->input('idProyecto'));
        $request['figures'] = json_encode($request->input('figures'));
        if ($canva->update($request->all())) {

        return response()->json([
            'message' => "Registro actualizado correctamente",
            'code' => 2,
            'data' => $canva
        ], 200);
        }

        return response()->json([
            'message' => "Error en el servidor",
            'code' => -2,
            'data' => null
        ], 404);
        // $figuras = $request->input('figuras');
        // $idProyecto = ;

        // Realizar las operaciones necesarias con los datos recibidos

        // Retornar la respuesta
        // return response()->json([
        //     'message' => 'Datos recibidos correctamente',
        //     'figuras' => $figuras,
        //     'id' => $idProyecto
        // ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Canva $canva)
    {
        //
    }
}