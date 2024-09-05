@extends('business.layout')

@section('page')
    <div class="container h-100">
  
  @if(Session::has('file_error'))
  <p class="d-block mx-auto btn btn btn-light text-danger font-weight-bold text-center">
      {{Session::get('file_error')}} @php Session::forget('file_error'); @endphp</p>@endif



    <div class="h-75 w-100 m-auto d-flex align-items-center justify-content-center">

        <div class="w-50 text-center m-auto"><li style="list-style-type: none;" class="nav-item py-1 px-3 text-secondary ">
                        <a href="{{route('add-listing')}}" style="border-radius: 5px;border: 1px solid green;text-decoration: none;" class="px-5 btn btn-outline-success font-weight-bold" href="">Add Business</a>
                    </li> </div>


                    <div class="w-50 text-center m-auto"><li style="list-style-type: none;" class="nav-item py-1 px-3 text-secondary ">
                        <a href="{{route('add-services')}}" style="border-radius: 5px;border: 1px solid green;text-decoration: none;" class="px-5 btn btn-outline-success font-weight-bold" href="">Add Service</a>
                    </li> </div>

<!-- 
        <div class="row w-50 mx-auto">
        <div class="col-sm-12">
            <a href="" data-target="#multiple_doc" data-toggle="modal" class="d-block font-weight-bold btn btn-light border border-dark">Upload Supporting Service Documentation</a>
        </div>

        
    </div>

        <div class="col-sm-12">
            <a style="background:#72c537;" href="" data-target="#add_video" data-toggle="modal" class="d-block font-weight-bold btn border border-dark">Upload supportive video</a>
        </div>

        <div class="col-sm-12"> <span class="my-3 d-block font-weight-bold text-center m-auto"> OR </span>

          <form method="post" action="{{route('embed_service_videos')}}">
            @csrf
           <input class="w-75 d-inline form-control" placeholder="Embed video link" name="link" /> 
           <input value="Embed" type="submit" class="text-light py-1 mb-1 d-inline btn" style="background:#72c537;" >
           </form>

        </div> -->
    </div>




    <!-- ADD DOC MODAL -->
  <div  class="modal fade" id="multiple_doc" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
         <div class="card-header w-100">
           <h3>Add Documents</h3>
        </div>       

        <button type="button" class="m-0 close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    
    
      <div class="modal-body">
        <form action="{{route('add_docs')}}"  method="post" enctype="multipart/form-data">
                                @csrf
                                        
                             <!--   <div class="row ">
                                    <div class="col-12 col-sm-6">
                                        <div class="form-group">
                                            <label>Document Name</label>
                                            <input required="" name="eq_name" type="text"  class="form-control">
                                        </div>
                                    </div> -->


                                    <div class="col-12 col-sm-6">
                                        <div class="form-group">
            <select required=""  name="listing" class="border-none form-control">
            <option hidden class="form-control" >Select Service</option>

            @foreach($services as $b)
            <option value="{{$b->id}}" class="form-control" >{{$b->name}}</option> @endforeach

           </select>
                                        </div>
                                    </div>



                                    <div class="col-12 col-sm-6 my-3">
                                        <div class="form-group">
                                            <label>Files</label>
                                            <input required=""  type="file" multiple name="files[]" class="form-control" >
                                        </div>
                                    </div>

                                   
                           
                                </div>
                                <input type="submit" class="w-50 m-auto my-4 btn btn-primary btn-block" value="Save" />
                            </form>

    </div>
    </div>
    </div>
    </div>
      <!--  ADD MODAL -->



         

      <!-- ADD VIDEO -->
  <div  class="modal fade" id="add_video" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
         <div class="card-header w-100">
           <h3>Upload Media/Video</h3>
        </div>       

        <button type="button" class="m-0 close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    
    
      <div class="modal-body">
        <form action="{{route('add_videos')}}"  method="post" enctype="multipart/form-data">
                                @csrf
                                        
                             <!--   <div class="row ">
                                    <div class="col-12 col-sm-6">
                                        <div class="form-group">
                                            <label>Document Name</label>
                                            <input required="" name="eq_name" type="text"  class="form-control">
                                        </div>
                                    </div> -->


                                    <div class="col-12 col-sm-6">
                                        <div class="form-group">
            <select required=""  name="listing" class="border-none form-control">
            <option hidden class="form-control" >Select Service</option>

            @foreach($services as $b)
            <option value="{{$b->id}}" class="form-control" >{{$b->name}}</option> @endforeach

           </select>
                                        </div>
                                    </div>



                                    <div class="col-12 col-sm-6 my-3">
                                        <div class="form-group">
                                            <label>Files</label>
                                            <input required=""  type="file" multiple name="files" class="form-control" >
                                        </div>
                                    </div>

                                   
                           
                                </div>
                                <input type="submit" class="w-50 m-auto my-4 btn btn-primary btn-block" value="Save" />
                            </form>

    </div>
    </div>
    </div>
    </div>
      <!--  ADD VIDEO -->


    </div>


@endsection
