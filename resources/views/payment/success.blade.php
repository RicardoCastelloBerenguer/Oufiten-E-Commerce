<x-app-layout>


    <div class="flex items-center justify-center h-screen">
        <div class="bg-white p-4 rounded shadow-lg ring ring-indigo-600/50">
            <div class="flex flex-col items-center space-y-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="text-green-600 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 class="text-4xl font-bold">Gracias !</h1>
                @if(!isset($message))
                <p>Gracias por efectuar su compra con nosotros tenga un buen día!.</p>
                @else
                    <p>{{$message}}</p>
                @endif

                    <a href="{{route('home')}}"
                    class="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded rounded-full hover:bg-indigo-700 focus:outline-none focus:ring">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    <span class="text-sm font-medium">
              Inicio
            </span>
                </a>
            </div>
        </div>
    </div>


</x-app-layout>
