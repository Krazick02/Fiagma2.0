<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Register</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
</head>

<body class="d-block m-5 container justify-content-center align-items-center" style="background-color: #eee;">
    <div class="d-flex rounded-5"
        style="width:100%; height:90vh; background-color:#FF4F5B ; box-shadow: 23px 23px 13px 1px rgba(0, 0, 0, 0.2);">
        <div class="d-flex flex-column m-5" style="width: 80%;">
            <h2 class="text-white text-center fw-bold"
                style="font-size:75px; text-shadow: rgba(0, 0, 0, 0.2) 10px 18px;">Fiagma</h2>

            <form action="{{ route('users.store') }}" method="POST">
                @csrf
                <div class="mt-5">
                    <div class="input-group has-validation" style="box-shadow: 23px 23px 13px 1px rgba(0, 0, 0, 0.2);">

                        <span class="input-group-text" style="color: #FF4F5B; font-size:27px;"id="basic-addon1">@</span>
                        <div class="form-floating is-invalid">
                            <input type="text" class="form-control " id="username" name="username"
                                placeholder="email" required>
                            <label for="username" style="font-size:20px;">User name</label>
                        </div>
                    </div>
                </div>
                <div class="mt-5">
                    <div class="input-group has-validation" style="box-shadow: 23px 23px 13px 1px rgba(0, 0, 0, 0.2);">
                        <span class="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="26"
                                height="26" fill="tomato" class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fill-rule="evenodd"
                                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg></span>
                        <div class="form-floating is-invalid">
                            <input type="email" class="form-control " id="email" name="email"
                                placeholder="email" required>
                            <label for="email" style="font-size:20px;">Email</label>
                        </div>
                    </div>
                </div>
                <div class="mt-5">
                    <div class="input-group flex-nowrap" style="box-shadow: 23px 23px 13px 1px rgba(0, 0, 0, 0.2);">
                        <span class="input-group-text" id="addon-wrapping"><svg xmlns="http://www.w3.org/2000/svg"
                                width="36" height="36" fill="tomato" class="bi bi-key" viewBox="0 0 16 16">
                                <path
                                    d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
                                <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                            </svg></span>
                        <input type="password" class="form-control" id="password" name="password"
                            style="font-size:20px;" placeholder="password" aria-describedby="addon-wrapping">
                    </div>
                </div>
                <div class="mt-5">
                    <div class="input-group flex-nowrap" style="box-shadow: 23px 23px 13px 1px rgba(0, 0, 0, 0.2);">
                        <span class="input-group-text" id="addon-wrapping"><svg xmlns="http://www.w3.org/2000/svg"
                                width="36" height="36" fill="tomato" class="bi bi-key" viewBox="0 0 16 16">
                                <path
                                    d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
                                <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                            </svg></span>
                        <input type="password" class="form-control" style="font-size:20px;"
                            placeholder="Confirm password" id="passwordConfirm" name="passwordConfirm"
                            aria-describedby="addon-wrapping">
                    </div>
                </div>
                <div class="mt-5 d-flex justify-content-center">
                    <button type="submit"
                        class="d-flex btn rounded-5 text-white align-items-center justify-content-center"
                        style="background-color:#1B2E35; width: 300px; height: 60px;box-shadow: 23px 23px 13px 1px rgba(0, 0, 0, 0.2);">Registrarse</button>
                </div>
            </form>
        </div>
        <!-- img -->
        <div class="d-flex flex-column justify-content-center align-items-center" style="width: 100%; height: 100%;">
            <div class="" style="width:400px; height:400px; ">
                <img src="{{ asset('assets/img/e2.png') }}" class="img-fluid rounded-5"
                    style="box-shadow: 23px 23px 13px 1px rgba(0, 0, 0, 0.2);" alt="">
            </div>
            <div class="mt-5">
                <div class="mt-5 text-center" style="font-size:25px;">
                    <span class="text-white">Ya tienes cuenta?</span> <a
                        href="{{ route('login') }}"class="text-white">Inicia
                        sesion</a>
                </div>
            </div>
        </div>
    </div>
    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous">
    </script>
</body>
