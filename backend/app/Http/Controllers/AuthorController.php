<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Author;

class AuthorController extends Controller
{
    //return everything from Author
    public function index(){
        return Author::all();
    }

    // POST
    public function store(Request $request){
        //validate request
        $validated = $request->validate([
            'author' => 'required|max:255',
            'description' => 'required'
        ]);

        if ($validated){
            $author = new Author;
            $author->author = $request->author;
            $author->description = $request->description;
            $author->save();
        }
    }
}
