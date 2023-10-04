<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVehicleRequest extends FormRequest
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
            'type' => 'required|max:255',
            'name' => 'required|max:255',
            'description' => 'nullable|max:255',
            'image' => 'required|file|image|max:1024',
            'amount' => 'required|numeric|min:0|max:99999999999',
            'plate_number' => 'required|max:255',
            'service_distance' => 'required|numeric|min:0|max:99999999999',
        ];
    }
}
