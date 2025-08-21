<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ficha Técnica del Reto</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 12px; }
        h1 { text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #000; padding: 6px; text-align: left; }
    </style>
</head>
<body>
    

    <h1>Ficha Técnica del Reto</h1>

    <table>
        <tr>
            <th>ID</th>
            <td>{{ $challenge->id }}</td>
        </tr>
        <tr>
            <th>Nombre</th>
            <td>{{ $challenge->name }}</td>
        </tr>
        <tr>
            <th>Descripción</th>
            <td>{{ $challenge->description }}</td>
        </tr>
        <tr>
            <th>Objetivo</th>
            <td>{{ $challenge->objective }}</td>
        </tr>
        <tr>
            <th>Dificultad</th>
            <td>{{ $challenge->difficulty }}</td>
        </tr>
        <tr>
            <th>Requisitos</th>
            {{-- Si requirements es array o JSON --}}
            <td>
                @if(is_array($challenge->requirements))
                    {{ implode(', ', $challenge->requirements) }}
                @else
                    {{ $challenge->requirements }}
                @endif
            </td>
        </tr>
        <tr>
            <th>Estado</th>
            <td>{{ $challenge->status }}</td>
        </tr>
        <tr>
            <th>Fecha de inicio</th>
            <td>{{ $challenge->start_date }}</td>
        </tr>
        <tr>
            <th>Fecha de fin</th>
            <td>{{ $challenge->end_date }}</td>
        </tr>
        <tr>
            <th>Link del Video</th>
            <td>{{ $challenge->link_video }}</td>
        </tr>
        <tr>
            <th>ID del Video</th>
            <td>{{ $challenge->video_id }}</td>
        </tr>
        <tr>
            <th>Monto de la Recompensa</th>
            <td>{{ $challenge->reward_amount }}</td>
        </tr>
        <tr>
            <th>Moneda</th>
            <td>{{ $challenge->reward_currency }}</td>
        </tr>
        <tr>
            <th>Descripción de la Recompensa</th>
            <td>{{ $challenge->reward_description }}</td>
        </tr>
        <tr>
            <th>Tipo de Recompensa</th>
            <td>{{ $challenge->reward_type }}</td>
        </tr>
        <tr>
            <th>Categoría</th>
            <td>{{ $challenge->category_id }}</td>
        </tr>
        <tr>
            <th>Empresa</th>
            <td>{{ $challenge->company_id }}</td>
        </tr>
        <tr>
            <th>Creado en</th>
            <td>{{ $challenge->created_at }}</td>
        </tr>
        <tr>
            <th>Actualizado en</th>
            <td>{{ $challenge->updated_at }}</td>
        </tr>
    </table>
</body>
</html>
