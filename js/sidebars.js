"use strict"
const showSidebarLeft = () => {
    const el = document.querySelector('#sidebar-left');
    if(el) el.classList.add('visible');
}
const hideSidebarLeft = () => {
    const el = document.querySelector('#sidebar-left');
    if(el) el.classList.remove('visible');
}
const clearSidebarLeft = () => {
    const el = document.querySelector('#sidebar-left');
    if(el) el.innerHTML = '';
}
const showSidebarRight = () => {
    const el = document.querySelector('#sidebar');
    if(el) el.classList.add('visible');
}
const hideSidebarRight = () => {
    const el = document.querySelector('#sidebar');
    if(el) el.classList.remove('visible');
}
function clearSidebarRight () {
  const content = document.querySelector('#content_1');
  const sidebar = document.querySelector('#sidebar');
  if(content) content.innerHTML = '';
  if(sidebar) sidebar.classList.remove('visible');
}