# Site — Juliana Losnake | Advocacia

Site institucional de página única para a advogada Juliana Losnake (OAB/SP 512.812), com foco em Direito de Família, BPC/LOAS e proteção dos direitos sociais.

> Guia de publicação passo a passo: [COMO-PUBLICAR.md](COMO-PUBLICAR.md).

## Como visualizar

Abra o arquivo `index.html` no navegador para a versão web. Para testar o formulário, o service worker e a instalação como aplicativo, use um servidor local:

```powershell
python -m http.server 8765
```

Depois acesse `http://127.0.0.1:8765/`.

> O PWA precisa de **HTTPS** ou **localhost/127.0.0.1** para funcionar. Abrir o arquivo diretamente como `file://` mostra o site, mas não ativa a instalação nem o modo offline.

## Estrutura

```text
index.html                  Página principal
politica-de-privacidade.html
sw.js                       Service worker: cache e funcionamento offline
site.webmanifest            Configuração do aplicativo instalável
COMO-PUBLICAR.md            Guia de hospedagem e upload
assets/
  styles.css                Identidade visual e responsividade
  site.js                   Navegação, acordeões, PWA e formulário
  contact-config.js         Configuração do canal de atendimento
  logo-wordmark-*.png       Assinatura visual da marca
  hero-*.jpg / .webp        Retrato principal
  about-*.jpg / .webp       Retrato da seção Sobre
  bpc-*.jpg / .webp         Retrato da seção BPC/LOAS
  manifesto-*.jpg / .webp   Imagem de fundo da faixa editorial
  icon-192.png              Ícone do app
  icon-512.png              Ícone do app
  icon-maskable-512.png     Ícone adaptável do Android
  apple-touch-icon.png      Ícone para iPhone/iPad
  og-image.jpg              Imagem de compartilhamento
  favicon.png
previews/                   Capturas para conferência visual
```

As fotos recebidas foram otimizadas em JPEG e WebP, com versões responsivas. Os arquivos originais não são necessários para o funcionamento do site.

## Experiência mobile e PWA

- Layout mobile-first, com navegação em tela cheia, tipografia adaptada e áreas de toque de pelo menos 44–48 px.
- Formulário com campos de 16 px no celular, evitando o zoom automático do iOS.
- Barra fixa de “Agendar conversa” exibida após a primeira dobra e ocultada ao chegar ao contato.
- Suporte a `safe-area-inset` para aparelhos com notch/home indicator.
- Aplicativo instalável na tela inicial, com atalhos para **Atuação**, **BPC/LOAS** e **Contato**.
- Funcionamento offline dos arquivos principais e das imagens após a primeira visita.
- Botão “Instalar aplicativo” no menu mobile quando o navegador oferece a instalação. No iPhone, o menu mostra as instruções de “Adicionar à Tela de Início”.

### Instalar no celular

- **Android/Chrome:** abra o menu do site e toque em **Instalar aplicativo**, ou use “Adicionar à tela inicial” no menu do navegador.
- **iPhone/iPad/Safari:** toque em **Compartilhar** e depois em **Adicionar à Tela de Início**.
- **Computador:** o Chrome/Edge pode oferecer a instalação pela barra de endereço.

### Atualizações do cache

Sempre que alterar CSS, JS, imagens ou páginas, aumente `CACHE_VERSION` no início de `sw.js`. Isso força a atualização do cache nos aparelhos que já instalaram o site.

## Configurar o canal de atendimento

Abra `assets/contact-config.js` e preencha:

```js
window.SITE_CONTACT = {
  whatsapp: "5511999999999", // DDI + DDD + número, apenas dígitos
  email: "contato@exemplo.com.br"
};
```

- Com `whatsapp` preenchido, o formulário abre uma conversa com a mensagem já organizada e um botão flutuante de WhatsApp é exibido.
- Com apenas `email` preenchido, o formulário abre o aplicativo de e-mail do visitante.
- Se os dois estiverem preenchidos, o WhatsApp tem prioridade.
- Se nenhum estiver preenchido, o site não simula envio: informa que o canal está em configuração e tenta copiar a mensagem para a área de transferência.

> **Importante:** antes de publicar, preencha esse arquivo. O formulário atual é estático e não armazena mensagens em banco de dados.

## Antes de publicar

1. Preencher `assets/contact-config.js` com WhatsApp e/ou e-mail oficiais.
2. Substituir a URL de compartilhamento e a imagem OG por URLs absolutas do domínio final, se desejar.
3. Revisar o texto institucional e os dados da OAB com a advogada.
4. Validar a Política de Privacidade com o encarregado/controlador de dados.
5. Publicar em qualquer hospedagem estática (Cloudflare Pages, Netlify, Vercel, GitHub Pages, Hostinger etc.).

## Decisões de conteúdo

- Não foram inventados telefone, e-mail, endereço, horários, depoimentos ou números de resultado.
- Não há promessa de resultado, ranking, prêmio ou prova social fictícia.
- A comunicação segue um tom informativo e sóbrio, compatível com o Código de Ética e Disciplina da OAB e com o Provimento nº 205/2021.
- As informações sobre BPC/LOAS são gerais e indicam expressamente que cada caso exige análise individual.
- A página de privacidade descreve o funcionamento real do site: formulário estático, sem banco de dados próprio, fontes externas do Google Fonts e cache local do PWA.

## Acessibilidade e desempenho

- Navegação por teclado, link de salto, foco visível e menu mobile com controle de foco.
- Acordeões com `aria-expanded`, `aria-controls` e `inert`.
- Imagens com texto alternativo e dimensões declaradas.
- Respeito a `prefers-reduced-motion`.
- Imagens em WebP com fallback JPEG e carregamento responsivo.
- Service worker com estratégia de cache para navegação, imagens e fontes.
- Barra mobile e menu com estados `aria-hidden`/`inert` sincronizados.
