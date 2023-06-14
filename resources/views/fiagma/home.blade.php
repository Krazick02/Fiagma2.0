<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Home</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ asset('assets/css/styles.css') }}">
    {{-- <link rel="stylesheet" href="{{ asset('assets/css/cards_styles.css') }}"> --}}
    <style>
        .dialog {
            position: fixed;
            top: 10px;
            /* Distancia desde la parte superior */
            right: 10px;
            /* Distancia desde la parte derecha */
            background-color: greenyellow;
            padding: 10px 20px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            transition: opacity 0.3s ease;
        }

        .hidden {
            opacity: 0;
            pointer-events: none;
        }
    </style>
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
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0 navbar-nav-right">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor"
                                class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fill-rule="evenodd"
                                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg> {{ Auth::user()->name }}</a>
                        <ul class="dropdown-menu dropdown-menu-white">
                            <li>

                                <form action="{{ route('logout') }}" method="post">
                                    @csrf
                                    <button cbuttonss="btn dropdown-item" href="{{ route('logout') }}"
                                        style="color: #FF4F5B;">Cerrar Sesión</button>
                                </form>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="d-flex flex-row ">
        @if (session('success'))
            <div id="success-dialog" class="dialog hidden">
                Se eliminó correctamente.
            </div>
        @endif
        {{-- <div class="rectangle-left d-flex align-items-center justify-content-center bg-dark">

        </div> --}}
        <div class="d-flex flex-column align-items-center justify-content-center" style="width: 100%; height: 100%;">
            <div>
                <img src="{{ asset('assets/img/uxui.jpg') }}" class="img-responsive"
                    style="width: 629px; height: 340px;box-shadow: 0px 23px 23px rgba(0, 0, 0, 0.22);
        border-radius: 14px;"alt="">
            </div>
            <div class="mt-5 d-flex flex-column align-items-center justify-content">
                <h3 style="color:#FF735C;">Tus Proyectos</h3>
            </div>
            <div style="width: 17%;">
                <hr class="border border-danger border-1 opacity-50">
            </div>
               <div class=" p-3 justify-content-start" style="width: 100%;">
                <a href="{{ route('fiagma.main') }}" class="btn text-white text-center"
                    style="background-color: #FF4F5B; width: 200px; height:40px;">
                    Nuevo diseño
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="white"
                        class="bi bi-plus-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                </a>
            </div>
            <div class="row filaDeCartas">
                @foreach (Auth::user()->canvas as $item)
                    <div class="col-4 py-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Proyecto {{ $item->id }}</h5>
                                <p class="card-text">Fecha Creacion: {{ $item->created_at }}</p>
                                <form action="{{ route('canva.drop', $item->id) }}" method="POST">
                                    <div class="row">
                                        @csrf
                                        @method('DELETE')
                                        <div class="col-6">
                                            <a href="{{ route('canva.edit', $item->id) }}"
                                                class="btn btn-primary">Abrir
                                                Proyecto</a>
                                        </div>
                                        <div class="col-6">
                                            <button type="submit" class="btn btn-danger">Eliminar Proyecto</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                @endforeach

            </div>

        </div>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous">
    </script>
    <script>
        $(document).ready(function() {
            var successDialog = $('#success-dialog');

            if (successDialog.length > 0) {
                successDialog.removeClass('hidden');

                setTimeout(function() {
                        successDialog.addClass('hidden');
                    },
                    3000
                );
            }
        });
    </script>
</body>

</html>
