function purgeHiddenLayers () {
    var option = document.querySelector('#content_1 .selected--option')
    if (!option) { return }
    // Logic to remove SVG layers that are no longer selected
  }
  
  function clearCharacter () {
    var svgContainer = document.querySelector('#svg1 .character-container')
    if (!svgContainer) return; 
    var toBeRemovedList = document.querySelectorAll('#svg1 .character-container > g')
    var counter = toBeRemovedList.length
  
    while (counter--) {
      if (toBeRemovedList[counter].id != 'male_silhouette' && toBeRemovedList[counter].id != 'female_silhouette') {
        svgContainer.removeChild(toBeRemovedList[counter])
      }
    }
  }
  
  // Mapping body parts to layer names
  function bodyTypesToLayers (type) {
    var layers = []
    layers.push('body_torso_' + type)
    layers.push('body_leg_left_' + type)
    layers.push('body_leg_right_' + type)
    layers.push('body_foot_left')
    layers.push('body_foot_right')
    layers.push('body_arm_left_' + type)
    layers.push('body_arm_right_' + type)
    layers.push('body_forearm_left_' + type)
    layers.push('body_forearm_right_' + type)
    layers.push('body_hand_left_default')
    layers.push('body_hand_right_default')
    return layers
  }