import React from 'react';
import {useState, useEffect } from 'react';
import './Game.css';

export default function  Game(){

    const squaresOfTable = Array(9).fill("");
     /*.fill("") preenche os valores com 9 elemntos sendo eles vazios */

    const [player, setPlayer] = useState("X")
    const [table, setTable] = useState(squaresOfTable);
    const [vencedor, setVencedor] = useState();
    
    const clicando = (index) => {

        if (vencedor){
            alert("O jogo acabou. Clique em jogar novamente!")
            return null;
        }



        if (table[index] !== ""){
            return null;
        }
        /*não permite repetir o elemento*/

        setTable(table.map(
            (item, itemIndex) => itemIndex === index ? player : item));

        setPlayer(player === "X" ? "O" : "X")
    }

    /*funcao vai esperar um novo array que vai ser o array que vou substituir dando um .map e usando ternario*/

    const verificaGanhador= () => {

        const possibilidade = [
            [table[0], table[1], table[2]],
            [table[3], table[4], table[5]],
            [table[6], table[7], table[8]],

            [table[0], table[3], table[6]],
            [table[1], table[4], table[7]], 
            [table[2], table[5], table[8]],

            [table[0], table[4], table[8]],
            [table[2], table[4], table[6]],
        ];

        possibilidade.forEach(squares => {

            const empate = () => {
                if (table.every(item => item !== "")){setVencedor("Ninguem Venceu!")}
            }

            if(squares.every(square => square === "O")) setVencedor("O venceu!");
            else if(squares.every(square => square === "X")) setVencedor("X venceu!");
            else empate();

        });
    }


    const resetarJogo = () => {
        setPlayer("X");
        setTable(squaresOfTable);
        setVencedor(null);
    }   

    /* matriz com as 8 possibilidades de 3 itens. Usando o .every é uma forma de comparar os arrays. */

    useEffect(verificaGanhador, [table]);

    return(
        <div className="content">
            <h1>Jogo da velha</h1>
            <div className={`table ${vencedor ? "fim-de-jogo" : ""}`}>

                {table.map((item, index) => (

                    <div  key={index} className={`square ${item}`} onClick={() => clicando(index)}>
                    
                        {item}

                    </div>
                ))}

            </div>

            {vencedor &&
                <div>
                    <h2 className="footer">
                      <p className="text-winner"> {vencedor} </p> 
                    </h2>
                        <button className="bttn-play-again" onClick={resetarJogo}>
                                Jogar Novamente
                        </button>
                </div>
            }
        </div>
    );
}