# ==============================================================================
# Antigravity (agy) All-In-One Skills & Plugins Installer for Windows (PowerShell)
# Repositorio: https://github.com/Arlia1/skills-y-data.git
# ==============================================================================

$ErrorActionPreference = "Continue"

Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "   🚀 Antigravity (agy) - Instalador Windows (PowerShell)" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan

$UserHome = [System.Environment]::GetFolderPath([System.Environment+SpecialFolder]::UserProfile)
$ConfigDir = Join-Path $UserHome ".gemini\config"
$PluginsDir = Join-Path $ConfigDir "plugins"
$SkillsDir = Join-Path $ConfigDir "skills"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "`n[1/5] Creando directorios base en $ConfigDir..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path $PluginsDir | Out-Null
New-Item -ItemType Directory -Force -Path $SkillsDir | Out-Null
Write-Host "✓ Directorios listos." -ForegroundColor Green

function Clone-Or-Update {
    param(
        [string]$Name,
        [string]$RepoUrl,
        [string]$Branch = ""
    )
    $TargetDir = Join-Path $PluginsDir $Name
    Write-Host "`n--> Instalando plugin: $Name..." -ForegroundColor Cyan

    if (Test-Path (Join-Path $TargetDir ".git")) {
        Write-Host "    Actualizando $Name existente..." -ForegroundColor Yellow
        git -C $TargetDir pull --quiet
        Write-Host "    ✓ $Name actualizado." -ForegroundColor Green
    } elseif (Test-Path $TargetDir) {
        Write-Host "    El directorio $Name ya existe. Conservando archivos." -ForegroundColor Yellow
    } else {
        Write-Host "    Clonando desde $RepoUrl..."
        if ($Branch -ne "") {
            git clone --depth 1 --branch $Branch $RepoUrl $TargetDir --quiet
        } else {
            git clone --depth 1 $RepoUrl $TargetDir --quiet
        }
        Write-Host "    ✓ $Name instalado correctamente." -ForegroundColor Green
    }
}

Write-Host "`n[2/5] Descargando e instalando los 8 Plugins..." -ForegroundColor Yellow
Clone-Or-Update -Name "antislop" -RepoUrl "https://github.com/miqdadbadjuber/anti-slop.git"
Clone-Or-Update -Name "claude-seo" -RepoUrl "https://github.com/AgriciDaniel/claude-seo.git"
Clone-Or-Update -Name "ecc" -RepoUrl "https://github.com/affaan-m/ECC.git"
Clone-Or-Update -Name "harvey" -RepoUrl "https://github.com/ethanplusai/harvey.git"
Clone-Or-Update -Name "i-have-adhd" -RepoUrl "https://github.com/ayghri/i-have-adhd.git"
Clone-Or-Update -Name "karpathy-guidelines" -RepoUrl "https://github.com/multica-ai/andrej-karpathy-skills.git"
Clone-Or-Update -Name "superpowers" -RepoUrl "https://github.com/obra/superpowers.git"
Clone-Or-Update -Name "thermos" -RepoUrl "https://github.com/LayZeeDK/thermos-claude-plugin.git" -Branch "v1.1.0"

Write-Host "`n[3/5] Instalando Skills Standalone (Graphify & Video Production)..." -ForegroundColor Yellow
$LocalGraphify = Join-Path $ScriptDir "skills\graphify"
if (Test-Path $LocalGraphify) {
    Copy-Item -Path $LocalGraphify -Destination $SkillsDir -Recurse -Force
    Write-Host "✓ Skill graphify copiada a $SkillsDir\graphify." -ForegroundColor Green
}

$LocalVideo = Join-Path $ScriptDir "skills\video-production"
if (Test-Path $LocalVideo) {
    Get-ChildItem -Path $LocalVideo -Directory | ForEach-Object {
        Copy-Item -Path $_.FullName -Destination $SkillsDir -Recurse -Force
    }
    Write-Host "✓ 29 Skills de Video Production copiadas a $SkillsDir." -ForegroundColor Green
}

# Python pip install graphifyy si python está instalado
try {
    python -m pip install --quiet graphifyy 2>$null
} catch {}

Write-Host "`n[4/5] Configurando import_manifest.json y Servidores MCP..." -ForegroundColor Yellow
$LocalManifest = Join-Path $ScriptDir "configs\import_manifest.json"
if (Test-Path $LocalManifest) {
    Copy-Item -Path $LocalManifest -Destination (Join-Path $ConfigDir "import_manifest.json") -Force
    Write-Host "✓ import_manifest.json copiado." -ForegroundColor Green
}

$LocalMcp = Join-Path $ScriptDir "configs\mcp_config.json"
if (Test-Path $LocalMcp) {
    Copy-Item -Path $LocalMcp -Destination (Join-Path $ConfigDir "mcp_config.json") -Force
    Write-Host "✓ mcp_config.json configurado con servers: memory y sequential-thinking." -ForegroundColor Green
}

Write-Host "`n[5/5] Verificando instalación en agy CLI..." -ForegroundColor Yellow
if (Get-Command agy -ErrorAction SilentlyContinue) {
    Write-Host "✓ agy CLI detectado:`n" -ForegroundColor Green
    agy plugin list
    Write-Host ""
    agy mcp list
} else {
    Write-Host "Nota: 'agy' no está en tu PATH actual. Los plugins se cargarán al iniciar Antigravity." -ForegroundColor Yellow
}

Write-Host "`n======================================================" -ForegroundColor Green
Write-Host "   🎉 ¡Instalación completada con éxito en Windows!  " -ForegroundColor Green
Write-Host "======================================================" -ForegroundColor Green
