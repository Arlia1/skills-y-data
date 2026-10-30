# ⚡ Antigravity Skills & Data Suite

> **Suite completa de Plugins, Skills, Agentes Autónomos y Servidores MCP para IA de Código (`agy`, Claude Code, Cursor, Codex).**  
> Repositorio: [https://github.com/Arlia1/skills-y-data.git](https://github.com/Arlia1/skills-y-data.git)

Este repositorio contiene la configuración, plugins, skills y manifiestos necesarios para transformar cualquier instancia de **Antigravity CLI (`agy`)** o asistente de código en un sistema de ingeniería autónomo de nivel de producción.

---

## 📊 Contenido del Ecosistema

- **8 Plugins Oficiales** sincronizados y probados.
- **462 Skills Especializadas** que cubren arquitectura, frontend, backend, testing, devops, mobile, SEO y seguridad.
- **92 Agentes Autónomos** especializados para revisión de código, resolución de errores de compilación y orquestación.
- **2 Servidores MCP** (`memory` para memoria a largo plazo y `sequential-thinking` para descomposición de problemas complejos).
- **1 Skill Standalone** (`graphify` para mapeo de arquitecturas de bases de código en grafos).

---

## 🚀 Instalación Rápida

### Opción 1: En 1 línea de comando (Linux / macOS)

```bash
git clone https://github.com/Arlia1/skills-y-data.git /tmp/skills-setup && bash /tmp/skills-setup/install.sh && rm -rf /tmp/skills-setup
```

Si ya clonaste este repositorio:
```bash
chmod +x install.sh
./install.sh
```

---

### Opción 2: En Windows (PowerShell)

```powershell
git clone https://github.com/Arlia1/skills-y-data.git "$env:TEMP\skills-setup"; & "$env:TEMP\skills-setup\install.ps1"; Remove-Item -Recurse -Force "$env:TEMP\skills-setup"
```

---

### Opción 3: Vía Prompt para Agentes de IA de Código

Si estás usando un agente de IA (`agy`, Claude Code, etc.) en otra PC, sólo copia y pega lo siguiente en el chat:

> *"Lee las instrucciones de instalación en https://github.com/Arlia1/skills-y-data/blob/main/INSTALLER.md y ejecuta `install.sh` para auto-configurar todos los plugins, skills y servidores MCP en este entorno."*

Para la guía detallada de instalación paso a paso, consulta [`INSTALLER.md`](./INSTALLER.md).

---

## 🧩 Plugins Incluidos

| Plugin | Versión | Skills | Agentes | Enlace del Proyecto |
| :--- | :---: | :---: | :---: | :--- |
| **`superpowers`** | `7.0.1` | 15 | - | [obra/superpowers](https://github.com/obra/superpowers.git) |
| **`thermos`** | `1.1.0` | 3 | 2 | [LayZeeDK/thermos-claude-plugin](https://github.com/LayZeeDK/thermos-claude-plugin.git) |
| **`antislop`** | `3.2.23` | 6 | - | [miqdadbadjuber/anti-slop](https://github.com/miqdadbadjuber/anti-slop.git) |
| **`claude-seo`** | `2.5.0` | 26 | 19 | [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo.git) |
| **`ecc`** | `2.2.3` | 408 | 71 | [affaan-m/ECC](https://github.com/affaan-m/ECC.git) |
| **`harvey`** | `1.0.0` | 1 | - | [ethanplusai/harvey](https://github.com/ethanplusai/harvey.git) |
| **`i-have-adhd`** | `0.4.1` | 1 | - | [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd.git) |
| **`karpathy-guidelines`** | `1.0.0` | 1 | - | [andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills.git) |
| **`graphify`** *(Standalone)* | `0.9.92` | 1 | - | [graphifyy en PyPI](https://pypi.org/project/graphifyy/) |

---

## 🧠 Servidores MCP (Model Context Protocol)

Este kit preconfigura en `~/.gemini/config/mcp_config.json` los servidores oficiales de Model Context Protocol:

1. **`memory`**: Servidor de base de datos de grafos en memoria para persistencia de contexto, entidades y relaciones entre sesiones del agente.
   - Ejecutado con: `npx -y @modelcontextprotocol/server-memory`
2. **`sequential-thinking`**: Herramienta de razonamiento dinámico para planificar, descomponer y evaluar arquitecturas complejas paso a paso.
   - Ejecutado con: `npx -y @modelcontextprotocol/server-sequential-thinking`

---

## 🎯 Capacidades Principales por Categoría

### 1. Metodología de Ingeniería & Pair Programming
- **TDD Riguroso (`superpowers:test-driven-development`)**: Crea pruebas rojas antes de tocar el código de producción.
- **Debugging Sistemático (`superpowers:systematic-debugging`)**: Cero conjeturas; recopila evidencia, aísla la causa raíz y valida antes de parchar.
- **Brainstorming Guiado (`superpowers:brainstorming`)**: Exploración de alternativas de diseño previo a la implementación.
- **Ejecución de Planes (`superpowers:executing-plans`)**: Desglose e implementación disciplinada de planes de trabajo.
- **Principios de Karpathy (`karpathy-guidelines`)**: Cambios quirúrgicos mínimos, código simple y verificación continua.

### 2. Auditorías Críticas & Code Review
- **Thermos (`thermos:thermos`)**: Auditoría nuclear con doble agente en paralelo para bugs críticos, brechas de seguridad y degradación de código.
- **Thermo Nuclear Code Quality Review (`thermo-nuclear-code-quality-review`)**: Aplicación de la regla de 1.000 líneas, eliminación de spaghetti y apego a estándares.
- **Anti-Slop (`antislop`, `antislop-code`)**: Remueve código repetitivo generado por IA, comentarios obvios y patrones innecesarios.

### 3. Frontend & Diseño UI/UX
- Patrones modernos para **React 18/19**, **Vue 3**, **Nuxt 4**, **Next.js**, **Vite** y **Tailwind CSS**.
- **Liquid Glass Design**, diseño para dispositivos móviles (`antislop-layoutmobile`) y accesibilidad WCAG (`antislop-human`, `accessibility`).

### 4. Backend, APIs & Bases de Datos
- Patrones e integración para **Django**, **FastAPI**, **Spring Boot**, **Ktor**, **Node/Express**, **Laravel**, **Go** y **Rust**.
- Optimización y diseño de esquemas en **PostgreSQL**, **MySQL**, **ClickHouse**, **Redis** y **JPA/Hibernate**.

### 5. Suite de SEO Profesional & GEO (Claude SEO)
- 26 sub-skills que cubren SEO técnico (`seo-technical`), marcado estructurado (`seo-schema`), backlinks (`seo-backlinks`), auditoría de páginas (`seo-page`), auditoría completa (`seo-audit`) y optimización para motores de respuesta de IA (`seo-geo`).

### 6. Agentes Autónomos & Orquestación
- Orquestación con **DevFleet**, bucles continuos de agentes (`continuous-agent-loop`), evaluación de modelos (`agent-eval`), harnesses estilo GAN (`gan-style-harness`) y multi-agentes (`team-agent-orchestration`).

### 7. Prospección & Negocios
- Motor autónomo **Harvey (`harvey`)** para prospección B2B y calificación de leads.
- Estrategia de contenidos multiplataforma (`content-engine`, `crosspost`) y captación de inversores (`investor-outreach`).

---

## 📁 Estructura del Repositorio

```text
skills-y-data/
├── README.md                 # Este documento
├── INSTALLER.md              # Guía de instalación y directiva para IA
├── install.sh                # Instalador desatendido en Bash (Linux/macOS)
├── install.ps1               # Instalador desatendido en PowerShell (Windows)
├── configs/
│   ├── import_manifest.json  # Manifiesto de registro para Antigravity
│   └── mcp_config.json       # Configuración lista para MCP servers
└── skills/
    └── graphify/             # Skill standalone de visualización de arquitecturas
        ├── SKILL.md
        ├── .graphify_version
        └── references/
            └── github-and-merge.md
```

---

## 🛠️ Comandos de Verificación en la Terminal

Tras la instalación, comprueba el estado ejecutando:

```bash
# Verificar plugins instalados y activos
agy plugin list

# Verificar servidores MCP habilitados
agy mcp list
```

---

## 📄 Licencia

Este repositorio recopila y orquesta herramientas y plugins de código abierto para agentes de IA. Cada plugin mantiene su respectiva licencia original (MIT, Apache 2.0, etc.) en sus repositorios de origen.
