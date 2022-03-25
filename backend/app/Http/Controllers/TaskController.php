<?php

namespace App\Http\Controllers;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(){
        //shows all  values present in the database
        return Task::orderBy('created_at', 'asc')->get();  //returns values in ascending order
    }

    // not required in an API
    // public function create(){}

    // stores a newly created resource to your storage
    public function store(Request $request)
    {
        //store new values to your database
        $this->validate($request, [ //inputs are not empty or null
            'title' => 'required',
            'description' => 'required',
        ]);
  
        $task = new Task;
        $task->title = $request->input('title'); //retrieving user inputs
        $task->description = $request->input('description');  //retrieving user inputs
        $task->save(); //storing values as an object
        return $task; //returns the stored value if the operation was successful.  
    }

    // Display the specified resource.
    public function show($id)
    {
        // view a particular task in the database
        return Task::findorFail($id); //searches for the object in the database using its id and returns it.

    }

    public function edit($id)
    {
        // edits data
    }

    // Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        //update date in database
        $this->validate($request, [ // the new values should not be null
            'title' => 'required',
            'description' => 'required',
        ]);
  
        $task = Task::findorFail($id); // uses the id to search values that need to be updated.
        $task->title = $request->input('title'); //retrieves user input
        $task->description = $request->input('description');////retrieves user input
        $task->save();//saves the values in the database. The existing data is overwritten.
        return $task; // retrieves the updated object from the database
    }

    public function destroy($id) {
        //deleting data
        $task = Task::findorFail($id); //searching for object in database using ID
        if($task->delete()){ //deletes the object
          return 'deleted successfully'; //shows a message when the delete operation was successful.
        }
    }
}
