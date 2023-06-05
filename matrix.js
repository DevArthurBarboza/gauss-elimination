function gerarMatriz(){
    let ordemMatrix = document.getElementById('order').value

    let inputs = new Array(parseInt(ordemMatrix));
    let elementosIndependente = new Array(parseInt(ordemMatrix))

    for(let j = 0;j <= ordemMatrix; j++){
        inputs[j] = new Array(ordemMatrix);
        for(let i = 0;i <= ordemMatrix; i++){
            let input = document.createElement('input')
            input.setAttribute('class','elemento-da-matriz')
            input.setAttribute('type','number')
            input.setAttribute('name', 'a' + j + '-' + i)
            input.setAttribute('placeholder', 'a' + j + '-' + i)
            input.setAttribute('data-linha',j)
            input.setAttribute('data-coluna',i)
            input.setAttribute('data-elemento-independente',false)
            inputs[j][i] = input;
        }
        let elementoIndependente = document.createElement('input')
        elementoIndependente.setAttribute('class','elemento-independente elemento-da-matriz')
        elementoIndependente.setAttribute('type','number')
        elementoIndependente.setAttribute('name', 'b' + j)
        elementoIndependente.setAttribute('placeholder', 'b' + j)
        elementoIndependente.setAttribute('data-linha',j)
        elementoIndependente.setAttribute('data-elemento-independente',true)
        elementosIndependente[j] = elementoIndependente
    }

    let matrizContainer = document.getElementById('matriz-container')
    for(let j = 1; j <= ordemMatrix; j++){
        for(let i = 1; i <= ordemMatrix; i++){
            matrizContainer.appendChild(inputs[j][i])
        }
        matrizContainer.appendChild(elementosIndependente[j])
        matrizContainer.appendChild(document.createElement('br'))
    }
    document.getElementById('calcularMatriz').setAttribute('style','display:block')

}


function printarResultado(container, matriz, independentes){

    const ordemMatrix = document.getElementById('order').value;
    let matrizPrepared = prepareArray(matriz);
    for(let i = 0;i < ordemMatrix;i++){
        let tabelaLinha = container.insertRow(-1)
        // let tabelaLinha = document.createElement('tr');
        for(let j = 0;j < ordemMatrix;j++){
            // let elementoTabela = document.createElement('td') 
            // elementoTabela.appendChild(document.createTextNode(matrizPrepared[i][j]));
            // tabelaLinha.appendChild(elementoTabela)
            let cell = tabelaLinha.insertCell(j)
            cell.textContent = matrizPrepared[i][j]
        }
        // let elementoTabelaIndependente = document.createElement('td')
        // elementoTabelaIndependente.appendChild(document.createTextNode(independentes[i]))
        // tabelaLinha.appendChild(elementoTabelaIndependente)
        // container.appendChild(tabelaLinha);
        // container.appendChild(document.createElement('br'));
    }

}

function prepareArray(matriz){
    const ordemMatrix = document.getElementById('order').value
    matrizRetorno = new Array(parseInt(ordemMatrix));
    for(let i = 0; i < ordemMatrix; i++){
        matrizRetorno[i] = new Array(parseInt(ordemMatrix)); 
        for(let j = 0; j < ordemMatrix; j++){
            matrizRetorno[i][j] = getSpecificElement(matriz,i + 1,j + 1);
        }
    }

    for(let i = ordemMatrix;i == ordemMatrix; i++)
    {
        for(let j = 0; j < ordemMatrix; j++){
            matrizRetorno[i][j] = getSpecificElement(matriz,i + 1,j + 1);
        }
    }
    return matrizRetorno;
}

function getSpecificElement(matriz,linha,coluna){
    for(let i =0; i < matriz.length;i++){
        if(matriz[i].dataset.linha == linha && matriz[i].dataset.coluna == coluna){
            return matriz[i].value;
        }
    }
}


function calcularMatriz(){
    let elementosDaMatriz = document.getElementsByClassName('elemento-da-matriz')
    let elementosIndependentes = document.getElementsByClassName('elemento-independente')

    const ordemMatrix = document.getElementById('order').value

    let matrizPreparada = prepareArray(elementosDaMatriz)

    for(let k = 1; k <= ordemMatrix; k++){
        for(let i = k+1; i < ordemMatrix; i++){
            let multiplicador = matrizPreparada[i][k] / matrizPreparada[k][k]

            for(let j = k;j < ordemMatrix; j++){
                matrizPreparada[i][j] -= multiplicador * matrizPreparada[k][j] 
            }
            elementosIndependentes[i] -= multiplicador * elementosIndependentes[k]
        }
    }
    
    let resultadoContainer = document.getElementById('resultado');

    printarResultado(resultadoContainer,elementosDaMatriz,elementosIndependentes)

}


function limparMatriz(){
    document.getElementById('matriz-container').innerHTML = '';
}

function limparResultado(){
    document.getElementById('resultado').innerHTML = '';
}