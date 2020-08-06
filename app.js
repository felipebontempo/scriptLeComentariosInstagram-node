const puppeteer = require('puppeteer');

//Ler páginas do Insta

async function start(){

    //Função que busca um determinado seletor em uma página, e clica no botão MAIS, até acabar.
    async function loadMore(page, selector) {
        const moreButton = await page.$(selector) // o '$' indica que eu quero pegar a primeira ocorrencia.
        if(moreButton){ //Se ainda existir mais botões 'more' continue
            console.log("More");
            await moreButton.click() //Clica no botão
            await page.waitFor(selector, {timeout: 3000}).catch(() => {console.log("timeout")})
            await loadMore(page, selector)
        }
    }

    //Pegar os comentários
    async function getComments(page, selector){
        const comments = await page.$$eval(selector, links => links.map(link => link.innerText)) // o '$$' indica que eu quero pegar todas as ocorrencias, e usando o EVAL logo em seguida estou indicando que quero já tratar os dados retornados, no caso posso passar uma função para ser execurada, no caso estou usando um MAP para transformar o resultado recebido do selector.
        return comments
    }

    //A receita começa aqui
    const browser = await puppeteer.launch() //launch é uma promisse, como só quero continuar depois que esse método for executado vou usar um await
    const page = await browser.newPage() ; //page recebe uma instancia de um browser (navegador rs)
    await page.goto('https://www.instagram.com/p/CChMVvQgYKK/') //o 'goto' é 'vá para', tipo quando vc digita o endereço do site e aperta o ENTER.

    await loadMore(page, '.dCJp8') //Página carregada, eu vou clicando no botão 'MAIS' (.dCJp8) é uma classe de CSS dentro do HTML em questão.

    //Array de comentários (string)
    const comments = await getComments(page, '.C4VMK span a')//Usando a função criada 'getComments', passo a 'pagina' e no segundo parametro informo o tag que quero buscar, no caso estou buscando uma classe no HTMl chamada 'C4VMK' e dentro dela busco um elemento filho chamado SPAN e dentro desse filho um elemento 'a' (que é um LINK)
    console.log(comments); //Voa lá!
    
}

//Pegar os comentários / listaUserArrobas
//Array de TESTE
const fakeArrobas = [
    '@Cenoane',
    '@Poudedi',
    '@Vinaicu',
    '@Ziadiha',
    '@Usheybu',
    '@Woebuil',
    '@Beotozo',
    '@Bresebo',
    '@Raualna',
    '@Clocawe',
    '@Boculol',
    '@Seroyfo',
    '@Hoirunr',
    '@Celiufe',
    '@Bresebo',
    '@Osvealr',
    '@Luatoel',
    '@Gyekumi',
    '@Bareabi',
    '@Dualaol',
    '@Nupufiu',
    '@Bresebo',
    '@Cefluzu',
    '@Luzifie',
    '@Ziadiha',
    '@Cakuatu',
    '@Guodiel',
    '@Blenigo',
    '@Kocliwo',
    '@Pozeuwu',
    '@Ziadiha',
    '@Bresebo',
    '@Olisveo',
    '@Ziadiha',
    '@Higuodi'
]

//console.log(fakeArrobas.length);

// Contar listaUserArrobas repetidas

function conte(arrobas) {
    const conte = {}//isso é um obj, vazio!

    arrobas.forEach(arroba => {conte[arroba] = (conte[arroba]||0) + 1}) //Para cada 'arroba' o objeto vazio (conte) vai receber o conteudo desse arroba que estou interando e o valor da pripriedade vai ser um número, se existir vai receber o conteudo do arroba, por padrão o arroba se não existir recebe ZERO como valor, e na seguencia recebe mais 1 somada, fiz isso para que o JS não entenda o valor do objeto sem ZERO como nulo.
    //EX: o primeiro item do 'arrobas' vai ficar assim -> '@Cenoane': 1, e assim por diante.
    return conte
}

//console.log(conte(fakeArrobas));

// Ordenando a lista de 'arrobas'

function sort(contado) {
    const entries = [] //entradas

    for(prop in contado){ //Esse 'for' pode ser substituido por uma linha -> const entries = Object.entries(contado), o retorno é o mesmo, fica a dica.
        entries.push([prop, contado[prop]]) //Aqui estou dando um push na propriedade do objeto e seu valor, Propriedade -> '@Cenoane': Valor -> 1, observe que estou fazendo push do objeto todo, tudo que está dentro do colchetes.
    }
    const ordenado = entries.sort((a, b) => b[1] - a[1]) //OBS: Quando as chaves estão inseridas no codigo -> (a, b) => {b[1] - a[1]} quer dizer que vc não está retornando um valor, isso é proprio das funções de setas, vc também pode deixar as chaves -> {} e adicionar um 'return' que o resultado é retornado.
    //Agora observe o seguinte, 'entries' é um array que nele contem arrays menores ...no qual cada um deles contem dois itens, como eu quero ordenar o array principal com base em um dos itens do array menores eu faço dessa forma b[1] - a[1], eu estou pegando o segundo valor de cada mini-array que está dentro do grande array, se cada mini-array tivesse três elemento e quisesse ordenar pelo terceiro elemento eu deixaria o valor 2.
    console.log(ordenado);
}

//sort(conte(fakeArrobas))

start()