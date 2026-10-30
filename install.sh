#!/usr/bin/env bash
# ==============================================================================
# Antigravity (agy) All-In-One Skills & Plugins Installer
# Repositorio: https://github.com/Arlia1/skills-y-data.git
# ==============================================================================
set -e

# Colores para salida de terminal
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================================${NC}"
echo -e "${BLUE}   🚀 Antigravity (agy) - Instalador de Plugins & Skills   ${NC}"
echo -e "${BLUE}======================================================${NC}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_DIR="${HOME}/.gemini/config"
PLUGINS_DIR="${CONFIG_DIR}/plugins"
SKILLS_DIR="${CONFIG_DIR}/skills"

echo -e "\n${YELLOW}[1/5] Preparando directorios base en ${CONFIG_DIR}...${NC}"
mkdir -p "${PLUGINS_DIR}"
mkdir -p "${SKILLS_DIR}"
echo -e "${GREEN}✓ Directorios listos.${NC}"

# Función helper para clonar o actualizar un repositorio git
clone_or_update() {
    local name="$1"
    local repo_url="$2"
    local target_dir="${PLUGINS_DIR}/${name}"
    local branch="$3"

    echo -e "\n${BLUE}--> Instalando plugin: ${name}...${NC}"
    if [ -d "${target_dir}/.git" ]; then
        echo -e "    ${YELLOW}Actualizando ${name} existente...${NC}"
        git -C "${target_dir}" fetch origin --quiet || true
        git -C "${target_dir}" pull --ff-only --quiet || true
        echo -e "    ${GREEN}✓ ${name} actualizado.${NC}"
    elif [ -d "${target_dir}" ]; then
        echo -e "    ${YELLOW}El directorio ${name} ya existe (sin .git). Manteniendo archivos.${NC}"
    else
        echo -e "    Clonando desde ${repo_url}..."
        if [ -n "${branch}" ]; then
            git clone --depth 1 --branch "${branch}" "${repo_url}" "${target_dir}" --quiet
        else
            git clone --depth 1 "${repo_url}" "${target_dir}" --quiet
        fi
        echo -e "    ${GREEN}✓ ${name} instalado correctamente.${NC}"
    fi
}

echo -e "\n${YELLOW}[2/5] Descargando e instalando los 8 Plugins oficiales...${NC}"

# 1. Antislop (6 skills, 2 rules)
clone_or_update "antislop" "https://github.com/miqdadbadjuber/anti-slop.git"

# 2. Claude SEO (26 skills, 19 agents, 1 hook)
clone_or_update "claude-seo" "https://github.com/AgriciDaniel/claude-seo.git"

# 3. ECC - Everything Claude Code (408 skills, 71 agents, 23 rules, 1 hook)
clone_or_update "ecc" "https://github.com/affaan-m/ECC.git"

# 4. Harvey (1 skill - Ventas B2B y prospección)
clone_or_update "harvey" "https://github.com/ethanplusai/harvey.git"

# 5. I Have ADHD (1 skill, 1 rule - Enfoque y formato conciso)
clone_or_update "i-have-adhd" "https://github.com/ayghri/i-have-adhd.git"

# 6. Karpathy Guidelines (1 skill - Filosofía de código limpio)
clone_or_update "karpathy-guidelines" "https://github.com/multica-ai/andrej-karpathy-skills.git"

# 7. Superpowers (15 skills - TDD, debugging, ejecución de planes)
clone_or_update "superpowers" "https://github.com/obra/superpowers.git"

# 8. Thermos (3 skills, 2 agents - Auditorías termonucleares de código)
clone_or_update "thermos" "https://github.com/LayZeeDK/thermos-claude-plugin.git" "v1.1.0"

echo -e "\n${YELLOW}[3/5] Instalando Skills Standalone (Graphify)...${NC}"
if [ -d "${SCRIPT_DIR}/skills/graphify" ]; then
    cp -r "${SCRIPT_DIR}/skills/graphify" "${SKILLS_DIR}/"
    echo -e "${GREEN}✓ Skill graphify copiada a ${SKILLS_DIR}/graphify.${NC}"
else
    echo -e "${YELLOW}Aviso: No se encontró la carpeta skills/graphify local en este repo.${NC}"
fi

# Instalar paquete Python para graphify si pip está disponible
if command -v pip3 &>/dev/null || command -v pip &>/dev/null; then
    echo -e "    Instalando dependencia Python 'graphifyy'..."
    python3 -m pip install --user --quiet graphifyy 2>/dev/null || pip install --user --quiet graphifyy 2>/dev/null || echo -e "    ${YELLOW}(Opcional) No se pudo instalar graphifyy via pip. Puedes instalarlo con 'pip install graphifyy'.${NC}"
fi

echo -e "\n${YELLOW}[4/5] Configurando import_manifest.json y Servidores MCP...${NC}"

# Copiar import_manifest.json
if [ -f "${SCRIPT_DIR}/configs/import_manifest.json" ]; then
    cp "${SCRIPT_DIR}/configs/import_manifest.json" "${CONFIG_DIR}/import_manifest.json"
    echo -e "${GREEN}✓ import_manifest.json configurado.${NC}"
fi

# Configurar MCP Servers (memory & sequential-thinking)
if [ -f "${SCRIPT_DIR}/configs/mcp_config.json" ]; then
    if [ -f "${CONFIG_DIR}/mcp_config.json" ]; then
        echo -e "    ${YELLOW}mcp_config.json ya existe. Creando respaldo y actualizando...${NC}"
        cp "${CONFIG_DIR}/mcp_config.json" "${CONFIG_DIR}/mcp_config.json.bak"
    fi
    cp "${SCRIPT_DIR}/configs/mcp_config.json" "${CONFIG_DIR}/mcp_config.json"
    echo -e "${GREEN}✓ mcp_config.json configurado con servers: memory y sequential-thinking.${NC}"
fi

echo -e "\n${YELLOW}[5/5] Verificando instalación en Antigravity CLI (agy)...${NC}"
if command -v agy &>/dev/null; then
    echo -e "${GREEN}✓ agy CLI detectado en el sistema:${NC}\n"
    agy plugin list || true
    echo ""
    agy mcp list || true
else
    echo -e "${YELLOW}Nota: 'agy' no está en tu PATH actual.${NC}"
    echo -e "Los plugins y skills se instalaron en ~/.gemini/config y se activarán automáticamente cuando inicies Antigravity."
fi

echo -e "\n${GREEN}======================================================${NC}"
echo -e "${GREEN}   🎉 ¡Instalación completada con éxito!            ${NC}"
echo -e "${GREEN}   - 8 Plugins oficiales instalados                 ${NC}"
echo -e "${GREEN}   - 460+ Skills disponibles                        ${NC}"
echo -e "${GREEN}   - 92 Agentes especializados listos               ${NC}"
echo -e "${GREEN}   - 2 MCP Servers (memory, sequential-thinking)    ${NC}"
echo -e "${GREEN}======================================================${NC}"
