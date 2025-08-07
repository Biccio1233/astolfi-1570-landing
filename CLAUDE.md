# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multi-purpose project combining:
1. **Astolfi 1570** - AI-powered fundraising consultancy system with automated client analysis
2. **BMAD-METHOD Framework** - Complete AI agent development methodology (v4.35.3)
3. **Landing Pages** - Italian-language marketing pages for the consultancy service

## Key Project Components

### Astolfi 1570 System
- **n8n Workflow**: `Astolfi 1570 - Analisi Cliente.json` - Automated client analysis pipeline
  - Webhook endpoint: `/astolfi1570_proposal`
  - Uses Perplexity API for research
  - OpenAI GPT-4 for analysis generation
  - Generates comprehensive fundraising proposals

### Landing Pages
- `landingpage_modificata.html` - Main consultancy landing page
- `l2_modificato.html` - Alternative landing page variant
- Both pages are in Italian and feature modern, responsive design

## BMAD-METHOD Commands

BMAD-METHOD is installed and configured for Claude Code. Use these slash commands:

### Agent Commands
- `/analyst` - Requirements analysis and research
- `/architect` - System architecture design
- `/dev` - Development implementation
- `/pm` - Project management
- `/qa` - Quality assurance
- `/bmad-master` - Master orchestrator
- `/bmad-orchestrator` - Workflow orchestration
- `/po` - Product owner
- `/sm` - Scrum master
- `/ux-expert` - UX design

### Task Commands
**Story Management:**
- `/create-next-story` - Generate next development story
- `/review-story` - Review and validate stories
- `/validate-next-story` - Validate story readiness
- `/brownfield-create-story` - Create story for existing code

**Project Documentation:**
- `/document-project` - Generate project documentation
- `/create-doc` - Create specific documentation
- `/shard-doc` - Split documentation for development

**Research & Analysis:**
- `/advanced-elicitation` - Deep requirements gathering
- `/create-deep-research-prompt` - Generate research prompts
- `/facilitate-brainstorming-session` - Structured brainstorming

## BMAD Workflow

### Planning Phase (Greenfield Projects)
1. Optional: Use `/analyst` for market research and competitor analysis
2. Create Project Brief with `/analyst`
3. Generate PRD with `/pm`
4. If UI needed: Create Front-End Spec with `/ux-expert`
5. Create Architecture with `/architect`
6. Run master checklist with `/po`
7. Shard documents for development

### Development Phase
1. Use `/sm` to manage sprint workflow
2. Use `/create-next-story` to generate stories
3. Implement with `/dev`
4. Test with `/qa`
5. Review with `/review-story`

### Brownfield Projects
For existing codebases:
- Use `/brownfield-create-epic` for epics
- Use `/brownfield-create-story` for stories
- Reference `.bmad-core/working-in-the-brownfield.md` for detailed guidance

## Project Structure

```
/Users/bix/Desktop/AI.M/0. FR/
├── Astolfi 1570 - Analisi Cliente.json  # n8n workflow
├── landingpage_modificata.html          # Main landing page
├── l2_modificato.html                   # Alternative landing
├── .bmad-core/                          # BMAD framework
│   ├── agents/                          # Agent definitions
│   ├── tasks/                           # Task definitions
│   ├── workflows/                       # Workflow configs
│   └── templates/                       # PRD/architecture templates
├── .claude/                             # Claude Code config
│   ├── commands/BMad/                   # BMAD commands
│   └── settings.local.json              # Local permissions
└── BMAD-METHOD/                         # Framework source
```

## Development Commands

### BMAD-METHOD Management
```bash
# Run BMAD installer
node BMAD-METHOD/tools/installer/bin/bmad.js install

# Build BMAD components
cd BMAD-METHOD && npm run build

# Validate BMAD setup
cd BMAD-METHOD && npm run validate
```

### n8n Workflow Deployment
The Astolfi 1570 workflow can be imported into n8n instances. Required credentials:
- Perplexity API key
- OpenAI API key
- Webhook configuration

## Architecture Notes

### Astolfi 1570 Workflow Architecture
1. **Input**: Webhook receives company data (name, city, sector, website, contact)
2. **Research Phase**: Perplexity searches for company information
3. **Analysis Phase**: GPT-4 generates fundraising proposals
4. **Output**: Comprehensive proposal with fundraising strategies

### BMAD Integration Architecture
- **Command Layer**: `.claude/commands/BMad/` provides slash command interface
- **Agent Layer**: `.bmad-core/agents/` contains agent personalities and capabilities
- **Task Layer**: `.bmad-core/tasks/` defines specific development tasks
- **Workflow Layer**: `.bmad-core/workflows/` orchestrates agent collaboration

## Key Configuration Files

- `.bmad-core/core-config.yaml` - BMAD core settings
- `.claude/settings.local.json` - Claude Code permissions (WebFetch, Bash enabled)
- `BMAD-METHOD/package.json` - Framework dependencies (Node >=20.0.0 required)

## Available Workflows

**Greenfield Development:**
- `greenfield-fullstack.yaml` - Full-stack new projects
- `greenfield-service.yaml` - Backend services
- `greenfield-ui.yaml` - Frontend applications

**Brownfield Development:**
- `brownfield-fullstack.yaml` - Existing full-stack projects
- `brownfield-service.yaml` - Existing backend services
- `brownfield-ui.yaml` - Existing frontend applications

## References

- **BMAD User Guide**: `.bmad-core/user-guide.md`
- **IDE Workflow Guide**: `.bmad-core/enhanced-ide-development-workflow.md`
- **Brownfield Guide**: `.bmad-core/working-in-the-brownfield.md`