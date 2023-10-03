<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleBooking extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function fuel_consumption()
    {
        return $this->hasOne(FuelConsumption::class);
    }

    public function approver()
    {
        return  $this->belongsTo(User::class, 'approved_by');
    }
}
