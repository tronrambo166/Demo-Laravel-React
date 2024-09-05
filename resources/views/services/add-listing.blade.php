@extends('business.layout')

@section('page')
  <div class="container px-0" id="">
        
         @if(Session::has('success'))
        <div class="w-50 m-auto alert font-weight-bold alert-info alert-dismissible fade show" role="alert">
          <p class="font-weight-bold">{{Session::get('success')}}   @php Session::forget('success'); @endphp </p>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>  @endif

        @if(Session::has('error'))
        <div class="w-50 m-auto alert font-weight-bold text-danger alert-warning alert-dismissible fade show" role="alert">
          <p class="font-weight-bold">{{Session::get('error')}}   @php Session::forget('error'); @endphp </p>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>  @endif

        
        <h3 class="bid_header px-5 w-100 text-left my-0 pb-3 py-2 font-weight-bold"> Add Service</h3> 


        @if($connected == 0)
        <div class="row w-75 px-5 my-3">
         <div class="col-sm-12 px-0"> 
            <p class="text-center bg-light p-2 ">Before adding a business, you must onboard to Jitume Stripe platform to receive business milestone payments.</p>
               <a href="{{route('connect.stripe',['id'=>$user_id])}}" class="btn-light border border-dark w-25 m-auto rounded text-center py-1" >Connect to stripe</a>

         </div>
        </div>

        @else 

        <div class="row px-5 my-3">
           
                <div class="col-sm-12">
                  

            <form id="add_listing" action="{{route('create-service')}}"  method="post" enctype="multipart/form-data">
            @csrf   
               
                <div class="row form-group">
                    
                    <div class="col-sm-4"> 
                        <div class="row">
                        
                    <div class="col-sm-12">
                      <label class="mb-0 w-100"><p class="mb-0 d-block w-100 float-left text-left small small_label">Service Title* </p></label>

                    <input required=""  class=" border form-group" type="text" name="title" id="title" placeholder="Service Title"  /> 
                    </div>
                        </div>
                    </div>

                    <div class="col-sm-4"> 
                    <div class="row">                                      
                    <div class="col-sm-12">
                    <label class="mb-0 w-100"><p class="mb-0 d-block w-100 float-left text-left small small_label">Price* </p></label>

                    <input required="" type="number" class="border" placeholder="Price" name="price" value="">                     
                    </div>
                        </div>
                    </div>
                    
                </div>


            <div class="row form-group"> 
                                        
            <div class="col-sm-4">
              <div class="row">                                      
              <div class="col-sm-12">
                 <label class="mb-0 w-100"><p class="mb-0 d-block w-100 float-left text-left small small_label">Services* </p></label>

            <select style="width: 66%;" name="category" class="cat_menu border py-1"><option hidden="hidden" class=""></option> <option value="Business Planning" class="form-control">Business Planning</option> <option value="IT">IT</option> <option value="Legal Project Management">Legal Project Management</option> <option value="Branding and Design">Branding and Design </option> <option value="Auto">Auto</option> <option value="Finance, Accounting &amp; 
                Tax Marketing">Finance, Accounting &amp; 
                Tax Marketing</option> <option value="Tax Marketing">Tax Marketing</option> <option value="Public Relations">Public Relations</option> 
                <option value="0" class="">Project/Asset Management</option>
                <option value="Other">Other</option></select>
            </div>
             </div>
              </div>

                 <div class="col-sm-4"> 
                   <div class="row">                                      
                    <div class="col-sm-12">
                      <label class="mb-0 w-100"><p class="mb-0 d-block w-100 float-left text-left small small_label">Location* </p></label>

                      <input id="searchbox" onkeyup="suggest(this.value);" required="" style="" class=" border d-inline" type="text" name="location" value="" placeholder="Enter a location..."> <!-- onkeyup="suggest(this.value);"  -->
                    <input type="text" name="lat" id="lat" hidden value="">
                    <input type="text" name="lng" id="lng" hidden value="">
                    
                     </div>
                      </div>
                    </div>

                    <div class="row" style="">
                                <div id="result_list" class="" style="display: none;left: 339px;width:25%; z-index: 1000;height: 600px;position: absolute;">
                                    
                                </div>
                    </div>
                       
                    </div>



                   <div class="row my-3 row form-group">
                    <div class="col-sm-12"> 
                        <div class="row">

                    <div class="col-sm-5"> 
                      <label class="mb-0 w-100"><p class="mb-0 d-block w-100 float-left text-left small small_label">Details* </p></label>

                    <textarea class="border" required="" name="details" rows="2" cols="38" placeholder="Details..."></textarea>
                    </div>

                    
                    <div class="col-sm-2 ml-4"> 
                      <label class="mb-0 w-100"><p class="mb-0 d-block w-100 float-left text-left small small_label">Cover* </p></label>

                    <div class="upload-btn-wrapper">
                      <label for="file-upload" class="btnUp2 custom-file-upload">
                                Upload <i class="ml-2 fa fa-arrow-up"></i>
                              </label>
                              <input required id="file-upload" name='image' type="file" style="display:none;">
                    </div>
                    </div>

                    </div>
                    </div> 
                </div>

                
                <div class="row my-5 row form-group">

                    <div class="col-sm-12"> 
                        <div class="row">
                           <div class="col-sm-12"><label class="h5" for="name">
                                <p>Upload mandatory documents below to feature on the platform</p></label>
                               </div>
                               </div> 
                               </div>
                    
                    <div class="col-sm-3"> 

                      <label class="mb-0 w-100"><p class="mb-0 d-block w-100 float-left text-left small small_label">Company/Individual Pin* </p></label>

                    <div class="upload-btn-wrapper px-0">
                      
                      <label for="file-upload2" class="btnUp_listing">
                        Upload
                      <img src="../images/up.png" width="17px"> </label>
                      <input style="" id="file-upload2" required="" type="file" name="pin" />
                      <span class="docs_pdf ml-1 font-weight-bold d-block text-success" >Only docs & pdfs</span>
                    </div>

                    </div>


                    <div class="col-sm-4"> 

                    <div class="upload-btn-wrapper px-1">
                       <label class="mb-0 w-100"><p class="mb-0 d-block w-100 float-left text-left small small_label">Directors Identification(Id/Passport)* </p></label>

                      <label for="file-upload3" class="btnUp_listing"> Upload 
                      <img src="../images/up.png" width="17px"> </label>
                      <input style="" id="file-upload3" required="" type="file" name="identification" />
                      <span class="text-left docs_pdf ml-1 font-weight-bold d-block text-success" >Only docs & pdfs</span>
                    </div>

                    </div>


                </div>



        <div class="row my-4 form-group">

          <div class="col-sm-3"> 

                    <div class="upload-btn-wrapper d-block">
                       <label class="mb-0 w-100"><p class="mb-0 d-block w-100 float-left text-left small small_label">Supportive video* </p></label>

                     <label for="file-upload5" class="btnUp_listing"> Upload 
                      <img src="../images/up.png" class="text-light" width="17px"> </label>
                      <input style="display:none;" id="file-upload5" type="file" name="video" />
                    </div>

                    <div class="d-block"> <span class="my-3 d-block font-weight-bold text-center m-auto"> OR </span>
          
                     <input class="border w-100 d-blocks d-inline " placeholder="Embed video link" name="link" /> 
                     </div>

                    </div>


                    <div class="col-sm-4"> 

                    <div class="upload-btn-wrapper d-block">
                      <label class="mb-0 w-100"><p class="mb-0 d-block w-100 float-left text-left small small_label">Supporting Business Documentation* </p></label>

                      <label for="file-upload4" class="btnUp_listing">  Upload
                      <img src="../images/up.png" width="17px"> </label>
                      <input style="" id="file-upload4" required="" type="file" name="document" />
                      <span class="docs_pdf ml-1 font-weight-bold d-block text-success" >Only docs & pdfs</span>
                    </div>

                    </div>
      
            
          </div>




                <div class="row w-50 text-center my-5"> 
                    <button id="save2" style="width:99%;background: #246424;" class="proceed_btn m-auto pt-3 btn text-white font-weight-bold">SAVE</button>
                  </div>


            </form>


                    </div>
                  
                    
                </div>

                @endif
                

            </div>


            <div class="clear"></div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

       <script type="text/javascript">
           $('#file-upload').change(function() {
              var i = $(this).prev('label').clone();
              var file = $('#file-upload')[0].files[0].name;
              $(this).prev('label').text(file);
            });

            $('#file-upload2').change(function() {
              var i = $(this).prev('label').clone();
              var file = $('#file-upload2')[0].files[0].name;
              $(this).prev('label').text(file);
            });

            $('#file-upload3').change(function() {
              var i = $(this).prev('label').clone();
              var file = $('#file-upload3')[0].files[0].name;
              $(this).prev('label').text(file);
            });

            $('#file-upload4').change(function() {
              var i = $(this).prev('label').clone();
              var file = $('#file-upload4')[0].files[0].name;
              $(this).prev('label').text(file);
            });

            $('#file-upload5').change(function() {
              var i = $(this).prev('label').clone();
              var file = $('#file-upload5')[0].files[0].name;
              $(this).prev('label').text(file);
            });
        </script>


  <script type="text/javascript">
  
    function bookForm(shift) {
      $('#choose').hide();
      $('#booking').show();
    }

    function paid_price() {
      $('#paid_price').show();  
    }
     function free_price() {
      $('#paid_price').hide(); 
    }
  </script>

@endsection



