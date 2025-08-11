export function set_html_attrs(doc) {
  // doc.body.innerHTML = attrs
  cy.document().then((doc) => {
    doc.body.innerHTML = `
        <div id="test"
        class="special"
        data-value="42"
        name="testElement"
        data-cy="hello"
        style="display:block">Hello Cypress</div>
        <br/>
        <input id="number" type="number" value="15"/>
        <br/>
        <input id="text_input" type="text" value="Did you like Harry Potter?"/>
        <br/>
        <input id="file_input" type="file"/>
        <br/>

        <span id="compteur0">0</span>
        <button id="incr_btn0" onclick="incrementer('compteur0')">+1</button>
        <br/>

        My list:
        <ul>
          <li>Orange
            <button id="incr_btn1" onclick="incrementer('compteur1')">
              <span id="compteur1">0</span>
            </button>
          </li>
          <li>Apple
            <button id="incr_btn2" onclick="incrementer('compteur2')">
              <span id="compteur2">0</span>
            </button>
          </li>
          <li>Banana
            <button id="incr_btn3" onclick="incrementer('compteur3')">
              <span id="compteur3">0</span>
            </button>
          </li>
        </ul>
      `

    const script = doc.createElement('script')
    script.innerHTML = `
        let compteur = 0;
        function incrementer(id) {
          const compteur = document.getElementById(id)
          compteur.textContent = parseInt(compteur.textContent, 10) + 1
        }
      `
    doc.body.appendChild(script)
  })
}
