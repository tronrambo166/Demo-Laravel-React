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
    

    @if(count($results)==0)
    <div class="p-3"> 
             <div class="w-50 m-auto d-block">
                 <img width="120px" src="../images/randomIcons/no_data.png">
                 <p class="text-left ml-2 font-weight-bold">No Data Found!</p>
             </div>
    </div>

    @else
  
    <div class="row m-auto px-5">   
    <h3 class="px-0 bid_header my-0 text-left pb-3 py-2 font-weight-bold">My Booking</h3>     
     <table class="eq table" id="">
    <thead class="table_head border">
        <tr>
            <th>Date </th>
            <th>Service Name </th>
            <th>Category</th>
            <th>Notes </th>  
            <th>Start Date  </th> 
            <th>Location </th> 
            <th>Status </th>        
        </tr>

    </thead>
    

    
    <tbody>
        @foreach($results as $ev)
        <tr onclick="bg_change({{$ev->id}});" id="{{$ev->id}}" >
            <td>{{$ev->created_at }}</td>
                <td>
                {{$ev->service }}
                </td>
                    <td>{{$ev->category }}</td>
                    <td>{{$ev->note }}</td>
                        <td>{{$ev->date }}</td>
                        <td>{{$ev->location }}</td>
                        <td>{{$ev->status }}</td>
   
        </tr>



<!-- Table temp end -->




         @endforeach
    
    </tbody> 
    
    
</table>
 

</div>
@endif


</div>


<script type="text/javascript">
  function accept() {
            alert('Please select a bid!');
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
</script>
                


@endsection



