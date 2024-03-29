<?php

namespace App\Http\Controllers;

use App\Service;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $services = Service::
            orderBy('status', 'asc')->
            orderBy('created_at', 'desc')->
            paginate(10);

        return view('services.services', compact('services'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('services.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Service::create($request->all());

        return back()->with('status', '¡Servicio creado con éxito!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function show(Service $service)
    {
        $service = Service::find($service->id);

        return view('services.show', compact('service'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function edit(Service $service)
    {
        return view('services.edit', compact('service'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Service $service)
    {
        if (!$request->name) {
            $service->update([
                'status' => $request->status,
                'charge' => $request->charge
            ]);

            return back()->with('status', '¡Servicio cobrado con éxito!');
        }

        $service->update($request->all());

        return back()->with('status', '¡Servicio actualizado con éxito!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function destroy(Service $service)
    {
        try {
            $service->delete();
        } catch (QueryException $ex) {
            return back()->with('error', '¡Ha ocurido un error al eliminar!<br>' . $ex->getMessage());
        }

        return redirect()->route('services.index')->with('status', '¡Servicio eliminado con éxito!');
    }
}
