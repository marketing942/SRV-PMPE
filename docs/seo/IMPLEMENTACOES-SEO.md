# Implementações de SEO — SRV PMPE — Super Revisão de Véspera

Repositório: [`marketing942/SRV-PMPE`](https://github.com/marketing942/SRV-PMPE) · branch `seo/otimizacao-organica-20261023` (base `main`) · 23/10/2026
Relatório consolidado do ecossistema: [RELATORIO-GERAL-SEO-ECOSSISTEMA.md](RELATORIO-GERAL-SEO-ECOSSISTEMA.md)

Commits na branch `seo/otimizacao-organica-20261023`. Nada foi publicado; merge e deploy dependem de aprovação.

## Arquivos modificados

| Arquivo | Alteração | Por quê |
|---|---|---|
| index.html (`<head>`) | Description, robots, JSON-LD EducationEvent (data, local, organizador, mentor, ofertas VIP/Comum iguais ao CONFIG) | Elegibilidade a eventos |
| index.html (rodapé) | Link "Mentoria PMPE" → `https://pmpe.cppem.com.br/` na coluna Cursos | Link interno contextual |
| robots.txt, .vercelignore (novos) |  |  |

## Metadados — antes × depois

Extraídos do HTML renderizado localmente (Playwright/HTTP), antes e depois.

| Campo | Antes | Depois |
|---|---|---|
| `title` | Super Revisão de Véspera PMPE — 20/02 em Caruaru – PE \| CPPEM | Super Revisão de Véspera PMPE — 20/02 em Caruaru – PE \| CPPEM |
| `description` | Super Revisão de Véspera PMPE do CPPEM em Caruaru – PE: 20 de fevereiro, presencial, no 5º piso do Shopping Difusora, com convidados especiais e o Prof. Everton Mota. A última revisão antes da prova da Polícia Militar de Pernambuco. | Aulão presencial de véspera da prova da PMPE em Caruaru – PE: 20/02, no 5º piso do Shopping Difusora, com o Prof. Everton Mota e convidados. Ingressos VIP e Comum. |
| `robots` | — | index, follow, max-image-preview:large |
| JSON-LD |  | EducationEvent |

## Dados estruturados

Só tipos aplicáveis e só com dados que a página mostra. Nada de avaliações,
preços inventados, prêmios ou credenciais. Sem `FAQPage` (o resultado de FAQ
foi restrito a sites de governo e saúde em 2023 — [Google — Mudanças nos resultados de FAQ/HowTo (2023)](https://developers.google.com/search/blog/2023/08/howto-faq-changes) — e o
changelog da documentação registra a descontinuação em 2026 — [Google — Atualizações da documentação da Pesquisa (changelog)](https://developers.google.com/search/updates)) e sem `Course`
(o Course Info saiu dos resultados em 2025: [Google — Simplificação da página de resultados (Course Info descontinuado, 2025)](https://developers.google.com/search/blog/2025/06/simplifying-search-results)). Sem promessa
de resultado enriquecido.

## Benefícios esperados

- Título e descrição alinhados à intenção principal → mais impressões
  relevantes e CTR (a confirmar no Search Console).
- Canonical absoluto → sinais concentrados no domínio de produção
  ([Google — Como especificar uma URL canônica](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)).
- `WebSite` com `name` no subdomínio → chance de o Google exibir o nome do site
  em vez do host ([Google — Nomes de sites na Pesquisa (subdomínios)](https://developers.google.com/search/docs/appearance/site-names)).
- Preview correto no WhatsApp/redes (tráfego de compartilhamento).
