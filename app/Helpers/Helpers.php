<?php

use Illuminate\Support\Facades\Cache;


function UploadImage($request, $NameFile)
{
    $file = $request->file($NameFile);
    $extensions = $file->getClientOriginalExtension();
    $number = mt_rand(1, 999999999999999999);
    $rename = 'data' . $number . '.' . $extensions;
    $file->storeAs('images', $rename, 'public');

    return $rename;
}