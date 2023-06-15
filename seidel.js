
const matrizSeidel = {

    gerarMatriz : function(){
        let ordemMatrix = document.getElementById('order').value
        
        this.ordemMatrix = ordemMatrix
    
        let inputs = new Array(parseInt(ordemMatrix));
        let elementosIndependente = new Array(parseInt(ordemMatrix))
        let chutesInicial = new Array(parseInt(ordemMatrix))
    
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

            let chuteInput = document.createElement('input')
            chuteInput.setAttribute('class','chute')
            chuteInput.setAttribute('type','number')
            chuteInput.setAttribute('name', 'x' + j)
            chuteInput.setAttribute('placeholder', 'x' + j)
            chuteInput.setAttribute('data-linha',j)



            let elementoIndependente = document.createElement('input')
            elementoIndependente.setAttribute('class','elemento-independente')
            elementoIndependente.setAttribute('type','number')
            elementoIndependente.setAttribute('name', 'b' + j)
            elementoIndependente.setAttribute('placeholder', 'b' + j)
            elementoIndependente.setAttribute('data-linha',j)
            elementoIndependente.setAttribute('data-elemento-independente',true)
            elementosIndependente[j] = elementoIndependente

            let chuteInicial = document.createElement('input')
            chuteInicial.setAttribute('class','chute-inicial')
            chuteInicial.setAttribute('type','number')
            chuteInicial.setAttribute('name','x' + j)
            chuteInicial.setAttribute('placeholder','Chute Inicial : x' + j)

            chutesInicial[j] = chuteInicial
        }
    
        let chuteContainer = document.getElementById('chute-container');
        let matrizContainer = document.getElementById('matriz-container')
        for(let j = 0; j < ordemMatrix; j++){
            for(let i = 0; i < ordemMatrix; i++){
                matrizContainer.appendChild(inputs[j][i])
            }
            matrizContainer.appendChild(elementosIndependente[j])
            matrizContainer.appendChild(document.createElement('br'))

            chuteContainer.appendChild(chutesInicial[j])
            chuteContainer.appendChild(document.createElement('br'))
        }
        document.getElementById('calcularMatriz').setAttribute('style','display:block')
    
    },
    
    
    printarResultado : function(container, matriz){
    
        const ordemMatrix = document.getElementById('order').value;
    
        let table = document.createElement('table')
        let tabelaHeader = table.insertRow()

        for(let i = 1;i< matriz.length;i++){
            let header = tabelaHeader.insertCell(i - 1)
            header.textContent = "x" + i
        }

        for(let i = 0;i < matriz.length;i++){
            let tabelaLinha = table.insertRow()
            let elementoMatriz = tabelaLinha.insertCell()
            elementoMatriz.textContent = "K=" + i
    
            for(let j = 0;j < ordemMatrix;j++){
                let elementoMatriz = tabelaLinha.insertCell(j)
                elementoMatriz.textContent = matriz[i][j]
            }

    
        }
    
        container.appendChild(table)
    
    },
    
    prepararMatriz : function(matriz){
        const ordemMatrix = document.getElementById('order').value
        let matrizRetorno = new Array(parseInt(ordemMatrix));
        for(let i = 0; i < ordemMatrix; i++){
            matrizRetorno[i] = new Array(parseInt(ordemMatrix)); 
            for(let j = 0; j < ordemMatrix; j++){
                matrizRetorno[i][j] = this.getSpecificElement(matriz,i,j);
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
        let chutesIniciais = this.prepararVetor(document.getElementsByClassName('chute-inicial'));
        let resultadoContainer = document.getElementById('resultado');
    
    
        const ordemMatrix = document.getElementById('order').value
    
        let matrizPreparada = this.prepararMatriz(elementosDaMatriz)
        let vetorPreparado = this.prepararVetor(elementosIndependentes)
    
        let novoChute = new Array(parseFloat(ordemMatrix))
        novoChute[0] = new Array(parseFloat(ordemMatrix))
        novoChute[0][0] = chutesIniciais[0]
        novoChute[0][1] = chutesIniciais[1]
        novoChute[0][2] = chutesIniciais[2]

        let continueCalculando = true
    
        for(let k = 1; k < 15 && continueCalculando; k++){
            novoChute[k] = new Array(parseFloat(ordemMatrix))
            for(let i = 0; i < ordemMatrix; i++){            
                novoChute[k][i] = 0
                for(let j = 0;j < ordemMatrix; j++){
                    if(j != (i)){

                        if(novoChute[k][j] !== undefined){
                            novoChute[k][i] -= (parseFloat(novoChute[k][j]) * parseFloat(matrizPreparada[i][j])) 
                        }else{
                            novoChute[k][i] -= (parseFloat(novoChute[k-1][j]) * parseFloat(matrizPreparada[i][j])) 
                        }
                    }
                }
                novoChute[k][i] += parseFloat(vetorPreparado[i])
                novoChute[k][i] = (novoChute[k][i] / matrizPreparada[i][i])
                
            }
            if(k > 1){
                continueCalculando = this.continuarExecucao(novoChute,k,k-1)
            }
        }
        
        this.printarResultado(resultadoContainer,novoChute)

        this.vetorResultado = vetorPreparado
        this.matrizPreparada = matrizPreparada
    
        // this.printarVariaveis()
    
    },

    continuarExecucao : function(vetor, primeiraPosicao, segundaPosicao){
        let episilon = document.getElementById('error').value
        let isValid = false;
        for(let i = 0; i < 2;i++){
            if((vetor[primeiraPosicao][i] - vetor[segundaPosicao][i]) >= episilon ){
                isValid = true
            }
        }
        return isValid
    },
        
    
    limparMatriz : function(){
        document.getElementById('matriz-container').innerHTML = '';
        document.getElementById('chute-container').innerHTML = '';
    },
    
    limparResultado : function(){
        document.getElementById('resultado').innerHTML = '';
    }
    
    }