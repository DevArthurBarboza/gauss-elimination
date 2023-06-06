
const matrizGauss = {

gerarMatriz : function(){
    let ordemMatrix = document.getElementById('order').value
    this.ordemMatrix = ordemMatrix

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
        elementoIndependente.setAttribute('class','elemento-independente')
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

},


printarResultado : function(container, matriz, independentes, step){

    const ordemMatrix = document.getElementById('order').value;
    let h2 = document.createElement('h2');
    h2.textContent = step
    container.appendChild(h2)

    let table = document.createElement('table')
    for(let i = 0;i < ordemMatrix;i++){
        let tabelaLinha = table.insertRow()

        for(let j = 0;j < ordemMatrix;j++){
            let elementoMatriz = tabelaLinha.insertCell(j)
            elementoMatriz.textContent = matriz[i][j]
        }

        let elementoIndependenteCell = tabelaLinha.insertCell()
        elementoIndependenteCell.textContent = independentes[i]
    }

    container.appendChild(table)

},

prepararMatriz : function(matriz){
    const ordemMatrix = document.getElementById('order').value
    let matrizRetorno = new Array(parseInt(ordemMatrix));
    for(let i = 0; i < ordemMatrix; i++){
        matrizRetorno[i] = new Array(parseInt(ordemMatrix)); 
        for(let j = 0; j < ordemMatrix; j++){
            matrizRetorno[i][j] = this.getSpecificElement(matriz,i + 1,j + 1);
        }
    }

    return matrizRetorno;
},

prepararVetor : function(vetor){
    const ordemMatrix = document.getElementById('order').value
    let vetorRetorno = new Array(parseInt(ordemMatrix));
    for(let i = 0; i < ordemMatrix; i++){
        vetorRetorno[i] = vetor[i].value
    }


    return vetorRetorno;
},

getSpecificElement : function(matriz,linha,coluna){
    for(let i =0; i < matriz.length;i++){
        if(matriz[i].dataset.linha == linha && matriz[i].dataset.coluna == coluna){
            return matriz[i].value;
        }
    }
},


calcularMatriz : function(){
    let elementosDaMatriz = document.getElementsByClassName('elemento-da-matriz')
    let elementosIndependentes = document.getElementsByClassName('elemento-independente')
    let resultadoContainer = document.getElementById('resultado');


    const ordemMatrix = document.getElementById('order').value

    let matrizPreparada = this.prepararMatriz(elementosDaMatriz)
    let vetorPreparado = this.prepararVetor(elementosIndependentes)

    let step = 1

    for(let k = 0; k < ordemMatrix; k++){
        for(let i = k+1; i < ordemMatrix; i++){
            let multiplicador = matrizPreparada[i][k] / matrizPreparada[k][k]

            for(let j = k;j < ordemMatrix; j++){
                matrizPreparada[i][j] -= (multiplicador * matrizPreparada[k][j]) 
            }
            vetorPreparado[i] -= (multiplicador * vetorPreparado[k])
            this.printarResultado(resultadoContainer,matrizPreparada,vetorPreparado, step++)
        }
    }

    this.vetorResultado = vetorPreparado
    this.matrizPreparada = matrizPreparada

    this.printarVariaveis()

},


printarVariaveis : function(){
    let matriz = this.matrizPreparada
    let vetor = this.vetorResultado
    let ordem = this.ordemMatrix
    let variaveis = new Array(parseInt(ordem))

    for(let i = ordem - 1;i >= 0;i--){
        let row = 0;
        for(let j = ordem - 1;j >=0;j--){
            if(matriz[i][j] == 0){
                continue
            }
            if(variaveis[j] != undefined){                
                row += matriz[i][j] * variaveis[j] 
            }else{
                row -= vetor[i]
                row =  row / matriz[i][j]
            }
        }
        variaveis[i] = row / vetor[i]
    }

    let resultadoDiv = document.getElementById('resultado');

    for(let i = 0; i < variaveis.length;i++){
        let div = document.createElement('div')
        div.textContent = "x" + (i + 1) + " : " + variaveis[i]
        resultadoDiv.appendChild(div)
    }


},


limparMatriz : function(){
    document.getElementById('matriz-container').innerHTML = '';
},

limparResultado : function(){
    document.getElementById('resultado').innerHTML = '';
}

}