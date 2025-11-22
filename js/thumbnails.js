function openThumbs () {
    if (typeof hideColorPicker === 'function') hideColorPicker()
    openThumbsLogic(this)
  }
  
  function openThumbsLogic (_) {
    var section = _.innerHTML
    var layersList = (typeof getSectionLayersList === 'function') ? getSectionLayersList(section) : []
    var sectionLowerCase = section.toLowerCase()
    var previousSelection = document.querySelector('.section--selected')
    
    if (previousSelection != null) {
      if (typeof purgeHiddenLayers === 'function') purgeHiddenLayers()
      previousSelection.classList.remove('section--selected')
    }
  
    if (typeof loadSectionLayers === 'function') {
        loadSectionLayers(sectionLowerCase, layersList, populateThumbs, true)
    }
    
    showThumbOptions(_)
    _.classList.add('section--selected')
  }
  
  function populateThumbs (svgObject) {
    var thumbObject = svgObject.cloneNode(true)
    var layerID = thumbObject.id
    // Logic to append thumbObject to the UI sidebar
    if (!document.querySelector('#content_1 g#' + layerID)) {
        document.querySelector('#content_1').appendChild(thumbObject);
    }
  }
  
  function showThumbOptions (_) {
    var _ = _.target || _
    var sectionName = _.innerHTML.toLowerCase()
    var showOptionThumbs = document.querySelector('.options__' + sectionName)
    var allOptions = document.querySelectorAll('.options__container')
    var i = allOptions.length
    
    while (i--) {
        allOptions[i].classList.remove('selected--option')
    }
    if (showOptionThumbs) showOptionThumbs.classList.add('selected--option')
  }