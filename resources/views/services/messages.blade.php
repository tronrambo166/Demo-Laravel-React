@extends('business.layout')

@section('page')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div class="container px-0" id="">
        
        @if(Session::has('success_update'))
        <div class="w-50 m-auto alert font-weight-bold alert-success alert-dismissible fade show" role="alert">
          <p class="font-weight-bold">{{Session::get('success_update')}}   @php Session::forget('success_update'); @endphp </p>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>  @endif

<style type="text/css">
    .showFormB input, .showFormB select {
    border-top: 1px solid #7c7c7c;
    border-left: 1px solid #c3c3c3;
    border-right: 1px solid #c3c3c3;
    border-bottom: 1px solid #ddd;
    background: #fff;
    height: 28px;
}

</style>
      
    <div class="row m-auto px-3 ">   
    <h3 class="px-0 bid_header my-0 text-left pb-3 py-2 font-weight-bold">Messages</h3>  


    @if(count($results)==0)
         <div class="p-3"> 

             <div class="w-50 m-auto d-block">
                 <img width="120px" src="../images/randomIcons/no_data.png">
                 <p class="text-left ml-2 font-weight-bold">No Data Found!</p>
             </div>
          </div>
         

      @else

     <table class="eq table" id="">
     <thead class="table_head border">
        <tr>

            <th class="ml-1">From </th>
            <th class="ml-1">Related Service </th>
            <th class="w-25 ml-1">Message</th> 
            <th class="ml-1">Time</th>  
            <th class="w-25 ml-1">Reply</th>       
        </tr>

    </thead>
    
    <tbody>
        @foreach($results as $ev)
        <tr onclick="bg_change({{$ev->id}});" id="{{$ev->id}}" >
           <!--  <td><input onchange="check();" type="checkbox" name="bid_ids[]" value="{{$ev->id}}"></td> -->

                <td>
                <a data-target="#detailsModal{{$ev->id}}" data-toggle="modal" class="py-1 bid_btns bg-light rounded ">{{$ev->sender }}</a>
                </td>

                    <td>{{$ev->service }}</td>
                    <td>{{$ev->msg }}</td> 
                    <td>{{date('d M, h:ia',strtotime($ev->created_at)) }}</td>
                    
                <td>
                        <form action="{{route('serviceReply')}}" method="post" class=""> @csrf
                          <div class=" py-1 ">

                              <textarea placeholder="Enter message..." rows="1" cols="26" required name="msg" class="w-75 border mt-0"></textarea>

                              <button type="submit" 
                              class="py-0 mt-0  btn border w-25 small btn text-dark float-right">Send
                            </button>  
                            </div>
                            <input hidden type="number" name="service_id" value="{{$ev->service_id}}">
                            <input hidden type="number" name="msg_id" value="{{$ev->id}}">                         
                                                    

                        </form>
                    </td>
   
        </tr>



<!-- Table temp end -->

<!-- Details MODAL -->
  <div  class="detailsModal modal fade" id="detailsModal{{$ev->id}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content detailModal">
      <div class="modal-header">

         <div class="card-header px-3 w-100">
           <h4 class="text-left"> <b> Details </b> </h4>
        </div>

        </div>
    
    
      <div class="modal-body">
                <div class="px-3 card-header w-100">             
            <!-- <input hidden type="number" class="form-control"  name="amount" value=""> -->                     

                <div class="row my-1 row form-group">
                    <div class="col-sm-12 my-1"> 
                    <div class="row">
                           <div class="col-sm-10"><label class="h4" for="name">
                                <h5 class=""> <b> Full Name: </b> </h5></label>
                               </div>
                    
                    <div class="col-sm-12"> 
                        <div class="upload-btn-wrapper">
                        <p>{{$ev->sender}}</p>
                        </div>
                    </div>

                    </div>
                    </div> 
                </div>



                <div class="row my-1 row form-group">
                    <div class="col-sm-12 my-1"> 
                    <div class="row">
                           <div class="col-sm-10"><label class="h4" for="name">
                                <h5 class=""> <b> Current Website or Web Presence: </b> </h5></label>
                               </div>
                    
                    <div class="col-sm-12"> 
                        <div class="upload-btn-wrapper">
                        <p>{{$ev->website}}</p>
                        </div>
                    </div>

                    </div>
                    </div> 
                </div>


                <div class="row my-1 row form-group">
                    <div class="col-sm-12 my-1"> 
                    <div class="row">
                           <div class="col-sm-10"><label class="h4" for="name">
                                <h5 class=""> <b> Email: </b> </h5></label>
                               </div>
                    
                    <div class="col-sm-12"> 
                        <div class="upload-btn-wrapper">
                        <p>{{$ev->email}}</p>
                        </div>
                    </div>

                    </div>
                    </div> 
                </div>


         </div>

        </div>

        <div class="modal-footer">

        <div class="card-header w-100 text-center">


        <button type="button" class=" btn border border-dark w-25 d-inline px-3 font-weight-bold m-0 " data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">Ok</span>
        </button>

        
         </div>

      </div>

        </div>
        </div>
        </div>


<!-- Details MODAL -->

         @endforeach
         
    
    </tbody> 
    
    
</table>
@endif
 
<!--  <div class="row ml-auto" style="width:35%;"> 
 <div class="col-sm-6 float-right"> </div>             
<div class="col-sm-6 float-right">
    <a id="fakeBtn" onclick="accept();" type="submit" class="bid-accept text-center float-right border border-dark font-weight-bold btn text-mute py-1 w-100 mx-auto">Confirm</a>

    <button style="background:green;" id="realBtn" type="submit" class="bid-accept collapse float-right font-weight-bold btn text-light w-100 mx-auto">Confirm</button>
</div>
</div> -->

</div>



</div>


<script type="text/javascript">
  function accept() {
            alert('Please select a booking!');
    }

    function check() {
    var checked  = '';
    [...document.querySelectorAll('input[name="bid_ids[]"]:checked')]
   .forEach((cb) => checked = checked+cb.value+',');

        var ids = checked;
        if(ids != '')
        {
        $('#fakeBtn').hide();
        $('#fakeBtnR').hide();
        $('#realBtn').show();
        $('#realBtnR').show();   
        }
        else{
        $('#fakeBtn').show();
        $('#fakeBtnR').show();
        $('#realBtn').hide();
        $('#realBtnR').hide();
        }
    }


    // window.onload = function() {
    // alert('ok')
    // };
</script>
                


@endsection



