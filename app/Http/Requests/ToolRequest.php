<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class ToolRequest extends FormRequest
{
    protected $stopOnFirstFailure = true
;    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'nama_alat' => 'required',
            'keterangan' => 'required',
            'image' => 'required|mimes:jpg,JPG,Jpg,jpeg,Jpeg,JPEG,png,Png,PNG|max:2048',
            'tanggal_masuk' => 'required'
        ];
    }

    public function after(): array
    {
        return [
            function (Validator $validator) {
                if ($this->somethingElseIsInvalid()) {
                    $validator->errors()->add(
                        'field',
                        'Something is wrong with this field!'
                    );
                }
            }
        ];
    }
}
