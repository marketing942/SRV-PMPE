/* =========================================================
   CPPEM · SUPER REVISÃO DE VÉSPERA PMPE
   ---------------------------------------------------------
   Base: Aulão PMPE (visual e entrada da hero). O script faz cinco coisas:

     1. INGRESSOS   preços e links de compra (a partir do CONFIG)
     2. RELÓGIO     a contagem regressiva até 20/02
     3. ENTRADA     as faíscas do carimbo do brasão na hero
     4. PÁGINA      header, progresso, dock, reveal, carrossel
     5. ATMOSFERA   brasas, faíscas, brilho no cursor

   ⚠️ Tudo que muda com a venda (preços, links) mora no CONFIG abaixo.
   ========================================================= */
(function () {
  "use strict";

  var CONFIG = {
    pagina: "Super Revisão de Véspera PMPE",

    /* Dia do evento, com fuso. A contagem vai até o começo do dia 20/02:
       o horário ainda não foi divulgado e o relógio não pode inventar um. */
    inicio: "2027-02-20T00:00:00-03:00",

    /* ─── INGRESSOS ─────────────────────────────────────────
       · preco: texto pronto ("R$ 49,90"). Vazio + checkout preenchido =
         "Vendas abertas".
       · parcelas / parcela (opcionais): a PARCELA vira o número grande e o
         à vista desce para a linha de baixo. Copie do checkout — se houver
         juros, a página NUNCA pode dizer "sem juros".
       · precoDe / off (opcionais): o "de R$ X" riscado e o desconto — os
         MESMOS números do checkout, senão a página contradiz a tela de
         pagamento no momento em que a pessoa vai digitar o cartão.
       · checkout: link do produto. Vazio = o botão mostra o aviso
         "vendas abrem em breve" em vez de navegar.
       · produto: o nome que vai no evento de clique do dataLayer. */
    ingressos: {
      comum: {
        produto: "Ingresso Comum — Super Revisão de Véspera PMPE",
        preco: "R$ 45,00", precoDe: "R$ 100,00", off: "-55%",
        checkout: "https://checkout.cppem.com.br/pay/srv-pmpe-ingresso-comum"
      },
      vip: {
        produto: "Ingresso VIP — Super Revisão de Véspera PMPE",
        preco: "R$ 45,00", precoDe: "R$ 100,00", off: "-55%",
        checkout: "https://checkout.cppem.com.br/pay/srv-pmpe-ingresso-vip"
      }
    }
  };

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }
  function push(dados) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(dados);
  }

  /* =========================================================
     1 · INGRESSOS
     ========================================================= */
  var ING = CONFIG.ingressos;

  /* UTMs e ids de clique da visita seguem para o checkout: sem isso a venda
     chega lá sem origem. */
  var PASSA = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "src", "sck", "fbclid", "gclid"];
  var params = new URLSearchParams(window.location.search);

  function linkDe(tipo) {
    var dados = ING[tipo];
    if (!dados || !dados.checkout) return "";
    var url = new URL(dados.checkout);
    PASSA.forEach(function (k) {
      var v = params.get(k);
      if (v) url.searchParams.set(k, v);
    });
    return url.toString();
  }

  function semPreco(dados) {
    return dados.preco || (dados.checkout ? "Vendas abertas" : "Em breve");
  }

  /* Com parcela: "12x de" pequeno + a parcela grande, e o à vista na linha
     de baixo. Sem parcela: o preço cheio, grande. */
  function escrevePreco(el, dados) {
    var tipo = el.getAttribute("data-ingresso-preco");
    var avista = $('[data-ingresso-avista="' + tipo + '"]');
    var parcelado = !!(dados.parcela && dados.preco);

    el.textContent = "";
    if (parcelado) {
      var x = document.createElement("small");
      x.textContent = (dados.parcelas || "12x") + " de";
      el.appendChild(x);
      el.appendChild(document.createTextNode(" " + dados.parcela));
    } else {
      el.textContent = semPreco(dados);
    }
    el.classList.toggle("is-vazio", !dados.preco);
    el.classList.toggle("is-parcela", parcelado);

    if (avista) {
      avista.hidden = !parcelado;
      if (parcelado) $("strong", avista).textContent = dados.preco;
    }

    var de = $('[data-ingresso-de="' + tipo + '"]');
    if (de) {
      de.hidden = !(dados.precoDe && dados.preco);
      if (!de.hidden) {
        $("s", de).textContent = dados.precoDe;
        $("em", de).textContent = dados.off || "";
        $("em", de).hidden = !dados.off;
      }
    }
  }

  $$("[data-ingresso-preco]").forEach(function (el) {
    var dados = ING[el.getAttribute("data-ingresso-preco")];
    if (dados) escrevePreco(el, dados);
  });

  /* ─── a faixa de alerta ───
     Troca a mensagem a cada 2,8s. A classe tem-alerta no <html> abre espaço
     para a faixa na hero. Só verdades: venda aberta, data e local. */
  var algumAberto = !!(ING.comum.checkout || ING.vip.checkout);
  (function alerta() {
    var faixa = $("[data-alerta]");
    var txt = faixa && $("[data-alerta-txt]", faixa);
    if (!faixa || !txt) return;

    var mensagens = algumAberto
      ? ["Vendas abertas!", "Vagas VIP limitadas", "20/02 · Shopping Difusora", "A véspera é uma só"]
      : [];
    faixa.hidden = !mensagens.length;
    document.documentElement.classList.toggle("tem-alerta", mensagens.length > 0);
    if (!mensagens.length) return;

    var i = 0;
    txt.textContent = mensagens[0];
    if (reduced) return;
    setInterval(function () {
      i = (i + 1) % mensagens.length;
      txt.classList.add("is-trocando");
      setTimeout(function () {
        txt.textContent = mensagens[i];
        txt.classList.remove("is-trocando");
      }, 220);
    }, 2800);
  })();

  if (!algumAberto) {
    $$("[data-urgencia]").forEach(function (el) {
      el.textContent = "Vendas abrem em breve — fique de olho nesta página.";
    });
  }

  /* ─── aviso de venda fechada ─── */
  var aviso = document.getElementById("aviso");
  var avisoTimer = null;

  function mostrarAviso() {
    if (!aviso) return;
    aviso.classList.add("is-on");
    clearTimeout(avisoTimer);
    avisoTimer = setTimeout(function () { aviso.classList.remove("is-on"); }, 3800);
  }

  /* [data-cta] "Garantir vaga" do header, hero, dock e final: descem até
     #ingressos (o próprio href faz isso), aqui só marcamos. */
  $$("[data-cta]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      push({ event: "clique_cta_ingressos", pagina: CONFIG.pagina });
    });
  });

  /* [data-compra] os botões de cada ingresso: vão direto ao checkout.
     Sem link no CONFIG, mostram o aviso em vez de navegar. */
  $$("[data-compra]").forEach(function (btn) {
    var tipo = btn.getAttribute("data-compra");
    var url = linkDe(tipo);
    btn.href = url || "#ingressos";
    btn.addEventListener("click", function (e) {
      push({
        event: "clique_checkout",
        pagina: CONFIG.pagina,
        produto: ING[tipo] ? ING[tipo].produto : tipo,
        destino: url ? "checkout" : "em_breve"
      });
      if (url) return;
      e.preventDefault();
      mostrarAviso();
    });
  });

  /* =========================================================
     2 · O RELÓGIO — some inteiro quando o dia 20/02 chega
     ========================================================= */
  (function relogio() {
    var alvo = new Date(CONFIG.inicio).getTime();
    var blocos = $$("[data-relogio-bloco], [data-relogio]");
    var timer = null;

    function pinta() {
      var falta = alvo - Date.now();
      if (!(falta > 0)) {
        blocos.forEach(function (el) { el.hidden = true; });
        clearInterval(timer);
        return;
      }
      var s = Math.floor(falta / 1000);
      var partes = {
        d: Math.floor(s / 86400),
        h: Math.floor((s % 86400) / 3600),
        m: Math.floor((s % 3600) / 60),
        s: s % 60
      };
      Object.keys(partes).forEach(function (k) {
        var v = partes[k] < 10 ? "0" + partes[k] : String(partes[k]);
        $$('[data-cd="' + k + '"]').forEach(function (el) { el.textContent = v; });
      });
    }
    pinta();
    timer = setInterval(pinta, 1000);
  })();

  /* =========================================================
     3 · A ENTRADA — o carimbo do brasão
     A batida é toda CSS. Daqui só saem as faíscas, no animationend de cada
     queda — nunca calculado por tempo.
     ========================================================= */
  var TONS_CACO = ["#FFE7B0", "#C9AE7A", "#C4703F"];

  function estilhacar(alvo, px, py, quantos, forca) {
    if (!alvo || reduced) return;
    alvo.textContent = "";
    for (var i = 0; i < quantos; i++) {
      var caco = document.createElement("i");
      var ang  = Math.random() * Math.PI * 2;
      var dist = forca * (.42 + Math.random());
      caco.className = "caco";
      caco.style.setProperty("--ox", px + "px");
      caco.style.setProperty("--oy", py + "px");
      caco.style.setProperty("--dx", Math.cos(ang) * dist + "px");
      caco.style.setProperty("--dy", Math.sin(ang) * dist + "px");
      caco.style.setProperty("--s", (2 + Math.random() * 4).toFixed(1) + "px");
      caco.style.setProperty("--cor", TONS_CACO[Math.floor(Math.random() * TONS_CACO.length)]);
      caco.style.setProperty("--dur", (.5 + Math.random() * .6).toFixed(2) + "s");
      alvo.appendChild(caco);
    }
    setTimeout(function () { alvo.textContent = ""; }, 1400);
  }

  (function carimbo() {
    var selo   = document.getElementById("seloHero");
    var edital = document.getElementById("editalCarimbo");
    var cacos  = document.getElementById("heroCacos");
    var hero   = document.getElementById("topo");
    if (!selo || !cacos || !hero || reduced) return;

    function centro(el) {
      var re = el.getBoundingClientRect();
      var rh = hero.getBoundingClientRect();
      return [re.left - rh.left + re.width / 2, re.top - rh.top + re.height / 2];
    }
    function camada() {
      var c = document.createElement("div");
      c.className = "hero__cacos";
      c.setAttribute("aria-hidden", "true");
      hero.appendChild(c);
      return c;
    }

    var leao = $(".cena__leao");
    if (leao) {
      leao.addEventListener("animationend", function (e) {
        if (e.animationName !== "leao-rompe") return;
        var c = centro(leao);
        estilhacar(cacos, c[0], c[1], 70, 420);
      });
    }

    var cacosB = camada();
    selo.addEventListener("animationend", function (e) {
      if (e.animationName !== "carimbo-cai") return;
      var c = centro(selo);
      estilhacar(cacosB, c[0], c[1], 44, 300);
    });

    if (edital) {
      var cacos2 = camada();
      edital.addEventListener("animationend", function (e) {
        if (e.animationName !== "edital-bate") return;
        var c = centro(edital);
        estilhacar(cacos2, c[0], c[1], 22, 150);
      });
    }
  })();

  /* =========================================================
     4 · HEADER, PROGRESSO, PARALLAX, DOCK, REVEAL, CARROSSEL
     ========================================================= */
  var header   = document.getElementById("header");
  var progress = document.getElementById("progress");
  var heroBg   = document.getElementById("heroBg");
  var dock     = document.getElementById("dock");
  var whats    = document.getElementById("whats");
  var ticking  = false;

  function render() {
    var y  = window.scrollY;
    var vh = window.innerHeight;
    if (header) header.classList.toggle("is-stuck", y > 40);

    if (progress) {
      var max = document.documentElement.scrollHeight - vh;
      progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    }

    /* A dock e o WhatsApp só entram depois da hero. */
    var passouHero = y > vh * 0.85;
    if (dock)  dock.classList.toggle("is-on", passouHero);
    if (whats) whats.classList.toggle("is-on", passouHero);

    if (!reduced && heroBg && y < vh * 1.2) {
      heroBg.style.transform = "translateY(" + (y * 0.16) + "px)";
    }
    ticking = false;
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(render); } }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  render();

  /* ─── reveal ao rolar ─── */
  var alvos = $$(".section__head, .pilar, .carrossel, .info, .plano, .faq__item, .final__inner");
  alvos.forEach(function (el) { el.classList.add("reveal"); });

  if (!("IntersectionObserver" in window)) {
    alvos.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      var i = 0;
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.style.transitionDelay = (i++ * 70) + "ms";
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px" });
    alvos.forEach(function (el) { io.observe(el); });
  }

  /* ─── carrossel da prova social ───
     O trilho é scroll-snap nativo; aqui entram setas, bolinhas e o avanço
     automático. O avanço para de vez no primeiro toque, clique ou foco do
     visitante — quem está olhando uma foto não pode tê-la puxada da mão. */
  $$("[data-carrossel]").forEach(function (raiz) {
    var trilho = $("[data-carrossel-trilho]", raiz);
    var itens  = $$(".carrossel__item", raiz);
    var ctrl   = $("[data-carrossel-ctrl]", raiz);
    var dotsEl = $("[data-carrossel-dots]", raiz);
    if (!trilho || itens.length < 2) return;

    var atual = 0;
    var auto = null;
    var parado = false;   // o visitante mexeu: o avanço automático não volta

    var dots = itens.map(function (_, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "carrossel__dot";
      b.setAttribute("aria-label", "Ir para a foto " + (i + 1));
      b.addEventListener("click", function () { parar(); ir(i); });
      dotsEl.appendChild(b);
      return b;
    });
    if (ctrl) ctrl.hidden = false;

    function marcar(i) {
      atual = i;
      dots.forEach(function (d, k) {
        d.classList.toggle("is-on", k === i);
        d.setAttribute("aria-current", k === i ? "true" : "false");
      });
      itens.forEach(function (it, k) { it.classList.toggle("is-on", k === i); });
    }

    function ir(i) {
      var n = (i + itens.length) % itens.length;
      var alvo = itens[n];
      trilho.scrollTo({
        left: alvo.offsetLeft - (trilho.clientWidth - alvo.clientWidth) / 2,
        behavior: reduced ? "auto" : "smooth"
      });
      marcar(n);
    }

    /* a foto "atual" é a mais próxima do centro do trilho */
    var raf = null;
    trilho.addEventListener("scroll", function () {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        var meio = trilho.scrollLeft + trilho.clientWidth / 2;
        var melhor = 0, dist = Infinity;
        itens.forEach(function (it, k) {
          var d = Math.abs(it.offsetLeft + it.clientWidth / 2 - meio);
          if (d < dist) { dist = d; melhor = k; }
        });
        if (melhor !== atual) marcar(melhor);
      });
    }, { passive: true });

    $("[data-carrossel-ant]", raiz).addEventListener("click", function () { parar(); ir(atual - 1); });
    $("[data-carrossel-prox]", raiz).addEventListener("click", function () { parar(); ir(atual + 1); });
    trilho.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); parar(); ir(atual + 1); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); parar(); ir(atual - 1); }
    });

    function pausar() { clearInterval(auto); auto = null; }
    function parar() { parado = true; pausar(); }
    ["pointerdown", "wheel", "touchstart", "focusin"].forEach(function (ev) {
      raiz.addEventListener(ev, parar, { passive: true });
    });

    marcar(0);

    /* só anda sozinho enquanto está na tela */
    if (!reduced && "IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && !auto && !parado) {
            auto = setInterval(function () { ir(atual + 1); }, 4500);
          } else if (!e.isIntersecting) {
            pausar();
          }
        });
      }, { threshold: 0.5 }).observe(raiz);
    }
  });

  /* =========================================================
     5 · ATMOSFERA — brasas e faíscas
     ========================================================= */
  var TONS = [
    "rgba(201,174,122,.9)",   // ouro claro
    "rgba(175,146,86,.85)",   // ouro
    "rgba(196,112,63,.85)"    // brasa quente
  ];

  function semear(alvo, quantidade) {
    if (!alvo || reduced) return;
    for (var b = 0; b < quantidade; b++) {
      var br = document.createElement("i");
      br.className = "brasa";
      br.style.setProperty("--x", (Math.random() * 100).toFixed(2) + "%");
      br.style.setProperty("--s", (2 + Math.random() * 3).toFixed(1) + "px");
      br.style.setProperty("--cor", TONS[Math.random() < .34 ? 2 : (Math.random() < .5 ? 0 : 1)]);
      br.style.setProperty("--op", (.35 + Math.random() * .45).toFixed(2));
      br.style.setProperty("--dur", (13 + Math.random() * 13).toFixed(1) + "s");
      br.style.setProperty("--atraso", "-" + (Math.random() * 26).toFixed(1) + "s");
      alvo.appendChild(br);
    }
  }
  semear(document.getElementById("brasas"), 22);
  semear(document.getElementById("heroBrasas"), 46);

  var sparks = document.getElementById("sparks");
  if (sparks && !reduced) {
    for (var s = 0; s < 16; s++) {
      var sp = document.createElement("i");
      sp.className = "spark";
      sp.style.left = (Math.random() * 100) + "%";
      sp.style.bottom = (Math.random() * 40) + "%";
      sp.style.animationDuration = (7 + Math.random() * 7) + "s";
      sp.style.animationDelay = (Math.random() * 8) + "s";
      sparks.appendChild(sp);
    }
  }

  $$(".pilar").forEach(function (el) {
    el.addEventListener("mousemove", function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
      el.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
    });
  });

  var ano = document.getElementById("year");
  if (ano) ano.textContent = new Date().getFullYear();

})();
