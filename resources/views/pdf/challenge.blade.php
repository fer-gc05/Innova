<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ficha Técnica del Reto - IN-NOVA</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            margin: 0;
            padding: 20px;
            background-color: #f9fafb;
        }
        .header {
            position: relative;
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 10px;
        }
        .logo-container {
            position: absolute;
            top: 15px;
            left: 15px;
            background-color: #3b82f6;
            border-radius: 8px;
            padding: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            border: 2px solid #ffffff;
        }
        .logo {
            width: 45px;
            height: 45px;
            display: block;
            filter: brightness(0) invert(1);
        }
        h1 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }
        .subtitle {
            font-size: 14px;
            opacity: 0.9;
            margin-top: 5px;
        }
        .challenge-name {
            font-size: 20px;
            font-weight: bold;
            margin-top: 15px;
            padding: 12px 20px;
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: 8px;
            display: inline-block;
            color: #1f2937;
            text-shadow: none;
            border: 2px solid #3b82f6;
        }
        .content {
            background: white;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #374151;
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 8px;
            margin-bottom: 15px;
        }
        .info-grid {
            display: table;
            width: 100%;
            border-collapse: collapse;
        }
        .info-row {
            display: table-row;
        }
        .info-label {
            display: table-cell;
            width: 30%;
            padding: 8px;
            font-weight: bold;
            color: #374151;
            background-color: #f3f4f6;
            border: 1px solid #e5e7eb;
        }
        .info-value {
            display: table-cell;
            width: 70%;
            padding: 8px;
            border: 1px solid #e5e7eb;
            background-color: white;
        }
        .badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
        }
        .badge-draft { background-color: #fef3c7; color: #92400e; }
        .badge-published { background-color: #d1fae5; color: #065f46; }
        .badge-active { background-color: #dbeafe; color: #1e40af; }
        .badge-completed { background-color: #e0e7ff; color: #3730a3; }
        .badge-inactive { background-color: #f3f4f6; color: #374151; }
        .badge-easy { background-color: #d1fae5; color: #065f46; }
        .badge-medium { background-color: #fef3c7; color: #92400e; }
        .badge-hard { background-color: #fee2e2; color: #991b1b; }
        .requirements-list {
            margin: 0;
            padding-left: 20px;
        }
        .requirements-list li {
            margin-bottom: 5px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding: 15px;
            color: #6b7280;
            font-size: 10px;
            border-top: 1px solid #e5e7eb;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo-container">
            <img src="{{ public_path('images/IN-Nova logo.svg') }}" class="logo" alt="IN-Nova Logo">
        </div>
        <h1>Ficha Técnica del Reto</h1>
        <div class="subtitle">IN-NOVA - Plataforma de Innovación Empresarial</div>
        <div class="challenge-name">
            {{ $challenge->name ?? 'Nombre del reto no disponible' }}
        </div>
    </div>

    <div class="content">
        <!-- Información Básica -->
        <div class="section">
            <div class="section-title">Información Básica</div>
            <div class="info-grid">
                <div class="info-row">
                    <div class="info-label">Nombre</div>
                    <div class="info-value">{{ $challenge->name }}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Descripción</div>
                    <div class="info-value">{{ $challenge->description }}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Objetivo</div>
                    <div class="info-value">{{ $challenge->objective }}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Dificultad</div>
                    <div class="info-value">
                        <span class="badge badge-{{ $challenge->difficulty }}">
                            @switch($challenge->difficulty)
                                @case('easy')
                                    Fácil
                                    @break
                                @case('medium')
                                    Medio
                                    @break
                                @case('hard')
                                    Difícil
                                    @break
                                @default
                                    {{ $challenge->difficulty }}
                            @endswitch
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Estados -->
        <div class="section">
            <div class="section-title">Estados del Reto</div>
            <div class="info-grid">
                <div class="info-row">
                    <div class="info-label">Estado de Publicación</div>
                    <div class="info-value">
                        <span class="badge badge-{{ $challenge->publication_status }}">
                            @if($challenge->publication_status === 'draft')
                                Borrador
                            @else
                                Publicado
                            @endif
                        </span>
                    </div>
                </div>
                <div class="info-row">
                    <div class="info-label">Estado de Actividad</div>
                    <div class="info-value">
                        <span class="badge badge-{{ $challenge->activity_status }}">
                            @switch($challenge->activity_status)
                                @case('active')
                                    Activo
                                    @break
                                @case('completed')
                                    Completado
                                    @break
                                @case('inactive')
                                    Inactivo
                                    @break
                                @default
                                    {{ $challenge->activity_status }}
                            @endswitch
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Fechas -->
        <div class="section">
            <div class="section-title">Fechas del Reto</div>
            <div class="info-grid">
                <div class="info-row">
                    <div class="info-label">Fecha de Inicio</div>
                    <div class="info-value">{{ \Carbon\Carbon::parse($challenge->start_date)->format('d/m/Y') }}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Fecha de Finalización</div>
                    <div class="info-value">{{ \Carbon\Carbon::parse($challenge->end_date)->format('d/m/Y') }}</div>
                </div>
            </div>
        </div>

        <!-- Requisitos -->
        @if($challenge->requirements && count($challenge->requirements) > 0)
        <div class="section">
            <div class="section-title">Requisitos</div>
            <div class="info-grid">
                <div class="info-row">
                    <div class="info-label">Lista de Requisitos</div>
                    <div class="info-value">
                        <ul class="requirements-list">
                            @foreach($challenge->requirements as $requirement)
                                <li>{{ $requirement }}</li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        @endif

        <!-- Recompensa -->
        @if($challenge->reward_amount)
        <div class="section">
            <div class="section-title">Información de Recompensa</div>
            <div class="info-grid">
                <div class="info-row">
                    <div class="info-label">Monto de la Recompensa</div>
                    <div class="info-value">${{ number_format($challenge->reward_amount, 0, ',', '.') }} {{ $challenge->reward_currency }}</div>
                </div>
                @if($challenge->reward_description)
                <div class="info-row">
                    <div class="info-label">Descripción de la Recompensa</div>
                    <div class="info-value">{{ $challenge->reward_description }}</div>
                </div>
                @endif
                @if($challenge->reward_type)
                <div class="info-row">
                    <div class="info-label">Tipo de Recompensa</div>
                    <div class="info-value">{{ ucfirst($challenge->reward_type) }}</div>
                </div>
                @endif
            </div>
        </div>
        @endif

        <!-- Video (solo si existe) -->
        @if($challenge->link_video || $challenge->video_id)
        <div class="section">
            <div class="section-title">Recursos Multimedia</div>
            <div class="info-grid">
                @if($challenge->link_video)
                <div class="info-row">
                    <div class="info-label">Link del Video</div>
                    <div class="info-value">{{ $challenge->link_video }}</div>
                </div>
                @endif
                @if($challenge->video_id)
                <div class="info-row">
                    <div class="info-label">ID del Video</div>
                    <div class="info-value">{{ $challenge->video_id }}</div>
                </div>
                @endif
            </div>
        </div>
        @endif

        <!-- Información de Categoría y Empresa -->
        <div class="section">
            <div class="section-title">Información de Categoría y Empresa</div>
            <div class="info-grid">
                <div class="info-row">
                    <div class="info-label">Categoría</div>
                    <div class="info-value">{{ $challenge->category->name ?? 'No especificada' }}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Empresa</div>
                    <div class="info-value">{{ $challenge->company->name ?? 'No especificada' }}</div>
                </div>
            </div>
        </div>

        <!-- Respuestas del Formulario de Categoría -->
        @if($formAnswers && $formQuestions && count($formAnswers) > 0)
        <div class="section">
            <div class="section-title">Respuestas del Formulario de Categoría</div>
            <div class="info-grid">
                @foreach($formQuestions as $question)
                    @if(isset($formAnswers[$question['text']]))
                        <div class="info-row">
                            <div class="info-label">{{ $question['text'] }}</div>
                            <div class="info-value">
                                @if(is_array($formAnswers[$question['text']]))
                                    @if($question['type'] === 'checkbox')
                                        <ul class="requirements-list">
                                            @foreach($formAnswers[$question['text']] as $option)
                                                <li>{{ $option }}</li>
                                            @endforeach
                                        </ul>
                                    @else
                                        {{ implode(', ', $formAnswers[$question['text']]) }}
                                    @endif
                                @else
                                    {{ $formAnswers[$question['text']] }}
                                @endif
                            </div>
                        </div>
                    @endif
                @endforeach
            </div>
        </div>
        @endif

        <!-- Información del Sistema -->
        <div class="section">
            <div class="section-title">Información del Sistema</div>
            <div class="info-grid">
                <div class="info-row">
                    <div class="info-label">Fecha de Creación</div>
                    <div class="info-value">{{ \Carbon\Carbon::parse($challenge->created_at)->format('d/m/Y H:i') }}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Última Actualización</div>
                    <div class="info-value">{{ \Carbon\Carbon::parse($challenge->updated_at)->format('d/m/Y H:i') }}</div>
                </div>
            </div>
        </div>
    </div>

    <div class="footer">
        <p>Documento generado el {{ \Carbon\Carbon::now()->format('d/m/Y H:i:s') }} por IN-NOVA</p>
        <p>Plataforma de Innovación Empresarial</p>
    </div>
</body>
</html>
