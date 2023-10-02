<?php

namespace App\Http\Controllers;

use App\Enums\VehicleTypeEnum;
use App\Models\Vehicle;
use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use Inertia\Inertia;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = [
            "pageName" => "Vehicle",
            'vehicle_type' => VehicleTypeEnum::getValues(),

        ];
        return Inertia::render('Vehicle/Index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data = [
            "pageName" => "Vehicle",
            'vehicle_type' => VehicleTypeEnum::getValues(),
        ];
        return Inertia::render('Vehicle/Create', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVehicleRequest $request)
    {
        $vehicleData = $request->all();
        $vehicleData['image'] = $request->file('image')->store('images/vihicle', 'public');
        Vehicle::create($vehicleData);

        return redirect()->route('vehicle.index')->with('success', 'Berhasil menambahkan data kendaraan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Vehicle $vehicle)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vehicle $vehicle)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVehicleRequest $request, Vehicle $vehicle)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vehicle $vehicle)
    {
        //
    }
}
