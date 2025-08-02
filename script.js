let vidas = 3;
let pontos = 0;
let evidencias = 0;
let inventario = [];

let cenaAtual = "inicio";

const cenas = {
  inicio: {
    texto: "Você chegou à cena do crime. O corpo está no chão da sala. O que você faz?",
    opcoes: [
      { texto: "🕵️‍♂️ Examinar o corpo", proxCena: "corpo", item: "Ferida no pescoço", pontos: 2 },
      { texto: "👣 Procurar pegadas", proxCena: "pegadas", item: "Pegadas com lama", pontos: 1 },
      { texto: "📞 Chamar reforços", proxCena: "reforcos", penaliza: true }
    ]
  },

  corpo: {
    texto: "Você examina o corpo e nota uma ferida precisa no pescoço. O que deseja fazer em seguida?",
    opcoes: [
      { texto: "🔍 Investigar a área ao redor", proxCena: "area_perto_corpo", item: "Fios de cabelo estranho", pontos: 1 },
      { texto: "📋 Fazer relatório preliminar", proxCena: "relatorio", pontos: 1 }
    ]
  },

  pegadas: {
    texto: "As pegadas parecem recentes e levam para a cozinha. Próximo passo?",
    opcoes: [
      { texto: "Seguir pegadas até a cozinha", proxCena: "cozinha", pontos: 1 },
      { texto: "Coletar amostra da lama", proxCena: "amostra_lama", item: "Amostra de lama", pontos: 2 }
    ]
  },

  reforcos: {
    texto: "Você chama reforços, mas perde tempo e deixa pistas esfriar.",
    opcoes: [
      { texto: "Voltar à investigação", proxCena: "inicio" }
    ],
    penaliza: true
  },

  area_perto_corpo: {
    texto: "Você encontra fios de cabelo estranho perto do corpo.",
    opcoes: [
      { texto: "Enviar para análise", proxCena: "esperar_analise", item: "Fios de cabelo estranho", pontos: 2 },
      { texto: "Ignorar e continuar procurando", proxCena: "cozinha" }
    ]
  },

  relatorio: {
    texto: "Você escreve um relatório preliminar e prepara-se para a próxima etapa.",
    opcoes: [
      { texto: "Ir para a cozinha", proxCena: "cozinha" }
    ]
  },

  amostra_lama: {
    texto: "A amostra de lama pode ser importante para rastrear suspeitos.",
    opcoes: [
      { texto: "Seguir pegadas até a cozinha", proxCena: "cozinha" }
    ]
  },

  cozinha: {
    texto: "Na cozinha, há uma faca com digitais e um bilhete rasgado. O que fazer?",
    opcoes: [
      { texto: "Analisar a faca", proxCena: "faca", item: "Faca com digitais", pontos: 2 },
      { texto: "Ler o bilhete", proxCena: "bilhete", item: "Bilhete ameaçador", pontos: 2 },
      { texto: "Inspecionar a lixeira", proxCena: "lixeira" }
    ]
  },

  faca: {
    texto: "A faca tem digitais parciais. Próximo passo?",
    opcoes: [
      { texto: "Coletar digitais", proxCena: "esperar_analise_faca", pontos: 1 },
      { texto: "Ignorar e ir ao quarto", proxCena: "quarto" }
    ]
  },

  bilhete: {
    texto: "O bilhete menciona vingança. Próximo passo?",
    opcoes: [
      { texto: "Ir ao quarto", proxCena: "quarto" },
      { texto: "Procurar mais pistas na cozinha", proxCena: "cozinha_pistas" }
    ]
  },

  lixeira: {
    texto: "Na lixeira há restos suspeitos. O que fazer?",
    opcoes: [
      { texto: "Coletar restos para análise", proxCena: "esperar_analise_lixeira", pontos: 2 },
      { texto: "Ignorar e ir ao quarto", proxCena: "quarto" }
    ]
  },

  cozinha_pistas: {
    texto: "Você acha um pedaço de roupa rasgado perto da cozinha.",
    opcoes: [
      { texto: "Guardar como evidência", proxCena: "quarto", item: "Roupa rasgada", pontos: 1 }
    ]
  },

  esperar_analise: {
    texto: "Esperando análise dos fios de cabelo...",
    opcoes: [
      { texto: "Continuar investigação no quarto", proxCena: "quarto" }
    ]
  },

  esperar_analise_faca: {
    texto: "Esperando resultados das digitais da faca...",
    opcoes: [
      { texto: "Investigar quarto", proxCena: "quarto" }
    ]
  },

  esperar_analise_lixeira: {
    texto: "Esperando resultados da análise dos restos da lixeira...",
    opcoes: [
      { texto: "Investigar quarto", proxCena: "quarto" }
    ]
  },

  quarto: {
    texto: "No quarto há marcas de unha na parede e fotos espalhadas.",
    opcoes: [
      { texto: "Coletar lasca de unha", proxCena: "lasca_unha", item: "Lasca de unha", pontos: 1 },
      { texto: "Analisar fotos", proxCena: "fotos", item: "Fotos do irmão", pontos: 1 },
      { texto: "Vasculhar gavetas", proxCena: "gavetas", item: "Carta de ameaça antiga", pontos: 2 }
    ]
  },

  lasca_unha: {
    texto: "Lasca coletada. Próximo passo?",
    opcoes: [
      { texto: "Voltar para sala principal", proxCena: "sala_principal" }
    ]
  },

  fotos: {
    texto: "As fotos mostram um desentendimento com o irmão da vítima.",
    opcoes: [
      { texto: "Guardar fotos como evidência", proxCena: "sala_principal" }
    ]
  },

  gavetas: {
    texto: "Carta antiga mostra uma ameaça clara ao falecido.",
    opcoes: [
      { texto: "Guardar carta como evidência", proxCena: "sala_principal" }
    ]
  },

  sala_principal: {
    texto: "Você revisa todas as evidências coletadas e precisa escolher o suspeito.",
    opcoes: [
      { texto: "Acusar o irmão", proxCena: "final_irmao" },
      { texto: "Acusar o vizinho", proxCena: "final_vizinho" },
      { texto: "Acusar o caseiro", proxCena: "final_caseiro" }
    ]
  },

  final_irmao: {
    texto: "Você acusa o irmão da vítima.",
    verificar: () => inventario.includes("Bilhete ameaçador") && inventario.includes("Fotos do irmão"),
    sucessoTexto: "Você acertou! As evidências apontam para vingança familiar. Caso encerrado!",
    fracassoTexto: "As evidências não são suficientes para condenar o irmão. O caso continua.",
  },

  final_vizinho: {
    texto: "Você acusa o vizinho.",
    verificar: () => inventario.includes("Amostra de lama") && inventario.includes("Roupa rasgada"),
    sucessoTexto: "Você acertou! O vizinho estava envolvido, pistas de lama e roupa confirmam isso.",
    fracassoTexto: "Faltam evidências sólidas contra o vizinho. O caso não foi resolvido.",
  },

  final_caseiro: {
    texto: "Você acusa o caseiro.",
    verificar: () => inventario.includes("Lasca de unha") && inventario.includes("Faca com digitais"),
    sucessoTexto: "Você acertou! O caseiro deixou digitais na faca e uma lasca de unha. Caso fechado.",
    fracassoTexto: "Não há provas suficientes para acusar o caseiro. Continue investigando.",
  }
};

