<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    
    public function index()
    {
        return User::orderBy('created_at', 'DESC')->paginate(15);

    }

    public function store(Request $request)
    {

        $user = new User;

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'document' => 'required|string',
            'type_document' => 'required|string',
            'password' => 'required|confirmed|min:6',
            'password_confirmation' => 'required|min:6'
        ]);

        if ($validator->fails()) {
            return [
                'statusServer' => 422,
                $validator->getMessageBag()
            ];
        }


        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->document = $request->document;
        $user->type_document = $request->type_document;
        $user->password = Hash::make($request->password);


        if($user->save()){
            $response = [
                'status' => 200,
                'mensagge' => 'Se ha guardado el usuario exitosamente',
                'user' => $user 
            ];
        }else{

            $response = [
                'status' => 500,
                'menssage' => 'No se ha guardado el usuario :(',
            ];
        }

        return $response;


    }

    
    public function show(User $user)
    {
        return $user;
    }

    public function findByDocument($document)
    {   
        $user = User::where('document', $document)->get();

        if(count($user)){
            return [
                'status' => 200,
                'data' => $user
            ];
        }else{

            return [
                'status' => 404,
                'menssage' => 'No hay usuarios registrados con esta información'
            ];
        }

    }

    
    public function update(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'document' => 'required|string',
            'type_document' => 'required|string',
        ]);

        if ($validator->fails()) {
            return [
                'statusServer' => 422,
                $validator->getMessageBag()
            ];
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->document = $request->document;
        $user->type_document = $request->type_document;

        if($user->save()){
            $response = [
                'status' => 200,
                'mensagge' => 'Se ha actualizado el usuario exitosamente',
                'user' => $user 
            ];
        }else{

            $response = [
                'status' => 500,
                'menssage' => 'No se ha actualizado el usuario :(',
            ];
        }

        return $response;

    }

    
    public function destroy(User $user)
    {
        $user->delete();

        return [
            'status' => 200,
            'message' => 'Eliminado correctamente'
        ];
    }
}
