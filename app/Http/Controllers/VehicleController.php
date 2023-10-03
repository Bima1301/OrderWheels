<?php

namespace App\Http\Controllers;

use App\Enums\VehicleTypeEnum;
use App\Models\Vehicle;
use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use App\Http\Resources\DataToCollection;
use Inertia\Inertia;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // get params
        $keyword = request()->query('keyword');
        $type = request()->query('type');
        $data = [
            "pageName" => "Vehicle",
            'vehicles' => new DataToCollection(Vehicle::where(
                function ($query) use ($keyword, $type) {
                    if ($keyword) {
                        $query->where('name', 'LIKE', "%{$keyword}%");
                    }
                    if ($type) {
                        $query->where('type', $type);
                    }
                }
            )->latest()->paginate(10)),
            'vehicle_type' => VehicleTypeEnum::getValues(),
            'keyword' => $keyword ?? '',
            'type' => $type ?? '',
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
        $vehicleData['image'] = $request->file('image')->store('images/vehicle', 'public');
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
