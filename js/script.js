
const botaoCriptografa = document.querySelector("#botao-criptografar");
const botaoDescriptografa = document.querySelector("#botao-descriptografar");
const botaoCopiar = document.querySelector("#botao-copiar");
const vogais = ["a", "e", "i", "o", "u"];
const substitutos = ["ai", "enter", "imes", "ober", "ufat"];
const regex = [/ai/gi, /enter/gi, /imes/gi, /ober/gi, /ufat/gi];

function desabilitaTexto(){
    document.querySelector("#linha1").style.display = "none";
    document.querySelector("#linha2").style.display = "none";
}

function habilitaSaida(){
    document.querySelector("#output-text").style.display = "block";
}

function habilitaBotaoCopiar(){
    botaoCopiar.style.display = "inline-flex";
}

function chunkArray(arr, tamanho){
    var chunkLength = Math.max(arr.length/tamanho, 1);
    var chunks = [];

    for(let i = 0; i < tamanho; i++){
        if(chunkLength*(i+1)<=arr.length){
            chunks.push(
                arr.slice(chunkLength*i, chunkLength*(i+1))
            );
        }
    }

    return chunks; 
}

function criptografarTexto(){
    const textoOriginal = document.querySelector("#input-text").value;
    const arrayTruncado = chunkArray(textoOriginal, textoOriginal.length);
    var textoCriptografado = [];

    for(let i = 0; i < arrayTruncado.length; i++){
        switch(arrayTruncado[i]){
            case "a":
                textoCriptografado.push(substitutos[0]);
                break;

            case "e":
                textoCriptografado.push(substitutos[1]);
                break;
            
            case "i":
                textoCriptografado.push(substitutos[2]);
                break;
            
            case "o":
                textoCriptografado.push(substitutos[3]);
                break;
            
            case "u":
                textoCriptografado.push(substitutos[4]);
                break;
            
            default:
                textoCriptografado.push(arrayTruncado[i]);
                console.log("Uma consoante foi lida!");
        }
    }

    textoCriptografado = textoCriptografado.join(""); 
    document.querySelector("#output-text").value = textoCriptografado;
    botaoCopiar.firstChild.data = "Copiado!";

    desabilitaTexto();
    habilitaSaida();
    habilitaBotaoCopiar();
}

function descriptografarTexto(){
    var textoCriptografado = document.querySelector("#input-text").value;

    for(let i = 0; i < regex.length; i++){
        textoCriptografado = textoCriptografado.replace(regex[i], vogais[i]);
    }

    document.querySelector("#output-text").value = textoCriptografado;
    botaoCopiar.firstChild.data = "Copiar";

    desabilitaTexto();
    habilitaSaida();
    habilitaBotaoCopiar();
}

function copiarTexto(){
    var copiar = document.querySelector("#output-text");
    
    copiar.select();
    copiar.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copiar.value);
    botaoCopiar.firstChild.data = "Copiado!";
}

/*
botaoCriptografa.onclick = (criptografarTexto);
botaoDescriptografa.onclick = (descriptografarTexto);
*/
botaoCriptografa.addEventListener("click", criptografarTexto);
botaoDescriptografa.addEventListener("click", descriptografarTexto);
botaoCopiar.addEventListener("click", copiarTexto);
