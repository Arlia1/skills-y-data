# 🚀 Instalador de Skills, Plugins y MCP para IA de Código (Antigravity / agy)

> **Repositorio Oficial:** [https://github.com/Arlia1/skills-y-data.git](https://github.com/Arlia1/skills-y-data.git)  
> **Compatibilidad:** Antigravity CLI (`agy`), Claude Code, Cursor, Windsurf, OpenCode, Codex.  
> **Plataformas:** Linux, macOS y Windows.

Este documento está especialmente formateado tanto para **desarrolladores humanos** como para **agentes de IA de código** (`agy`, Claude Code, etc.) que necesitan instalar y configurar todo el ecosistema de más de **460 skills**, **8 plugins oficiales**, **92 agentes especializados** y **servidores MCP** en una máquina nueva.

---

## 🤖 Directiva para la IA de Código (Copia y Pega en el nuevo agy)

Si estás ejecutando un agente de IA en otra computadora y quieres que se auto-configure, cópiale y pégale este prompt:

```markdown
Eres un agente de desarrollo en Antigravity (`agy`). Tu objetivo es instalar y configurar el ecosistema completo de plugins, skills y servidores MCP en este equipo.

Por favor realiza los siguientes pasos:
1. Clona el repositorio oficial de configuración:
   git clone https://github.com/Arlia1/skills-y-data.git /tmp/skills-y-data
2. Ejecuta el script de instalación automática:
   bash /tmp/skills-y-data/install.sh
   (En Windows PowerShell ejecuta: powershell -ExecutionPolicy Bypass -File \tmp\skills-y-data\install.ps1)
3. Verifica la instalación ejecutando:
   agy plugin list
   agy mcp list
4. Confírmame los plugins instalados y las capacidades añadidas al entorno.
```

---

## ⚡ Opción 1: Instalación Rápida en 1 Comando (Recomendado)

### En Linux / macOS (Bash o Zsh)
```bash
# Método directo clonando el repositorio
git clone https://github.com/Arlia1/skills-y-data.git /tmp/skills-installer && \
bash /tmp/skills-installer/install.sh && \
rm -rf /tmp/skills-installer
```

O si ya tienes el repositorio clonado localmente:
```bash
chmod +x install.sh
./install.sh
```

---

### En Windows (PowerShell como Administrador o Usuario estándar)
```powershell
git clone https://github.com/Arlia1/skills-y-data.git "$env:TEMP\skills-installer"; `
& "$env:TEMP\skills-installer\install.ps1"; `
Remove-Item -Recurse -Force "$env:TEMP\skills-installer"
```

---

## 🛠️ Opción 2: Instalación Manual Paso a Paso (Shell / Terminal)

Si prefieres realizar la instalación comando por comando o si la IA necesita ejecutar pasos individuales:

### Paso 1: Crear las rutas del sistema Antigravity
Antigravity almacena su configuración global de usuario en `~/.gemini/config/`:
```bash
mkdir -p ~/.gemini/config/plugins ~/.gemini/config/skills
```

### Paso 2: Clonar los 8 Plugins Oficiales
```bash
# 1. Antislop - Eliminación de clichés de IA y buenas prácticas de código humano
git clone --depth 1 https://github.com/miqdadbadjuber/anti-slop.git ~/.gemini/config/plugins/antislop

# 2. Claude SEO - Suite exhaustiva de auditoría SEO técnica y de contenido
git clone --depth 1 https://github.com/AgriciDaniel/claude-seo.git ~/.gemini/config/plugins/claude-seo

# 3. ECC (Everything Claude Code) - Ecosistema de ingeniería, 400+ skills y 71 agentes
git clone --depth 1 https://github.com/affaan-m/ECC.git ~/.gemini/config/plugins/ecc

# 4. Harvey - Agente autónomo de prospección B2B y captación de clientes
git clone --depth 1 https://github.com/ethanplusai/harvey.git ~/.gemini/config/plugins/harvey

# 5. I Have ADHD - Formato claro, directo a la acción, sin desvíos ni rodeos
git clone --depth 1 https://github.com/ayghri/i-have-adhd.git ~/.gemini/config/plugins/i-have-adhd

# 6. Karpathy Guidelines - Principios de desarrollo de software de Andrej Karpathy
git clone --depth 1 https://github.com/multica-ai/andrej-karpathy-skills.git ~/.gemini/config/plugins/karpathy-guidelines

# 7. Superpowers - Framework de TDD, debugging sistemático y ejecución de planes
git clone --depth 1 https://github.com/obra/superpowers.git ~/.gemini/config/plugins/superpowers

# 8. Thermos - Auditorías termonucleares de PRs, seguridad y calidad de código
git clone --depth 1 --branch v1.1.0 https://github.com/LayZeeDK/thermos-claude-plugin.git ~/.gemini/config/plugins/thermos
```

### Paso 3: Instalar la Skill Standalone (Graphify)
Graphify permite mapear visualmente cualquier codebase como un grafo de dependencias y arquitectura.
```bash
# Copiar la carpeta graphify desde este repositorio a ~/.gemini/config/skills/
cp -r skills/graphify ~/.gemini/config/skills/

# Instalar el paquete CLI y biblioteca de Python
python3 -m pip install --user graphifyy
```

### Paso 4: Configurar los Servidores MCP (Model Context Protocol)
Copia la configuración predefinida de servidores MCP:
```bash
cp configs/mcp_config.json ~/.gemini/config/mcp_config.json
```
O agrégalos usando el CLI nativo de `agy`:
```bash
agy mcp add memory npx -y @modelcontextprotocol/server-memory
agy mcp add sequential-thinking npx -y @modelcontextprotocol/server-sequential-thinking
```

### Paso 5: Registrar el Manifiesto de Importación
```bash
cp configs/import_manifest.json ~/.gemini/config/import_manifest.json
```

---

## 🔍 Verificación del Sistema

Una vez ejecutada la instalación, corre los siguientes comandos en tu terminal:

```bash
# 1. Comprobar que los 8 plugins estén habilitados
agy plugin list

# 2. Comprobar que los servidores MCP estén activos
agy mcp list
```

Deberías ver una salida idéntica o equivalente a esta:
```text
Installed plugins:
- antislop (enabled, 3.2.23)
    Source:     antigravity
    Components: 6 skills, 2 rules
- claude-seo (enabled, 2.5.0)
    Source:     claude-code
    Components: 26 skills, 1 hook
- ecc (enabled, 2.2.3)
    Source:     claude-code
    Components: 321 skills, 23 rules, 1 MCP server, 1 hook
- harvey (enabled, 1.0.0)
    Source:     antigravity
    Components: 1 skill
- i-have-adhd (enabled, 0.4.1)
    Source:     antigravity
    Components: 1 skill
- karpathy-guidelines (enabled, 1.0.0)
    Source:     antigravity
    Components: 1 skill
- superpowers (enabled, 7.0.1)
    Source:     antigravity
    Components: 15 skills
- thermos (enabled, 1.1.0)
    Source:     claude-code
    Components: 3 skills, 2 agents

--- MCP LIST ---
NAME                 TYPE   STATUS   COMMAND/URL
memory               stdio  enabled  npx -y @modelcontextprotocol/server-memory
sequential-thinking  stdio  enabled  npx -y @modelcontextprotocol/server-sequential-thinking
```

---

## 📦 Inventario Detallado de Plugins Instalados

| Plugin | Repositorio GitHub | Skills | Agentes | Descripción / Propósito |
| :--- | :--- | :---: | :---: | :--- |
| **antislop** | [anti-slop](https://github.com/miqdadbadjuber/anti-slop.git) | 6 | - | Elimina código genérico redundante, limpia comentarios obvios y garantiza UI accesible y humana. |
| **claude-seo** | [claude-seo](https://github.com/AgriciDaniel/claude-seo.git) | 26 | 19 | Suite profesional de SEO: análisis técnico, Schema.org, backlinks, clusters de contenido y GEO (AI Search). |
| **ecc** | [ECC](https://github.com/affaan-m/ECC.git) | 408 | 71 | La suite más completa de ingeniería: patrones para frontend, backend, testing, devops, DBs y arquitectura. |
| **harvey** | [harvey](https://github.com/ethanplusai/harvey.git) | 1 | - | Motor autónomo de captación B2B, calificación de ICP y secuencias de prospección. |
| **i-have-adhd** | [i-have-adhd](https://github.com/ayghri/i-have-adhd.git) | 1 | - | Respuestas estructuradas con foco inmediato, pasos numerados y sin dispersión. |
| **karpathy-guidelines** | [andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills.git) | 1 | - | Principios de Andrej Karpathy: simplicidad, cambios quirúrgicos y validación de hipótesis antes de editar. |
| **superpowers** | [superpowers](https://github.com/obra/superpowers.git) | 15 | - | Habilidades de desarrollo asistido: TDD riguroso, debugging sistemático, brainstorming y git worktrees. |
| **thermos** | [thermos-claude-plugin](https://github.com/LayZeeDK/thermos-claude-plugin.git) | 3 | 2 | Auditoría "termonuclear" de código: detecta vulnerabilidades, degradaciones de arquitectura y bugs críticos. |
| **graphify** (Standalone) | [graphifyy (PyPI)](https://pypi.org/project/graphifyy/) | 1 | - | Convierte cualquier base de código en un grafo interactivo de relaciones y dependencias. |

---

## 🧠 Servidores MCP (Model Context Protocol)

1. **`memory`** (`@modelcontextprotocol/server-memory`):
   - Proporciona un grafo de conocimiento persistente en memoria para almacenar entidades, relaciones y observaciones a lo largo de las sesiones.
2. **`sequential-thinking`** (`@modelcontextprotocol/server-sequential-thinking`):
   - Permite al modelo desglosar problemas complejos mediante razonamiento secuencial dinámico, iterativo y auto-correctivo antes de ejecutar acciones de alto impacto.

---

## 📂 Estructura del Repositorio

```text
skills-y-data/
├── README.md                 # Documentación general del repositorio
├── INSTALLER.md              # Esta guía detallada para IAs y humanos
├── install.sh                # Script de instalación automática en Bash (Linux/macOS)
├── install.ps1               # Script de instalación automática en PowerShell (Windows)
├── configs/
│   ├── import_manifest.json  # Registro de plugins y componentes para agy
│   └── mcp_config.json       # Configuración de servidores MCP (memory, sequential-thinking)
└── skills/
    └── graphify/             # Skill standalone completa de Graphify con referencias
        ├── SKILL.md
        ├── .graphify_version
        └── references/
            └── github-and-merge.md
```

---

## 💡 Preguntas Frecuentes y Solución de Problemas

### ¿Qué hacer si una skill no se carga automáticamente?
Antigravity utiliza **divulgación progresiva** (*progressive disclosure*). Las skills no saturan la ventana de contexto al inicio; se inyecta su nombre y descripción, y el modelo carga su contenido completo (`SKILL.md`) en el momento en que se invoca o se necesita.

### ¿Cómo actualizar todos los plugins en el futuro?
Simplemente vuelve a ejecutar `./install.sh`. El script detectará las carpetas existentes y hará un `git pull` de cada repositorio oficial sin sobreescribir tus configuraciones.
