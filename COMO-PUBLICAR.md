# Como publicar o site

Este site é **estático**: HTML, CSS, JavaScript, imagens e um service worker para o PWA. Ele não precisa de PHP, banco de dados, WordPress ou HTMLy.

## 1. Entenda o HTMLy

O [HTMLy](https://www.htmly.com/) é um CMS de blog em PHP que precisa de uma hospedagem para rodar. Ele **não é uma hospedagem** e não é o lugar onde você “sobe” este site.

Como o site tem um `index.html` próprio, um `sw.js` e arquivos de PWA, o caminho mais simples é publicá-lo diretamente em:

- uma hospedagem estática (Cloudflare Pages, Netlify, Vercel); ou
- a pasta pública de uma hospedagem comum (`public_html`, `www` ou `htdocs`).

Se você mantiver o HTMLy no mesmo domínio, os dois podem disputar o `index` e as regras de URL. O mais seguro é **não usar HTMLy para este site**.

---

## 2. Caminho recomendado: Cloudflare Pages

Você não precisa saber programar nem usar terminal.

1. Baixe o arquivo `site-juliana-losnake-entrega.zip`.
2. Extraia o ZIP no computador. Você verá `index.html`, `assets/`, `sw.js`, etc.
3. Crie uma conta gratuita em [cloudflare.com](https://dash.cloudflare.com/).
4. No painel, vá em **Workers & Pages**.
5. Clique em **Create application → Pages → Upload assets**.
6. Dê um nome ao projeto, por exemplo `juliana-losnake`.
7. Arraste **a pasta extraída** (não o ZIP) para a área de upload.
8. Clique em **Deploy**.
9. A Cloudflare vai gerar um endereço parecido com `juliana-losnake.pages.dev`.
10. Abra esse endereço no celular e teste o menu e o botão “Instalar aplicativo”.

### Colocar o domínio próprio

1. No projeto da Cloudflare Pages, abra **Custom domains**.
2. Clique em **Set up a custom domain**.
3. Digite `julianalosnake.adv.br` ou `julianalosnake.com.br`.
4. Siga as instruções de DNS.
5. Aguarde a emissão do HTTPS. A Cloudflare faz isso automaticamente.

### HTTPS é obrigatório para o PWA

O site só pode ser instalado no celular se estiver em **HTTPS**. Cloudflare Pages, Netlify e Vercel já entregam HTTPS automaticamente.

---

## 3. Se você já tem hospedagem com cPanel, Hostinger ou similar

1. Entre no painel da hospedagem.
2. Abra o **Gerenciador de Arquivos**.
3. Entre na pasta pública do domínio:
   - `public_html` (mais comum);
   - `www`;
   - `htdocs`.
4. **Antes de substituir**, faça backup do que já existe.
5. Envie o ZIP para essa pasta.
6. Clique com o botão direito no ZIP e escolha **Extrair**.
7. Confirme que os arquivos ficaram assim:

```text
public_html/
  index.html
  politica-de-privacidade.html
  sw.js
  site.webmanifest
  README.md
  assets/
  previews/
```

O `index.html` precisa estar **na raiz** de `public_html`, não dentro de uma subpasta como `public_html/site-juliana-losnake/`.

8. Se o ZIP criou uma subpasta, entre nela, selecione todos os arquivos e mova para `public_html`.
9. Apague o ZIP depois da extração.
10. Ative o **SSL/HTTPS** no painel da hospedagem. Em cPanel, procure **SSL/TLS Status** ou **AutoSSL**. Na Hostinger, procure **SSL**.
11. Force o HTTPS.
12. Abra o domínio no navegador e teste.

### Se aparecer a página do HTMLy

Isso significa que o `index.php` do HTMLy está sendo carregado antes do site.

- Se você **não usa mais** o HTMLy: faça backup e remova/renomeie o `index.php` e os arquivos do HTMLy da pasta pública.
- Se você **quer manter** o HTMLy: publique o site em uma subpasta, como `public_html/site/`, e acesse `seudominio.com/site/`. O PWA funcionará nesse endereço.
- Também pode ser necessário ajustar o `.htaccess` do HTMLy, porque ele pode redirecionar todas as URLs para o `index.php`. Nesse caso, o mais limpo é separar o HTMLy em outro subdomínio ou pasta.

---

## 4. Se você quis dizer “subir apenas o HTML”

O procedimento é o mesmo da seção 3:

- envie a pasta do site;
- extraia;
- deixe `index.html` na pasta pública;
- ative HTTPS;
- acesse o domínio.

Não é necessário instalar HTMLy, WordPress ou qualquer CMS.

---

## 5. Depois de publicar: checklist

- [ ] O site abre em `https://`.
- [ ] O `index.html` está na raiz do domínio.
- [ ] O CSS e as imagens carregam normalmente.
- [ ] O menu mobile abre e fecha.
- [ ] O botão “Agendar conversa” aparece após a primeira dobra.
- [ ] No celular, o menu mostra **Instalar aplicativo** (Android) ou **Adicionar à tela inicial** (iPhone).
- [ ] O formulário está configurado em `assets/contact-config.js`.
- [ ] A Política de Privacidade abre.
- [ ] O site continua acessível após desligar o Wi-Fi (modo offline do PWA).

## 6. Configurar o contato

Antes de divulgar, preencha `assets/contact-config.js`:

```js
window.SITE_CONTACT = {
  whatsapp: "5511999999999",
  email: "contato@seudominio.com.br"
};
```

Se você alterar arquivos do site depois de instalado no celular, aumente também a versão do cache no início de `sw.js`:

```js
const CACHE_VERSION = 'jl-site-2026-10-19-4';
```

Assim os celulares que já instalaram o site baixam a versão nova.

## 7. Problemas comuns

### O site abre sem estilo
Provavelmente a pasta `assets` não foi enviada ou ficou em outro nível. O `index.html` e a pasta `assets` precisam estar no mesmo diretório.

### A página do HTMLy aparece
O servidor está carregando o `index.php` antes do `index.html`. Remova/renomeie o HTMLy ou publique o site em uma subpasta.

### O botão “Instalar aplicativo” não aparece
O PWA exige **HTTPS**. Verifique se o cadeado aparece na barra do navegador. No iPhone, a instalação é feita pelo menu **Compartilhar → Adicionar à Tela de Início**.

### O site muda, mas o celular mostra a versão antiga
Aumente `CACHE_VERSION` em `sw.js`, publique de novo e recarregue o site no celular.

### O formulário não envia
Ele depende do canal configurado em `assets/contact-config.js`. Sem WhatsApp ou e-mail preenchidos, o site apenas informa que o canal está em configuração.

---

## Resumo

Para este projeto, o mais simples é **Cloudflare Pages** ou **Netlify**. Se você já paga uma hospedagem, use o Gerenciador de Arquivos e envie o conteúdo para `public_html`.

O HTMLy não é necessário. Se ele já estiver instalado, o ideal é mantê-lo separado — ou removê-lo, com backup — para não conflitar com o `index.html` do site.
