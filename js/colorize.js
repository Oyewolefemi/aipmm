function shadeColor (color, percent) {
    var num = parseInt(color.slice(1), 16)
    var amt = Math.round(2.55 * percent); var R = (num >> 16) + amt
    var G = (num >> 8 & 0x00FF) + amt; var B = (num & 0x0000FF) + amt
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)
  }
  
  function colorizeByClass (elClassName, color) {
    var elementList = document.querySelectorAll(('.' + elClassName))
    var elementListLength = elementList.length
    var elCounter = elementListLength
    while (elCounter--) {
      elementList[elementListLength - (elCounter + 1)].style.fill = color
    }
  }
  
  function colorize(formId, _color) {
      // Logic to apply color to SVG paths based on formId (e.g., 'hair', 'skin')
      // This requires DOM manipulation of the SVG elements
  }