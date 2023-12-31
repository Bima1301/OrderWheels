<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVehicleBookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'distance' => 'required|numeric|min:0|max:999999999999',
            'liters' => 'required|numeric|min:0|max:999999999999',
            'cost_per_liter' => 'required|numeric|min:0|max:999999999999',
            'description' => 'nullable|string|max:255',
        ];
    }
}
