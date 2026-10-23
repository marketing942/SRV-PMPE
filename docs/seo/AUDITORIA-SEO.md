# Auditoria SEO — SRV PMPE — Super Revisão de Véspera

Repositório: [`marketing942/SRV-PMPE`](https://github.com/marketing942/SRV-PMPE) · branch `seo/otimizacao-organica-20261023` (base `main`) · 23/10/2026
Relatório consolidado do ecossistema: [RELATORIO-GERAL-SEO-ECOSSISTEMA.md](RELATORIO-GERAL-SEO-ECOSSISTEMA.md)

## Arquitetura

- **Domínio de produção:** não identificado — evidência: o próprio `index.html` registra "⚠️ Falta: og:url (domínio final)".
- **Stack:** HTML + CSS + JavaScript estáticos. Vercel. Fontes do Google (Oxanium, Rajdhani).
- **Renderização:** HTML estático; preços e contagem regressiva escritos pelo `script.js` a partir do `CONFIG`.

## Rotas

| Rota | O que é | Indexação |
|---|---|---|
| / | Venda de ingressos da Super Revisão de Véspera PMPE (20/02/2027, Shopping Difusora, Caruaru-PE) | Indexar até o evento |

## Finalidade e classificação

- **Objetivo:** Vender ingressos (VIP R$ 167, Comum R$ 45, conforme `CONFIG.ingressos`) para a revisão presencial na véspera da prova da PMPE.
- **Unidade de negócio:** CPPEM Concursos
- **Público:** Candidatos à PMPE da região de Caruaru.
- **Tipo de página:** Página de evento / venda.
- **Indexação recomendada:** Indexar até o evento; depois, manter como "edição anterior" ou redirecionar para a próxima edição (decisão).
- **Potencial orgânico:** **Médio** — Busca local e sazonal (semanas antes de 21/02/2027). Concorrência direta em plataformas de evento (Sympla) e em blogs de revisão de véspera.

## Problemas encontrados

Gravidade: **P0** crítico (indexação/integridade) · **P1** alto impacto · **P2** médio · **P3** evolução · **Info** registro sem ação de SEO.

| Sev. | Problema | Evidência | Impacto | Status |
|---|---|---|---|---|
| P1 | Sem dados estruturados de evento |  | Sem elegibilidade para a experiência de eventos do Google | Corrigido (EducationEvent) |
| P1 | Domínio final desconhecido | Sem canonical/og:url; `og:image` relativa (`public/prova-03.webp`) | Preview e consolidação | Pendente (informar o domínio) |
| P2 | Description longa (233) |  | Corte; não usava "aulão" | Corrigido (163, com "aulão de véspera") |
| P2 | Horário e endereço completos ausentes | `CONFIG.inicio` sem hora ("o horário ainda não foi divulgado"); endereço só "Shopping Difusora, 5º piso" | Evento com hora e endereço completo é mais útil e mais completo no Google | Recomendado (o número do shopping diverge entre diretórios: 44 × 444) |
| P2 | Sem link para a Mentoria PMPE | Mesmo público e mesma prova | Link interno contextual perdido | Corrigido (rodapé → pmpe.cppem.com.br) |
| Info | noscript do GTM diferente das demais | `https://sgtm.cppem.com.br/metrics/ns.html` (sem `?id=GTM-PJ379FLQ`) | Só afeta quem navega sem JavaScript | Documentado (não alterado) |
| Info | Preço do VIP × mensagem de commit | Commit `198b0da`: "R$ 45 nos dois ingressos"; `CONFIG`: VIP R$ 167 | O JSON-LD espelha o CONFIG; confirmar com o checkout | Documentado |

## Limitações desta auditoria

- **Produção inacessível desta sessão.** O proxy de rede do ambiente recusou
  conexões a `*.cppem.com.br` e `*.vercel.app`, e o leitor de páginas não
  resolveu esses domínios. Nada foi medido no site publicado: HTML servido,
  status HTTP, redirecionamentos e headers reais ficam **não validados**.
  Toda a auditoria foi feita no código e em servidores locais.
- **Sem Google Search Console, GA4, Keyword Planner, Trends, Semrush ou Ahrefs.**
  Não há volume, dificuldade, CPC nem posição. Nenhum número desse tipo
  aparece aqui. As prioridades de palavra-chave são **estimativas
  qualitativas** (intenção, tipo de página que aparece hoje, relevância
  comercial) e devem ser confirmadas no Search Console e no Planejador.
- **SERP observada com a busca web disponível, que não é o Google.** Os
  concorrentes listados são os que apareceram nessa busca e servem como
  indício, não como ranking do Google.
- **Lighthouse é dado de laboratório**, rodado localmente com os terceiros
  (GTM, PixelX, fontes do Google) bloqueados. Serve para comparar antes ×
  depois, não para prever o Core Web Vitals real (dado de campo do CrUX).
