<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Home</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ asset('assets/css/main.css') }}">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js"
        integrity="sha512-3RlxD1bW34eFKPwj9gUXEWtdSMC59QqIqHnD8O/NoTwSJhgxRizdcFVQhUMFyTp5RwLTDL0Lbcqtl8b7bFAzog=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">

</head>

<body>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand navbar-brand-centered">Fiagma</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <button id="dragFigure" class="nav-link active" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white"
                                class="bi bi-cursor" viewBox="0 0 16 16">
                                <path
                                    d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52 2.25 8.184z" />
                            </svg>
                        </button>
                    </li>
                    <li class="nav-item">
                        <button id="cuadrado" class="nav-link active" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white"
                                class="bi bi-square" viewBox="0 0 16 16">
                                <path
                                    d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                            </svg>
                        </button>
                    </li>
                    <li class="nav-item">
                        <button id="linea" class="nav-link active" href="#">
                            <img width="30" height="30" src="https://img.icons8.com/ios/50/000000/line--v1.png"
                                alt="line--v1" />
                        </button>
                    </li>
                    <li class="nav-item">
                        <button id="circulo" class="nav-link active" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white"
                                class="bi bi-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            </svg>
                        </button>
                    </li>
                    <li class="nav-item">

                        <button id="guardarLienzo" class="nav-link active btn btn-primary text-white m-2"
                            aria-current="page" href="#">
                            Guardar proyecto
                        </button>
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0 navbar-nav-right">
                    <li class="nav-item">

                        <a class="nav-link active" aria-current="page" href="{{ route('home') }}">
                            Inicio
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor"
                                class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fill-rule="evenodd"
                                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg>
                            {{ Auth::user()->name }}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-white">
                            <li>
                                <form action="{{ route('logout') }}" method="post">
                                    @csrf
                                    <button cbuttonss="btn dropdown-item" href="{{ route('logout') }}"
                                        style="color: #FF4F5B;">Cerrar
                                        Sesión</button>
                                </form>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class=" row space-0 bg-black">
        <div class="row">
            <div class="col-2 space-1">
                <div>
                    <button id='subirCapa'>Up</button>
                    <button id='bajarCapa'>Down</button>
                </div>
                <ul id="lista">

                </ul>
            </div>
            <div class="col-7 space-2" id="canvas">
            </div>
            <div class="col-3 space-3 d-none" id="workSpaceSquare">
                <div class="col-12">
                    <div class="atributes">
                        <p>Coordinates</p>
                        <div class="row d-none" id="dibujarResto">
                            <div class="inputs-group col-6">
                                <label for="x">X</label>
                                <input type="number" name="x" id="x" class="entryes">
                            </div>
                            <div class="inputs-group col-6">
                                <label for="y">Y</label>
                                <input type="number" name="y" id="y" class="entryes">
                            </div>
                            <div class="inputs-group col-6">
                                <label for="w">H</label>
                                <input type="number" name="w" id="w" class="entryes">
                            </div>
                            <div class="inputs-group col-6">
                                <label for="h">W</label>
                                <input type="number" name="h" id="h" class="entryes">
                            </div>
                        </div>
                        <div class="row d-none" id="dibujarLinea">
                            <div class="inputs-group col-6">
                                <label for="x">X1</label>
                                <input type="number" name="x1" id="x1" class="entryes">
                            </div>
                            <div class="inputs-group col-6">
                                <label for="y">Y1</label>
                                <input type="number" name="y1" id="y1" class="entryes">
                            </div>
                            <div class="inputs-group col-6">
                                <label for="w">X2</label>
                                <input type="number" name="x2" id="x2" class="entryes">
                            </div>
                            <div class="inputs-group col-6">
                                <label for="h">Y2</label>
                                <input type="number" name="y2" id="y2" class="entryes">
                            </div>
                        </div>
                    </div>
                    <div class="fill" id="rellenoFigura">
                        <p>Fill</p>
                        <div class="color-pick">
                            <label for="color" id="colorLabel">#000000</label>
                            <input type="color" name="color" id="color">
                        </div>
                    </div>
                    <div class="opacidades">
                        <p>Atributes</p>
                        <div class="inputs-group">
                            <label for="borderColor" id="borderColorLabel">#000000</label>
                            <input type="color" name="borderColor" id="borderColor">
                        </div>
                        <div class="inputs-group" id="opacidadRelleno">
                            <label for="fillOpacity" id="">Fill Opacity</label>
                            <input type="number" min="0" max="255" name="fillOpacity" id="fillOpacity">
                        </div>
                        <div class="inputs-group">
                            <label for="borderOpacity" id="">Border opacity</label>
                            <input type="number" min="0" max="255" name="borderOpacity" id="borderOpacity">
                        </div>
                        <div class="inputs-group">
                            <label for="borderSize" id="">Border size</label>
                            <input type="number" min="0" max="255" name="borderSize" id="borderSize">
                        </div>
                        <div class="inputs-group" id="redondeado">
                            <label for="corner" id="">Corner</label>
                            <input type="number" min="0" max="255" name="corner" id="corner">
                        </div>
                    </div>
                </div>
                <div class="col-12"></div>
                <div class="col-12"></div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous">
    </script>
    <script src="{{ asset('assets/js/sketch.js') }}"></script>
</body>

</html>
