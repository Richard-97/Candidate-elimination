import React, { Component } from 'react';
import './App.css';
import Komponent from './Komponent';

class App extends Component {
  render() {
    return (
      <div className="App">
          <h1>Strojové učenie</h1>
           <h3>Algoritmus eliminácie kandidáta</h3>
          <table>
          <tbody>
              <tr>
                <th>Výška</th>
                <th>Vlasy</th>
                <th>Oči</th>
                <th>Trieda</th>
              </tr>
              <tr>
                <td>Nízky</td>
                <td>Blond</td>
                <td>Hnedé</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Vysoký</td>
                <td>Tmavé</td>
                <td>Hnede</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Vysoký</td>
                <td>Blond</td>
                <td>Modé</td>
                <td>+</td>
              </tr>
              <tr>
                <td>Vysoký</td>
                <td>Tmavé</td>
                <td>Modré</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Nízky</td>
                <td>Tmavé</td>
                <td>Modré</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Vysoký</td>
                <td>Červené</td>
                <td>Modré</td>
                <td>+</td>
              </tr>
              <tr>
                <td>Vysoký</td>
                <td>Blond</td>
                <td>Hnedé</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Nízky</td>
                <td>Blond</td>
                <td>Modré</td>
                <td>+</td>
              </tr>
            </tbody>
          </table>
          <Komponent />
      </div>
    );
  }
}

export default App;
