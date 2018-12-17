import React, {Component} from 'react';

class komponent extends Component{
    constructor(){
        super();
        this.state = {
            G: undefined,
            S: undefined,
            result: ''
        }
    }

    data = [
        ['nizky', 'blond', 'hnede', '-'],
        ['vysoky', 'tmave', 'hnede', '-'],
        ['vysoky', 'blond', 'modre', '+'],
        ['vysoky', 'tmave', 'modre', '-'],
        ['nizky', 'tmave', 'modre', '-'],
        ['vysoky', 'cervene', 'modre', '+'],
        ['vysoky', 'blond', 'hnede', '-'],
        ['nizky', 'blond', 'modre', '+']
    ]

    containsOR = (g) => {
        for(let i=0; i< g.length; i++){
            if(g[i].includes('||')){
                return [true, i];
            }
        }
        return false;
    }
    negative = (word) => {
        let retutnedWord = '';
        switch(word){
            case 'vysoky':
                retutnedWord = 'nizky';
                break;
            case 'nizky':
                retutnedWord = 'vysoky';
                break;
            case 'blond':
                retutnedWord = 'tmave||cervene';
                break;
            case 'tmave':
                retutnedWord = 'blond||cervene';
                break;
            case 'cervene':
                retutnedWord = 'blond||tmave';
                break;
            case 'hnede':
                retutnedWord = 'modre';
                break;
            case 'modre':
                retutnedWord = 'hnede';
                break;
            default:
                break;
        }
        return retutnedWord;
    }
    cover = (val, hyp) => {
        let count = 0;
        //console.log('val',val)
        //console.log('hyp', hyp)
        for(let i=0; i< 3; i++){
            if(val[i] === '?' || val[i].includes(hyp[i]) || val[i]===hyp[i]){
                count = count+1;
            }
        }
        if(count === 3){
            return true
        }
        else{
            return false
        }
    }
    reduceG = (G) =>{
        //console.log('pokryva????', this.cover(["vysoky", "?", "modre"], ["vysoky", "blond||cervene", "?"]))//ZISTIT PRECO POKTYVA
        //console.log('G in reduceG',G)
        let pom = []
        let field = G.slice();
        //console.log('field in reduceG', field)
        for(let i=0; i<G.length; i++){
            for(let j=0; j<G.length; j++){
                //console.log('sssssssssssssssssssssssssssssssss',field[i], field[j])
                if(i!==j){
                    if(this.cover(field[i], field[j])){
                        pom.push(field[j])
                    }
                }
                else{

                }
                //console.log('POMMMM', pom)
            }
            //console.log('field',field)
        }
        return pom
    }
    reduceS = (S) => {
        if(S[0].includes('nizky') && S[0].includes('vysoky')){
            S[0] = '?'
        }
        if(S[1].includes('blond') && S[1].includes('tmave') && S[1].includes('cervene')){
            S[1] = '?'
        }
        if(S[2].includes('modre') && S[2].includes('hnede')){
            S[2] = '?'
        }
        return S;
    }
    result = (G, S) => {
        let count = 0;
        if(G !== undefined){
            for(let i=0; i<G.length; i++){
                if(G[i]===S[i]){
                    count = count + 1
                }
            }
            if(count === 3){
                return 'accept'
            }
            else{
                return 'nonaccepted'
            }
        }
    }


    algorithm = () => {

        var G = [['?','?','?'],];
        var S = [undefined, undefined, undefined];
        var my_G = [];
        var my_S = [];


        for(let i=0; i < 8 ; i++){
            my_G = []
            if(this.data[i][3] === '-'){
                console.log(`**********ITERACIA ${i+1} ZAPORNA TRIEDA**************`)
                for(let g of G){
                    //console.log(g)
                    if(!this.cover(g, this.data[i])){
                        //console.log('NEPOKRYVA')
                        var newField = g.slice();
                        my_G.push(newField)
                    }
                    else{
                        //console.log('****POKRYVA****')
                        for(let j=0; j<g.length; j++){
                            //console.log('**g[j]**',g[j])
                            const alebo = this.containsOR(g)
                            var newField = g.slice();
                            if(alebo[0]){
                                let word = newField[alebo[1]].split('||');
                                //console.log('tu je trueaaaaaaaaaaaa', newField)
                                if(word[0] === this.data[i][alebo[1]]){
                                    newField[alebo[1]] = word[1]
                                    my_G.push(newField)
                                    break
                                }
                                else{
                                    newField[alebo[1]] = word[0]
                                    my_G.push(newField)
                                    break
                                }
                                
                            }
                            else{
                                if(g[j] === this.data[i][j]){
                                    continue;
                                }
                                else if(g[j] === '?'){
                                    newField[j] = this.negative(this.data[i][j])
                                    my_G.push(newField)
                                }
                            }
                            
                        }
                    }
                }
                //console.log('myG',my_G)
                console.log('S', S)
                console.log('G', G)
                //this.state
            }
            else{
                console.log(`**********ITERACIA ${i+1} KLADNA TRIEDA**************`)
                my_S = []
                for(let s in S){
                   if(S[s] === undefined){
                       S[s] = this.data[i][s]
                   }
                   else if(S[s] === '?'){
                       continue
                   }
                   else{
                       if(!S[s].includes(this.data[i][s])){
                            S[s] = `${S[s]}||${this.data[i][s]}`
                       }
                   }
                }
                for(let g of G){
                    if(this.cover(g, this.data[i])){
                        my_G.push(g)
                    }
                    //console.log('g',g)
                }
            }
            
            G = my_G.slice()
            console.log('G', my_G)
            console.log('S', S)
        }
        let deleteG = this.reduceG(G)
        for(let i=0; i<deleteG.length; i++){
            let a = G.indexOf(deleteG[0])
            G.splice(a, 1)
        }
        let redS = this.reduceS(S)
        console.log('FINAL-G',G[0])
        console.log("FINAL-S", redS)

        if(this.result(G[0], S) === 'accept'){
            console.log('ALGORITMUS PLATI')
            return [G, S, true]
            //this.setState({result: 'ALGORITMUS PLATI'})
        }
        else{
            console.log('ALGORITMUS NEPLATI')
            return [G, S, false]
            //this.setState({result: 'ALGORITMUS NEPLATI'})
        }
        //console.log(G)
    }

    render(){
        if(this.algorithm()[2]){
            return(
                <div className="result">            
                            <table>
                            <tbody>
                                <tr>
                                    <th>G/S</th>
                                    <th>Výška</th>
                                    <th>Vlasy</th>
                                    <th>Oči</th>
                                </tr>
                                <tr>
                                    <td>G</td>
                                    <td>{this.algorithm()[0][0][0]}</td>
                                    <td>{this.algorithm()[0][0][1]}</td>
                                    <td>{this.algorithm()[0][0][2]}</td>
                                </tr>
                                <tr>
                                    <td>S</td>
                                    <td>{this.algorithm()[1][0]}</td>
                                    <td>{this.algorithm()[1][1]}</td>
                                    <td>{this.algorithm()[1][2]}</td>
                                </tr>
                            </tbody>
                            </table>
                </div>
            );
        }
        else{
            return (
                <div>
                    <p>G SA NEROVNA S</p>
                </div>
            );
        }
    }
}

export default komponent;