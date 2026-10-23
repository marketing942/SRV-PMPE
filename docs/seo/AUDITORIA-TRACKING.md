# Auditoria de tracking — SRV PMPE — Super Revisão de Véspera

Repositório: [`marketing942/SRV-PMPE`](https://github.com/marketing942/SRV-PMPE) · branch `seo/otimizacao-organica-20261023` (base `main`) · 23/10/2026
Relatório consolidado do ecossistema: [RELATORIO-GERAL-SEO-ECOSSISTEMA.md](RELATORIO-GERAL-SEO-ECOSSISTEMA.md)

Regra seguida: nenhum ID, evento, parâmetro, script, seletor, endpoint, UTM ou
regra de consentimento foi alterado. Nenhum token ou credencial aparece aqui.

## Inventário

| Integração | Onde | Detalhe |
|---|---|---|
| GTM server-side (loader first-party) | `index.html`, 1º script do `<head>` | `https://sgtm.cppem.com.br/metrics/` — o ID do container está no path; mesmo container das demais landings |
| GTM noscript | `index.html`, `<body>` | `https://sgtm.cppem.com.br/metrics/ns.html` (sem `?id=`; difere das demais landings) |
| PixelX | carregada pelo GTM (`pxa.cppem.com.br`) | máscara de telefone `.pxa_mask_phone`; o Lead é a regra do painel vinculada ao `id` do `<form>` |
| Evento `clique_cta_ingressos` | `script.js` (~linha 176) | botões "Garantir vaga" |
| Evento `clique_checkout` | `script.js` (~linha 188) | botões de ingresso; UTMs repassadas ao checkout |
| Checkout | `CONFIG.ingressos` | `checkout.cppem.com.br/pay/srv-pmpe-ingresso-{vip,comum}` |

## Antes × depois

- Arquivos de tracking/fluxo (`script.js`, `styles.css`, `vercel.json`): **sem nenhuma alteração** (`git diff` vazio).
- Mudanças só em `<head>` (metadados/JSON-LD), arquivos novos (robots, sitemap,
  imagens OG) e imagens otimizadas com o mesmo nome.
- Resultado dos testes de execução: ver [RELATORIO-DE-TESTES.md](RELATORIO-DE-TESTES.md).

## Classificação

- GTM loader, noscript, dataLayer, formulários, campos enviados à planilha,
  UTMs e redirecionamentos: **validado por teste de execução** (antes × depois idênticos).
- Lead da PixelX / conversões no Meta e no GTM server-side: **não validado por falta de acesso**.

## Riscos remanescentes

- noscript sem `?id=` (documentado, não alterado).
