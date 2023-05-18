@extends('plantilla')

@section('title','Bienbenido a fiagma!')

@section('content')
<body class="d-block m-5 container justify-content-center align-items-center" style="background-color: #eee;">
    
    <div class="d-flex rounded-5" style="width:100%; height:90vh; background-color:#FF4F5B ; box-shadow: 23px 23px 13px 1px rgba(0, 0, 0, 0.2);">
      <div class="d-flex flex-column m-5" style="width: 80%;">
        <h1 class="text-white fw-bold" style="font-size:85px; font-family: sans-serif; text-shadow: rgba(0, 0, 0, 0.2) 10px 18px;">Bienvenido</h1>
        <h2 class="text-white fw-bold" style="font-size:80px;  text-shadow: rgba(0, 0, 0, 0.2) 10px 18px;">Fiagma</h2>
        <div class="d-flex mt-5 align-items-center justify-content-center">
          @if(Auth::user())
            <a class="btn mt-5 rounded-5 align-items-center justify-content-center d-flex" href="{{route('home')}}"
            style="background-color:#eee;width:300px; height: 60px;
            color:#1B2E35; box-shadow: 23px 23px 13px 1px rgba(0, 0, 0, 0.2);">Empezar</a>              
          @else
          <a class="btn mt-5 rounded-5 align-items-center justify-content-center d-flex" href="{{route('login')}}"
          style="background-color:#eee;width:300px; height: 60px;
          color:#1B2E35; box-shadow: 23px 23px 13px 1px rgba(0, 0, 0, 0.2);">Empezar</a> 
          @endif
        </div>
        <div style="margin-top:20px;">
          <div class="text-center" style="margin-top:90px;">
            <a class="text-white" href="{{route('login')}}">Login</a> / <a class="text-white" href="{{route('users.create')}}">Registrer</a>
            <br/>
          </div>
          <p class="text-white text-center mt-5">Todos los derechos reservados a fiagma</p>
        </div>
      </div>
      <!-- img -->
      <div class="m-5" style="height:100%; ">
        <img src="{{asset('assets/img/e1.png')}}" class="img-fluid rounded-5" style="box-shadow: 23px 23px 13px 1px rgba(0, 0, 0, 0.2);" alt="">
      </div>
    </div>
  </body>
@endsection