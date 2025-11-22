function Character (choices) {
    this.choices = choices || {
      emotion: 'neutral',
      body: 'default', 
      skinColor: '#F0D5BE', 
      hairColor: '#25282f'
    }
  }
  
  function modCharacter (myKey, myValue) {
    // Safety check if c is not initialized yet
    if (typeof window.c === 'undefined') return;
  
    if (myKey in window.c.choices) {
      delete window.c.choices[myKey]
    }
    if (myValue != '') {
      window.c.choices[myKey] = myValue
    }
  }
  
  function launch () {
    // This function is called by main.js to start the layering process
    // It relies on globals.js variables and layer.js functions
    var sex = window.c.choices.sex || 'f'; // Default to female if undefined
    var multiLayer = (typeof getMultiLayer === 'function') ? getMultiLayer() : [];
    
    // Trigger the rendering logic (from layers.js and loader.js)
    if(typeof choicesToLayers === 'function' && typeof loadFilesFromList === 'function') {
        const toBeShown = choicesToLayers(window.c, multiLayer);
        loadFilesFromList(toBeShown);
    }
  }