function atualizarHUD() {
  document.getElementById("vidas").innerText = vidas;
  document.getElementById("pontos").innerText = pontos;
  document.getElementById("evidencias").innerText = evidencias;
}

function atualizarInventario() {
  const container = document.getElementById("inventario");
  container.innerHTML = "";
  inventario.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerText = item;
    container.appendChild(div);
  });
}

function mostrarCena() {
  const cena = cenas[cenaAtual];
  const texto = document.getElementById("texto");
  const opcoes = document.getElementById("opcoes");
  const botaoAvancar = document.getElementById("botaoAvancar");

  texto.innerText = cena.texto;
  opcoes.innerHTML = "";
  botaoAvancar.disabled = true;

  if (cena.verificar) {
    // Final de acusação
    botaoAvancar.style.display = "none";
    let sucesso = cena.verificar();
    texto.innerText = sucesso ? cena.sucessoTexto : cena.fracassoTexto;
    opcoes.innerHTML = `<button onclick="location.reload()">🔁 Recomeçar</button>`;
    return;
  } else {
    botaoAvancar.style.display = "inline-block";
  }

  cena.opcoes.forEach((opcao, i) => {
    const btn = document.createElement("button");
    btn.innerText = opcao.texto;
    btn.onclick = () => selecionarOpcao(i, btn);
    opcoes.appendChild(btn);
  });
}

function selecionarOpcao(indice, botao) {
  const cena = cenas[cenaAtual];
  const opcao = cena.opcoes[indice];

  // marca botão selecionado
  document.querySelectorAll("#opcoes button").forEach(b => b.classList.remove("selecionada"));
  botao.classList.add("selecionada");

  // ativa botão avançar e define próxima cena
  proximaEtapa = () => {
    if (opcao.penaliza) {
      vidas--;
      if (vidas <= 0) return fimDeJogo(false);
    } else if (opcao.item) {
      if (!inventario.includes(opcao.item)) {
        inventario.push(opcao.item);
        evidencias++;
        pontos += opcao.pontos || 1;
      }
      atualizarInventario();
    }

    cenaAtual = opcao.proxCena;
    mostrarCena();
    atualizarHUD();
  };

  document.getElementById("botaoAvancar").disabled = false;
}

function fimDeJogo(sucesso) {
  const texto = document.getElementById("texto");
  const opcoes = document.getElementById("opcoes");
  const botaoAvancar = document.getElementById("botaoAvancar");

  texto.innerText = sucesso ? "Você completou a investigação!" : "Você perdeu todas as vidas. O caso esfriou...";
  opcoes.innerHTML = '<button onclick="location.reload()">🔁 Recomeçar</button>';
  botaoAvancar.disabled = true;
}

let proximaEtapa = null;

document.getElementById("botaoAvancar").addEventListener("click", () => {
  if (typeof proximaEtapa === "function") {
    proximaEtapa();
    proximaEtapa = null;
  }
});

window.onload = () => {
  atualizarHUD();
  atualizarInventario();
  mostrarCena();
};
