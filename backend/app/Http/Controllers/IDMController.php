<?php

namespace App\Http\Controllers;
use App\Models\IDM;
use Illuminate\Http\Request;

class IDMController extends Controller
{
    public function index(){
        //shows all  values present in the database
        return IDM::orderBy('created_at', 'asc')->get();  //returns values in ascending order
    }

    // not required in an API
    // public function create(){}

    // stores a newly created resource to your storage
    public function store(Request $request)
    {
        //store new values to your database
        $this->validate($request, [ //inputs are not empty or null
            'assessment' => 'required'
        ]);
  
        $IDM = new IDM;
        $IDM->assessment = $request->input('assessment'); //retrieving user inputs
        $IDM->score = $request->input('score');  //retrieving user inputs
        $IDM->action_plan = $request->input('action_plan');  //retrieving user inputs
        $IDM->action_plan_completed = $request->input('action_plan_completed');  //retrieving user inputs
        $IDM->save(); //storing values as an object
        return $IDM; //returns the stored value if the operation was successful.  
    }

    // Display the specified resource.
    public function show($id)
    {
        // view a particular IDM in the database
        return IDM::findorFail($id); //searches for the object in the database using its id and returns it.

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
            'assessment' => 'required'
        ]);
  
        $IDM = IDM::findorFail($id); // uses the id to search values that need to be updated.
        $IDM->assessment = $request->input('assessment'); //retrieving user inputs
        $IDM->score = $request->input('score');  //retrieving user inputs
        $IDM->action_plan = $request->input('action_plan');  //retrieving user inputs
        $IDM->action_plan_completed = $request->input('action_plan_completed');  //retrieving user inputs
        $IDM->save();//saves the values in the database. The existing data is overwritten.
        return $IDM; // retrieves the updated object from the database
    }

    public function destroy($id) {
        //deleting data
        $IDM = IDM::findorFail($id); //searching for object in database using ID
        if($IDM->delete()){ //deletes the object
          return 'deleted successfully'; //shows a message when the delete operation was successful.
        }
    }
}
