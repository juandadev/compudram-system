@extends('home')

@section('home-content')
@php ($view = 'systems')

<div class="content">
    <div class="btn btn-new">
        <i class="fas fa-plus"></i>
    </div>

    @foreach ($systems as $system)
        <div class="card">
            <div class="card__header">
                <div class="card__header__title">
                    <p class="name">{{ $system->name }}</p>

                    <p class="date">Creado en {{ date('d/m/Y', strtotime($system->created_at)) }}</p>
                </div>

                <div class="card__header__controls">
                    <a class=" btn btn-edit hidden">
                        <i class="fas fa-edit"></i>
                    </a>

                    <a class="btn btn-delete hidden">
                        <i class="fas fa-trash-alt"></i>
                    </a>
                </div>
            </div>

            <div class="card__image">
                @if ($system->image)
                <img src="{{ $system->image }}" alt="{{ $system->name }} image">
                @else
                <img src="https://ui-avatars.com/api/?name={{ $system->name }}&background=758290&color=4F5B69&size=200" alt="">
                @endif
            </div>
        </div>
    @endforeach
</div>
@endsection