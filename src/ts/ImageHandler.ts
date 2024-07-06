const assetsMap = {
    settings: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M12.012 2.25c.734.008 1.465.093 2.182.253a.75.75 0 0 1 .582.649l.17 1.527a1.384 1.384 0 0 0 1.927 1.116l1.4-.615a.75.75 0 0 1 .85.174 9.793 9.793 0 0 1 2.205 3.792.75.75 0 0 1-.272.825l-1.241.916a1.38 1.38 0 0 0 0 2.226l1.243.915a.75.75 0 0 1 .272.826 9.798 9.798 0 0 1-2.204 3.792.75.75 0 0 1-.849.175l-1.406-.617a1.38 1.38 0 0 0-1.926 1.114l-.17 1.526a.75.75 0 0 1-.571.647 9.518 9.518 0 0 1-4.406 0 .75.75 0 0 1-.572-.647l-.169-1.524a1.382 1.382 0 0 0-1.925-1.11l-1.406.616a.75.75 0 0 1-.85-.175 9.798 9.798 0 0 1-2.203-3.796.75.75 0 0 1 .272-.826l1.243-.916a1.38 1.38 0 0 0 0-2.226l-1.243-.914a.75.75 0 0 1-.272-.826 9.793 9.793 0 0 1 2.205-3.792.75.75 0 0 1 .85-.174l1.4.615a1.387 1.387 0 0 0 1.93-1.118l.17-1.526a.75.75 0 0 1 .583-.65c.717-.159 1.449-.243 2.201-.252Zm0 1.5a9.136 9.136 0 0 0-1.354.117l-.11.977A2.886 2.886 0 0 1 6.526 7.17l-.899-.394A8.293 8.293 0 0 0 4.28 9.092l.797.587a2.881 2.881 0 0 1 .001 4.643l-.799.588c.32.842.776 1.626 1.348 2.322l.905-.397a2.882 2.882 0 0 1 4.017 2.318l.109.984c.89.15 1.799.15 2.688 0l.11-.984a2.881 2.881 0 0 1 4.018-2.322l.904.396a8.299 8.299 0 0 0 1.348-2.318l-.798-.588a2.88 2.88 0 0 1-.001-4.643l.797-.587a8.293 8.293 0 0 0-1.348-2.317l-.897.393a2.884 2.884 0 0 1-4.023-2.324l-.109-.976a8.99 8.99 0 0 0-1.334-.117ZM12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Zm0 1.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"/></svg>`,
    colorfill: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M9 1.75a.75.75 0 0 1 1.5 0v1.265c.45.04.89.233 1.235.578l3.536 3.536a2 2 0 0 1 0 2.828L11.028 14.2a2 2 0 0 1-2.828 0l-3.536-3.536a2 2 0 0 1 0-2.828l4.243-4.243c.03-.03.061-.06.093-.087V1.75Zm0 4.5v-.629l-2.89 2.89h8.245a.498.498 0 0 0-.145-.322l-3.535-3.535a.498.498 0 0 0-.175-.114v1.71a.75.75 0 1 1-1.5 0Zm-2.868 3.76 3.128 3.13a.5.5 0 0 0 .707 0l3.129-3.13H6.132ZM6.586 14H4.5A2.5 2.5 0 0 0 2 16.5v3A2.5 2.5 0 0 0 4.5 22h15a2.5 2.5 0 0 0 2.5-2.5v-3a2.5 2.5 0 0 0-2.016-2.453 3.772 3.772 0 0 1-.173 1.503 1 1 0 0 1 .689.95v3a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3.835a2.995 2.995 0 0 1-.842-.593L6.586 14Zm7.414.375c0-.493.154-.972.342-1.381.19-.416.438-.806.674-1.134.237-.331.473-.613.649-.812.085-.097.241-.261.3-.323l.005-.005a.75.75 0 0 1 1.06 0l.305.328c.176.199.412.48.65.812.235.328.483.718.673 1.134.188.409.342.888.342 1.381C19 15.765 17.971 17 16.5 17S14 15.765 14 14.375Zm2.766-1.64a8.416 8.416 0 0 0-.266-.35 8.416 8.416 0 0 0-.266.35c-.201.28-.392.585-.529.885-.14.305-.205.56-.205.755 0 .691.48 1.125 1 1.125s1-.434 1-1.125c0-.194-.065-.45-.205-.755a5.493 5.493 0 0 0-.53-.886Z"/></svg>`,
    arrowdownload: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M18.25 20.5a.75.75 0 1 1 0 1.5l-13 .005a.75.75 0 1 1 0-1.5l13-.004ZM11.648 2.014l.102-.007a.75.75 0 0 1 .743.648l.007.102-.001 13.685 3.722-3.72a.75.75 0 0 1 .976-.073l.085.073a.75.75 0 0 1 .072.976l-.073.084-4.997 4.997a.75.75 0 0 1-.976.073l-.085-.073-5.003-4.996a.75.75 0 0 1 .976-1.134l.084.072 3.719 3.714L11 2.756a.75.75 0 0 1 .648-.743l.102-.007-.102.007Z"/></svg>`,
    delete: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M10 5h4a2 2 0 1 0-4 0ZM8.5 5a3.5 3.5 0 1 1 7 0h5.75a.75.75 0 0 1 0 1.5h-1.32L18.76 18.611A3.75 3.75 0 0 1 15.026 22H8.974a3.75 3.75 0 0 1-3.733-3.389L4.07 6.5H2.75a.75.75 0 0 1 0-1.5H8.5Zm2 4.75a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0v-7.5ZM14.25 9a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5a.75.75 0 0 1 .75-.75Zm-7.516 9.467a2.25 2.25 0 0 0 2.24 2.033h6.052a2.25 2.25 0 0 0 2.24-2.033L18.424 6.5H5.576l1.158 11.967Z"/></svg>`,
    convertrange: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M6.25 3A2.25 2.25 0 0 0 4 5.25v2.5A2.25 2.25 0 0 0 6.25 10h9.5A2.25 2.25 0 0 0 18 7.75v-2.5A2.25 2.25 0 0 0 15.75 3h-9.5ZM5.5 5.25a.75.75 0 0 1 .75-.75h9.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75h-9.5a.75.75 0 0 1-.75-.75v-2.5ZM8.7 16c-.387 0-.7.336-.7.75s.313.75.7.75h4.6c.387 0 .7-.336.7-.75s-.313-.75-.7-.75H8.7Zm8.653.445-.073.084a.75.75 0 0 1-.976.073l-.084-.073-2-2a.75.75 0 0 1-.073-.976l.073-.084 2-2a.75.75 0 0 1 1.133.976l-.073.084-.719.721h1.5a1.25 1.25 0 0 0 1.243-1.122l.007-.128V9.75a.75.75 0 0 1 1.493-.102l.007.102V12a2.75 2.75 0 0 1-2.583 2.745l-.167.005h-1.499l.718.719a.75.75 0 0 1 .073.976ZM18 19.25v-2.026l-.013.012c-.405.406-.96.57-1.487.495v1.519a.75.75 0 0 1-.75.75h-9.5a.75.75 0 0 1-.75-.75v-5a.75.75 0 0 1 .75-.75h6.822c.058-.192.148-.376.272-.543l.022-.03.12-.14.788-.787H6.25A2.25 2.25 0 0 0 4 14.25v5a2.25 2.25 0 0 0 2.25 2.25h9.5A2.25 2.25 0 0 0 18 19.25Z"/></svg>`,
    windowconsole: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path fill="#212121" d="M5.646 9.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L7.293 11.5 5.646 9.854a.5.5 0 0 1 0-.708ZM14.5 13h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1ZM2.996 5.5a2.5 2.5 0 0 1 2.5-2.5h9a2.5 2.5 0 0 1 2.5 2.5V6H17v1h-.003v7.5a2.5 2.5 0 0 1-2.5 2.5h-9a2.5 2.5 0 0 1-2.5-2.5v-9Zm13 .5v-.5a1.5 1.5 0 0 0-1.5-1.5h-9a1.5 1.5 0 0 0-1.5 1.5V6h12Zm-12 1v7.5a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5V7h-12Z"/></svg>`,
    merge: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M3 6.75A.75.75 0 0 1 3.75 6h3.257A3.75 3.75 0 0 1 9.66 7.098l2.95 2.95a3.25 3.25 0 0 0 2.298.952h4.53L15.72 7.28a.75.75 0 1 1 1.06-1.06l4.998 5a.75.75 0 0 1 0 1.06l-4.998 5a.75.75 0 1 1-1.06-1.06l3.718-3.72h-4.47a3.25 3.25 0 0 0-2.357 1.012l-2.68 2.82A3.75 3.75 0 0 1 7.212 17.5H3.75a.75.75 0 0 1 0-1.5h3.462a2.25 2.25 0 0 0 1.631-.7l2.68-2.822c.258-.27.544-.508.853-.709a4.754 4.754 0 0 1-.828-.66l-2.95-2.95a2.25 2.25 0 0 0-1.59-.659H3.75A.75.75 0 0 1 3 6.75Z"/></svg>`,
    image: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M17.75 3A3.25 3.25 0 0 1 21 6.25v11.5A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V6.25A3.25 3.25 0 0 1 6.25 3h11.5Zm.58 16.401-5.805-5.686a.75.75 0 0 0-.966-.071l-.084.07-5.807 5.687c.182.064.378.099.582.099h11.5c.203 0 .399-.035.58-.099l-5.805-5.686L18.33 19.4ZM17.75 4.5H6.25A1.75 1.75 0 0 0 4.5 6.25v11.5c0 .208.036.408.103.594l5.823-5.701a2.25 2.25 0 0 1 3.02-.116l.128.116 5.822 5.702c.067-.186.104-.386.104-.595V6.25a1.75 1.75 0 0 0-1.75-1.75Zm-2.498 2a2.252 2.252 0 1 1 0 4.504 2.252 2.252 0 0 1 0-4.504Zm0 1.5a.752.752 0 1 0 0 1.504.752.752 0 0 0 0-1.504Z"/></svg>`,
    documentsearch: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M4 4a2 2 0 0 1 2-2h6.172a2 2 0 0 1 1.414.586l5.828 5.828A2 2 0 0 1 20 9.828V20a2 2 0 0 1-2 2h-4.018a1.742 1.742 0 0 0-.495-.987l-.512-.513H18a.5.5 0 0 0 .5-.5V10H14a2 2 0 0 1-2-2V3.5H6a.5.5 0 0 0-.5.5v7.09a5.458 5.458 0 0 0-1.5.51V4Zm10 4.5h3.38L13.5 4.62V8a.5.5 0 0 0 .5.5ZM6.5 21a4.48 4.48 0 0 0 2.607-.832l2.613 2.612a.75.75 0 1 0 1.06-1.06l-2.612-2.613A4.5 4.5 0 1 0 6.5 21Zm0-1.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/></svg>`,
    musicnote: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M11.513 2.048a.75.75 0 0 0-1.013.702v12.127a4 4 0 1 0 1.476 3.56.749.749 0 0 0 .024-.187V8.832l6.987 2.62A.75.75 0 0 0 20 10.75V7.483a3.25 3.25 0 0 0-2.109-3.044l-6.378-2.391ZM10.5 18a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm8-8.332L12 7.23V3.832l5.364 2.012A1.75 1.75 0 0 1 18.5 7.483v2.185Z"/></svg>`,
    musicnote2: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M19.698 2.148A.75.75 0 0 1 20 2.75v13.5a.764.764 0 0 1-.004.079 3.5 3.5 0 1 1-1.496-2.702V7.758l-8.5 2.55v7.942a.756.756 0 0 1-.004.079A3.5 3.5 0 1 1 8.5 15.627V5.75a.75.75 0 0 1 .534-.718l10-3a.75.75 0 0 1 .664.116ZM10 8.742l8.5-2.55V3.758L10 6.308v2.434ZM6.5 16.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"/></svg>`,
    streamoutput: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path fill="#212121" d="M16.146 2.146a.5.5 0 0 1 .708 0l2.988 2.99a.498.498 0 0 1 0 .729l-2.988 2.989a.5.5 0 0 1-.708-.708L18.293 6H13.5C11.6 6 10 7.6 10 9.5v1C10 13 8 15 5.5 15h-3c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h3C7.4 14 9 12.4 9 10.5v-1C9 7 11 5 13.5 5h4.793l-2.147-2.146a.5.5 0 0 1 0-.708ZM2.5 12H5c1.1 0 2-.9 2-2V9c0-3.3 2.7-6 6-6h.5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H13C9.1 2 6 5.1 6 9v1c0 .6-.4 1-1 1H2.5c-.3 0-.5.2-.5.5s.2.5.5.5Zm12.6-4H14c-1.1 0-2 .9-2 2v1c0 3.3-2.7 6-6 6h-.5c-.3 0-.5.2-.5.5s.2.5.5.5H6c3.9 0 7-3.1 7-7v-1c0-.6.4-1 1-1h1.1c-.1-.3-.1-.7 0-1Z"/></svg>`,
    documentadd: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M18.5 20a.5.5 0 0 1-.5.5h-5.732A6.518 6.518 0 0 1 11.19 22H18a2 2 0 0 0 2-2V9.828a2 2 0 0 0-.586-1.414l-5.829-5.828a.491.491 0 0 0-.049-.04.63.63 0 0 1-.036-.03 2.072 2.072 0 0 0-.219-.18.652.652 0 0 0-.08-.044l-.048-.024-.05-.029c-.054-.031-.109-.063-.166-.087a1.977 1.977 0 0 0-.624-.138c-.02-.001-.04-.004-.059-.007A.605.605 0 0 0 12.172 2H6a2 2 0 0 0-2 2v7.498a6.451 6.451 0 0 1 1.5-.422V4a.5.5 0 0 1 .5-.5h6V8a2 2 0 0 0 2 2h4.5v10Zm-5-15.379L17.378 8.5H14a.5.5 0 0 1-.5-.5V4.621ZM12 17.5a5.5 5.5 0 1 0-11 0 5.5 5.5 0 0 0 11 0ZM7 18l.001 2.503a.5.5 0 1 1-1 0V18H3.496a.5.5 0 0 1 0-1H6v-2.5a.5.5 0 1 1 1 0V17h2.497a.5.5 0 0 1 0 1H7Z"/></svg>`,
    tagsearch: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M22 4.25A2.25 2.25 0 0 0 19.75 2h-5.466a3.25 3.25 0 0 0-2.299.953l-8.5 8.51a3.25 3.25 0 0 0 .004 4.596l4.462 4.455a3.255 3.255 0 0 0 4.596-.001l.094-.094a5.523 5.523 0 0 1-.922-1.199l-.232.232a1.755 1.755 0 0 1-2.477 0L4.55 14.998a1.75 1.75 0 0 1-.015-2.462l8.512-8.523a1.75 1.75 0 0 1 1.239-.513h5.465a.75.75 0 0 1 .75.75v5.462c0 .464-.184.91-.513 1.237l-.768.769a5.52 5.52 0 0 1 1.199.922l.63-.63A3.25 3.25 0 0 0 22 9.712V4.25Zm-3.5 2.752a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Zm1.668 12.105a4.5 4.5 0 1 0-1.06 1.06l2.612 2.613a.75.75 0 1 0 1.06-1.06l-2.612-2.613ZM19.5 16.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>`,
    documentqueue: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M8.75 5a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5ZM8 8.75A.75.75 0 0 1 8.75 8h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 8 8.75ZM8.75 11a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5ZM5 4a2 2 0 0 1 2-2h6.232a2 2 0 0 1 1.414.586l3.768 3.768A2 2 0 0 1 19 7.768V17a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Zm2-.5a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8.5h-3.25a1.75 1.75 0 0 1-1.75-1.75V3.5H7Zm7 .56v2.69c0 .138.112.25.25.25h2.69L14 4.06ZM3.5 15.75a.75.75 0 0 0-1.5 0v1.75A4.5 4.5 0 0 0 6.5 22h11a4.5 4.5 0 0 0 4.5-4.5v-1.75a.75.75 0 0 0-1.5 0v1.75a3 3 0 0 1-3 3h-11a3 3 0 0 1-3-3v-1.75Z"/></svg>`,
    video: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M5.25 5A3.25 3.25 0 0 0 2 8.25v7.5A3.25 3.25 0 0 0 5.25 19h7.5A3.25 3.25 0 0 0 16 15.75v-.312l3.258 2.25c1.16.8 2.744-.03 2.744-1.44V7.751c0-1.41-1.584-2.242-2.744-1.44L16 8.562V8.25A3.25 3.25 0 0 0 12.75 5h-7.5ZM16 10.384l4.11-2.838a.25.25 0 0 1 .392.206v8.495a.25.25 0 0 1-.392.206L16 13.615v-3.231ZM3.5 8.25c0-.966.784-1.75 1.75-1.75h7.5c.966 0 1.75.784 1.75 1.75v7.5a1.75 1.75 0 0 1-1.75 1.75h-7.5a1.75 1.75 0 0 1-1.75-1.75v-7.5Z"/></svg>`,
    photofilter: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M9.5 2a7.503 7.503 0 0 1 7.179 5.321 7.5 7.5 0 1 1-9.357 9.358A7.5 7.5 0 0 1 9.5 2Zm7.486 7.038.01.22L17 9.5a7.5 7.5 0 0 1-7.962 7.486 6 6 0 1 0 7.947-7.948ZM9.5 3.5a6 6 0 0 0-2.486 11.463l-.01-.22L7 14.5a7.5 7.5 0 0 1 7.962-7.486A5.999 5.999 0 0 0 9.5 3.5Z"/></svg>`,
    windowsettings: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path fill="#212121" d="M6 3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h3.6a5.465 5.465 0 0 1-.393-1H6a2 2 0 0 1-2-2V7h12v2.207c.349.099.683.23 1 .393V6a3 3 0 0 0-3-3H6ZM4 6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2H4Zm8.065 5.442a2 2 0 0 1-1.43 2.478l-.462.118a4.734 4.734 0 0 0 .01 1.016l.35.083a2 2 0 0 1 1.456 2.519l-.127.422c.258.204.537.378.835.518l.325-.344a2 2 0 0 1 2.91.002l.337.358c.292-.135.568-.302.822-.498l-.156-.556a2 2 0 0 1 1.43-2.479l.46-.117a4.7 4.7 0 0 0-.01-1.017l-.348-.082a2 2 0 0 1-1.456-2.52l.126-.421a4.318 4.318 0 0 0-.835-.519l-.325.344a2 2 0 0 1-2.91-.001l-.337-.358a4.31 4.31 0 0 0-.821.497l.156.557Zm2.434 4.058a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/></svg>`,
    documentsave: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M18.5 20a.5.5 0 0 1-.5.5h-5v1c0 .171-.017.338-.05.5H18a2 2 0 0 0 2-2V9.828a2 2 0 0 0-.586-1.414l-5.829-5.828a.491.491 0 0 0-.049-.04.63.63 0 0 1-.036-.03 2.072 2.072 0 0 0-.219-.18.652.652 0 0 0-.08-.044l-.048-.024-.05-.029c-.054-.031-.109-.063-.166-.087a1.977 1.977 0 0 0-.624-.138c-.02-.001-.04-.004-.059-.007A.605.605 0 0 0 12.172 2H6a2 2 0 0 0-2 2v7h1.5V4a.5.5 0 0 1 .5-.5h6V8a2 2 0 0 0 2 2h4.5v10Zm-5-15.379L17.378 8.5H14a.5.5 0 0 1-.5-.5V4.621ZM5 12h3v2H5v-2Zm-2.5 0H4v2.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V12h.379a1.5 1.5 0 0 1 1.06.44l1.122 1.12A1.5 1.5 0 0 1 12 14.622V21.5a1.5 1.5 0 0 1-1.5 1.5H10v-5.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0-.5.5V23h-.5A1.5 1.5 0 0 1 1 21.5v-8A1.5 1.5 0 0 1 2.5 12ZM9 18v5H4v-5h5Z"/></svg>`,
    games: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M14.998 5a7 7 0 0 1 .24 13.996l-.24.004H9.002a7 7 0 0 1-.24-13.996L9.001 5h5.996Zm0 1.5H9.002a5.5 5.5 0 0 0-.221 10.996l.221.004h5.996a5.5 5.5 0 0 0 .221-10.996l-.221-.004ZM8 9a.75.75 0 0 1 .75.75v1.498h1.5a.75.75 0 0 1 0 1.5h-1.5v1.502a.75.75 0 0 1-1.5 0v-1.502h-1.5a.75.75 0 1 1 0-1.5h1.5V9.75A.75.75 0 0 1 8 9Zm6.75 3.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Zm2-3.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"/></svg>`,
    paintbucket: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M12 2.25a.75.75 0 0 0-1.5 0V3.5a2.24 2.24 0 0 0-.841.53L2.78 10.91a2.25 2.25 0 0 0 0 3.182L7.66 18.97a2.25 2.25 0 0 0 3.182 0l6.879-6.879a2.25 2.25 0 0 0 0-3.182L12.84 4.03A2.24 2.24 0 0 0 12 3.5V2.25Zm-8.159 9.72L10.5 5.31v1.44a.75.75 0 0 0 1.5 0V5.31l4.659 4.66a.75.75 0 0 1 0 1.06l-.97.97H3.812l.029-.03Zm.47 1.53h9.878L9.78 17.909a.75.75 0 0 1-1.06 0L4.31 13.5Zm15.21.102a.874.874 0 0 0-1.542 0l-2.008 3.766C14.85 19.466 16.372 22 18.75 22s3.898-2.534 2.78-4.632l-2.009-3.766Zm-2.227 4.471 1.456-2.73 1.456 2.73a1.65 1.65 0 1 1-2.912 0Z"/></svg>`,
    screenshot: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M6.25 3A3.25 3.25 0 0 0 3 6.25v11.5A3.25 3.25 0 0 0 6.25 21h11.5A3.25 3.25 0 0 0 21 17.75V6.25A3.25 3.25 0 0 0 17.75 3H6.25ZM4.5 6.25c0-.966.784-1.75 1.75-1.75h11.5c.966 0 1.75.784 1.75 1.75v11.5a1.75 1.75 0 0 1-1.75 1.75H6.25a1.75 1.75 0 0 1-1.75-1.75V6.25ZM8 7.5a.5.5 0 0 0-.5.5v2.25a.75.75 0 0 1-1.5 0V8a2 2 0 0 1 2-2h2.25a.75.75 0 0 1 0 1.5H8Zm0 9a.5.5 0 0 1-.5-.5v-2.25a.75.75 0 0 0-1.5 0V16a2 2 0 0 0 2 2h2.25a.75.75 0 0 0 0-1.5H8ZM16.5 8a.5.5 0 0 0-.5-.5h-2.25a.75.75 0 0 1 0-1.5H16a2 2 0 0 1 2 2v2.25a.75.75 0 0 1-1.5 0V8Zm-.5 8.5a.5.5 0 0 0 .5-.5v-2.25a.75.75 0 0 1 1.5 0V16a2 2 0 0 1-2 2h-2.25a.75.75 0 0 1 0-1.5H16Z"/></svg>`,
    alert: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M12 1.996a7.49 7.49 0 0 1 7.496 7.25l.004.25v4.097l1.38 3.156a1.249 1.249 0 0 1-1.145 1.75L15 18.502a3 3 0 0 1-5.995.177L9 18.499H4.275a1.251 1.251 0 0 1-1.147-1.747L4.5 13.594V9.496c0-4.155 3.352-7.5 7.5-7.5ZM13.5 18.5l-3 .002a1.5 1.5 0 0 0 2.993.145l.007-.147ZM12 3.496c-3.32 0-6 2.674-6 6v4.41L4.656 17h14.697L18 13.907V9.509l-.003-.225A5.988 5.988 0 0 0 12 3.496Z"/></svg>`,
    save: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M3 5.75A2.75 2.75 0 0 1 5.75 3h9.964a3.25 3.25 0 0 1 2.299.952l2.035 2.035c.61.61.952 1.437.952 2.299v9.964A2.75 2.75 0 0 1 18.25 21H5.75A2.75 2.75 0 0 1 3 18.25V5.75ZM5.75 4.5c-.69 0-1.25.56-1.25 1.25v12.5c0 .69.56 1.25 1.25 1.25H6v-5.25A2.25 2.25 0 0 1 8.25 12h7.5A2.25 2.25 0 0 1 18 14.25v5.25h.25c.69 0 1.25-.56 1.25-1.25V8.286c0-.465-.184-.91-.513-1.238l-2.035-2.035a1.75 1.75 0 0 0-.952-.49V7.25a2.25 2.25 0 0 1-2.25 2.25h-4.5A2.25 2.25 0 0 1 7 7.25V4.5H5.75Zm10.75 15v-5.25a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0-.75.75v5.25h9Zm-8-15v2.75c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75V4.5h-6Z"/></svg>`,
    volume2: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M15 4.25c0-1.08-1.274-1.651-2.08-.935L8.427 7.31a.75.75 0 0 1-.498.19H4.25A2.25 2.25 0 0 0 2 9.748v4.497a2.25 2.25 0 0 0 2.25 2.25h3.68a.75.75 0 0 1 .498.19l4.491 3.993c.806.717 2.081.145 2.081-.934V4.25ZM9.425 8.43 13.5 4.806v14.382l-4.075-3.623a2.25 2.25 0 0 0-1.495-.569H4.25a.75.75 0 0 1-.75-.75V9.748a.75.75 0 0 1 .75-.75h3.68a2.25 2.25 0 0 0 1.495-.568Zm9.567-2.533a.75.75 0 0 1 1.049.156A9.959 9.959 0 0 1 22 12a9.96 9.96 0 0 1-1.96 5.947.75.75 0 1 1-1.205-.893A8.459 8.459 0 0 0 20.5 12a8.459 8.459 0 0 0-1.665-5.053.75.75 0 0 1 .157-1.05Zm-1.849 2.472a.75.75 0 0 1 1.017.302c.536.991.84 2.125.84 3.329a6.973 6.973 0 0 1-.84 3.328.75.75 0 0 1-1.32-.714c.42-.777.66-1.667.66-2.615 0-.947-.24-1.837-.66-2.614a.75.75 0 0 1 .303-1.016Z"/></svg>`,
    speakermute: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M12.92 3.315C13.726 2.6 15 3.171 15 4.25v15.495c0 1.079-1.274 1.651-2.08.934l-4.492-3.993a.75.75 0 0 0-.498-.19H4.25A2.25 2.25 0 0 1 2 14.246V9.748a2.25 2.25 0 0 1 2.25-2.25h3.68a.75.75 0 0 0 .498-.19l4.491-3.993Zm.58 1.491L9.425 8.43a2.25 2.25 0 0 1-1.495.568H4.25a.75.75 0 0 0-.75.75v4.498c0 .414.336.75.75.75h3.68a2.25 2.25 0 0 1 1.495.569l4.075 3.623V4.806Zm2.72 4.413a.75.75 0 0 1 1.06 0L19 10.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L20.06 12l1.72 1.72a.75.75 0 0 1-1.06 1.06L19 13.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L17.94 12l-1.72-1.72a.75.75 0 0 1 0-1.06Z"/></svg>`,
    fps60: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M11.75 15a2.25 2.25 0 0 1 .154 4.494l-.154.005H11v1.75a.75.75 0 0 1-.648.743L10.25 22a.75.75 0 0 1-.743-.648l-.007-.102v-5.5a.75.75 0 0 1 .648-.743l.102-.007h1.5ZM18 15a2 2 0 0 1 2 2 .75.75 0 0 1-1.493.101l-.007-.102a.5.5 0 0 0-.41-.492L18 16.5h-.625a.625.625 0 0 0-.092 1.243l.092.007h.5a2.125 2.125 0 0 1 .152 4.245l-.152.005h-.625a2 2 0 0 1-2-2 .75.75 0 0 1 1.493-.102l.007.102a.5.5 0 0 0 .41.492l.09.008h.625a.625.625 0 0 0 .092-1.243l-.092-.007h-.5a2.125 2.125 0 0 1-.152-4.244l.152-.006H18ZM7.75 15a.75.75 0 0 1 .102 1.492l-.102.007H5.5V18l1.75.001a.75.75 0 0 1 .102 1.493l-.102.007H5.5v1.728a.75.75 0 0 1-.648.744l-.102.006a.75.75 0 0 1-.743-.648L4 21.23v-5.48a.75.75 0 0 1 .648-.744l.102-.007h3Zm4 1.5H11V18h.75a.75.75 0 0 0 .102-1.494l-.102-.007ZM8 3a3 3 0 0 1 2.996 2.823l.005.176v.172a.75.75 0 0 1-1.493.102l-.006-.102V6l-.007-.145a1.5 1.5 0 0 0-2.988.002l-.007.145V7.4a3 3 0 1 1-1.496 2.776L5 9.998 5 6.002A3.002 3.002 0 0 1 8 3Zm7.006 0a2.994 2.994 0 0 1 2.989 2.82l.005.175v4.01a2.995 2.995 0 0 1-2.818 2.99l-.176.004-.188-.005a2.995 2.995 0 0 1-2.813-2.813L12 10.005v-4.01a2.995 2.995 0 0 1 2.818-2.99l.188-.004ZM8 8.499a1.5 1.5 0 0 0-1.494 1.357l-.006.144A1.502 1.502 0 1 0 8 8.5Zm7.006-3.997h-.012c-.776 0-1.415.592-1.487 1.35l-.007.144v4.01c0 .777.593 1.415 1.35 1.487l.144.007.156-.007a1.495 1.495 0 0 0 1.343-1.343l.007-.144v-4.01c0-.825-.669-1.494-1.494-1.494Z"/></svg>`,
    slidesize: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M16.78 7.22c.142.14.22.331.22.53v2.5a.75.75 0 0 1-1.5 0v-.69l-1.72 1.72a.75.75 0 1 1-1.06-1.061L14.44 8.5h-.69a.75.75 0 0 1 0-1.5h2.5a.75.75 0 0 1 .53.22ZM7 16.25a.75.75 0 0 0 .75.75h2.501a.75.75 0 0 0 0-1.5h-.69l1.72-1.72a.75.75 0 0 0-1.061-1.06L8.5 14.438v-.69a.75.75 0 0 0-1.5 0v2.5Zm-5-9.5A2.75 2.75 0 0 1 4.75 4h14.5A2.75 2.75 0 0 1 22 6.75v10.5A2.75 2.75 0 0 1 19.25 20H4.75A2.75 2.75 0 0 1 2 17.25V6.75ZM4.75 5.5c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h14.5c.69 0 1.25-.56 1.25-1.25V6.75c0-.69-.56-1.25-1.25-1.25H4.75Z"/></svg>`,
    rotateleft: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M15.015 5c.084 0 .167.002.25.005h.017a6.79 6.79 0 0 1 3.131.883C19.976 6.79 21 8.295 21 10c0 1.708-1.027 3.216-2.596 4.118A6.833 6.833 0 0 1 15 15h-.5a.75.75 0 1 1 0-1.5h.5c.963 0 1.856-.235 2.588-.636C18.744 12.23 19.5 11.184 19.5 10s-.756-2.23-1.912-2.864a5.357 5.357 0 0 0-2.363-.632L15 6.5H8.061l1.72 1.72a.75.75 0 0 1-.977 1.133L8.72 9.28h-.001l-3-3a.75.75 0 0 1 0-1.06l3-3 .085-.073a.75.75 0 0 1 .977 1.132L8.062 5H15.015Zm5.374 15.067a.5.5 0 0 1-.25.933H4a1 1 0 0 1-1-1v-9.133a.5.5 0 0 1 .75-.433l16.639 9.633Zm-3.974-.567L4.5 12.602V19.5h11.915Z"/></svg>`,
    color: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M3.839 5.858c2.94-3.916 9.03-5.055 13.364-2.36 4.28 2.66 5.854 7.777 4.1 12.577-1.655 4.533-6.016 6.328-9.159 4.048-1.177-.854-1.634-1.925-1.854-3.664l-.106-.987-.045-.398c-.123-.934-.311-1.352-.705-1.572-.535-.298-.892-.305-1.595-.033l-.351.146-.179.078c-1.014.44-1.688.595-2.541.416l-.2-.047-.164-.047c-2.789-.864-3.202-4.647-.565-8.157Zm.984 6.716.123.037.134.03c.439.087.814.015 1.437-.242l.602-.257c1.202-.493 1.985-.54 3.046.05.917.512 1.275 1.298 1.457 2.66l.053.459.055.532.047.422c.172 1.361.485 2.09 1.248 2.644 2.275 1.65 5.534.309 6.87-3.349 1.516-4.152.174-8.514-3.484-10.789-3.675-2.284-8.899-1.306-11.373 1.987-2.075 2.763-1.82 5.28-.215 5.816Zm11.225-1.994a1.25 1.25 0 1 1 2.414-.647 1.25 1.25 0 0 1-2.414.647Zm.494 3.488a1.25 1.25 0 1 1 2.415-.647 1.25 1.25 0 0 1-2.415.647ZM14.07 7.577a1.25 1.25 0 1 1 2.415-.647 1.25 1.25 0 0 1-2.415.647Zm-.028 8.998a1.25 1.25 0 1 1 2.414-.647 1.25 1.25 0 0 1-2.414.647Zm-3.497-9.97a1.25 1.25 0 1 1 2.415-.646 1.25 1.25 0 0 1-2.415.646Z"/></svg>`,
    cut: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M12.14 9.341v.002L7.37 2.328a.75.75 0 1 0-1.24.844l5.13 7.545-2.395 3.743a4 4 0 1 0 1.178.943l2.135-3.337 2.065 3.036a4 4 0 1 0 1.261-.813l-2.447-3.597.002-.002-.918-1.348Zm-7.64 8.66a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Zm10 0a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Zm-.562-8.685 3.943-6.162a.75.75 0 1 0-1.263-.808L13.02 7.968l.918 1.348Z"/></svg>`,
    tv: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M4.75 4A2.75 2.75 0 0 0 2 6.75v8.5A2.75 2.75 0 0 0 4.75 18h14.5A2.75 2.75 0 0 0 22 15.25v-8.5A2.75 2.75 0 0 0 19.25 4H4.75ZM3.5 6.75c0-.69.56-1.25 1.25-1.25h14.5c.69 0 1.25.56 1.25 1.25v8.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-8.5ZM5.75 19.5a.75.75 0 0 0 0 1.5h12.5a.75.75 0 0 0 0-1.5H5.75Z"/></svg>`,
    videopersonsparkle: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48"><path fill="#212121" d="M4.039 16.464a2.155 2.155 0 0 1-.044-.05l.01.002-.078-.089a2.6 2.6 0 0 0-.121-.133 3.78 3.78 0 0 0-1.485-.918l-1.837-.6a.728.728 0 0 1-.351-1.103.731.731 0 0 1 .351-.264l1.837-.6a3.79 3.79 0 0 0 1.462-.92c.087-.1.169-.204.245-.311.127-.16.244-.33.35-.505.114-.196.211-.4.29-.613l.612-1.881a.729.729 0 0 1 .684-.484c.15 0 .297.046.42.133.036.03.07.064.1.1.07.071.125.157.16.25l.601 1.835a3.793 3.793 0 0 0 2.397 2.396l1.838.6.037.008A.728.728 0 0 1 12 14a.72.72 0 0 1-.484.684l-1.838.6a3.782 3.782 0 0 0-1.48.919 3.79 3.79 0 0 0-.917 1.48l-.6 1.836-.017.045a.719.719 0 0 1-.167.206.286.286 0 0 0-.032.043c-.014.021-.028.042-.05.057a.73.73 0 0 1-.998-.156.713.713 0 0 1-.105-.2l-.6-1.835a3.792 3.792 0 0 0-.6-1.13 1.239 1.239 0 0 0-.074-.085Zm24.201-.708a5.998 5.998 0 0 1-4.243 10.241 6.002 6.002 0 0 1-6-5.999 5.998 5.998 0 0 1 6-5.999c1.592 0 3.118.632 4.244 1.757ZM40.25 8H8.59l.548 1.688a1.8 1.8 0 0 0 .43.7.709.709 0 0 0 .083.066c.022.015.043.03.062.048H40.25a1.25 1.25 0 0 1 1.25 1.25v24.496a1.25 1.25 0 0 1-1.25 1.25H34v-6.251a3.25 3.25 0 0 0-3.25-3.25H17.245a3.25 3.25 0 0 0-3.25 3.25v6.248h-6.25a1.25 1.25 0 0 1-1.251-1.25V21.949a2.684 2.684 0 0 1-.5.053 2.71 2.71 0 0 1-1.574-.5 2.65 2.65 0 0 1-.426-.414v15.159a3.749 3.749 0 0 0 3.75 3.75H40.25A3.75 3.75 0 0 0 44 36.245V11.749A3.748 3.748 0 0 0 40.25 8Zm-29.9 13.748a2.214 2.214 0 0 0 1.38-1.397l.349-1.07a.422.422 0 0 1 .399-.279.42.42 0 0 1 .244.078.418.418 0 0 1 .155.2l.348 1.071a2.2 2.2 0 0 0 1.4 1.397l1.07.348.022.006a.422.422 0 0 1 .278.399.422.422 0 0 1-.278.398l-1.072.349a2.208 2.208 0 0 0-1.401 1.397l-.35 1.07a.422.422 0 0 1-.398.278.42.42 0 0 1-.244-.078.417.417 0 0 1-.155-.2l-.348-1.07a2.199 2.199 0 0 0-1.4-1.403l-1.07-.348a.425.425 0 0 1-.284-.4.419.419 0 0 1 .283-.398l1.072-.348Z"/></svg>`,
    addcircle: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm0 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 0 1.5h-3.5v3.5a.75.75 0 0 1-1.5 0v-3.5h-3.5a.75.75 0 0 1 0-1.5h3.5v-3.5A.75.75 0 0 1 12 7Z"/></svg>`,
    documentmultiple: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M4 4.25A2.25 2.25 0 0 1 6.25 2h4.381a2.25 2.25 0 0 1 1.591.659l4.619 4.619c.422.422.659.994.659 1.59v8.382a2.25 2.25 0 0 1-2.25 2.25h-9A2.25 2.25 0 0 1 4 17.25v-13Zm2.25-.75a.75.75 0 0 0-.75.75v13c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75V8.998h-3.246a2.25 2.25 0 0 1-2.25-2.25V3.5H6.25Zm5.754 1.062v2.186c0 .414.336.75.75.75h2.185l-2.935-2.936Z"/><path fill="#212121" d="M6.629 20.5A2.25 2.25 0 0 0 8.75 22h6.5A4.75 4.75 0 0 0 20 17.25v-5.881a2.25 2.25 0 0 0-.66-1.591l-.84-.841v8.313a3.25 3.25 0 0 1-3.25 3.25H6.629Z"/></svg>`,
    sparkle: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M8.665 15.735c.245.173.537.265.836.264v-.004a1.441 1.441 0 0 0 1.327-.872l.613-1.864a2.87 2.87 0 0 1 1.817-1.812l1.778-.578a1.442 1.442 0 0 0-.052-2.74l-1.755-.57a2.877 2.877 0 0 1-1.822-1.823l-.578-1.777a1.446 1.446 0 0 0-2.732.022l-.583 1.792a2.877 2.877 0 0 1-1.77 1.786l-1.777.57a1.444 1.444 0 0 0 .017 2.735l1.754.569a2.887 2.887 0 0 1 1.822 1.826l.578 1.775c.099.283.283.527.527.7Zm-.374-4.25a4.054 4.054 0 0 0-.363-.413h.003a4.393 4.393 0 0 0-1.72-1.063l-1.6-.508 1.611-.524a4.4 4.4 0 0 0 1.69-1.065 4.448 4.448 0 0 0 1.041-1.708l.515-1.582.516 1.587a4.375 4.375 0 0 0 2.781 2.773l1.62.522-1.59.515a4.379 4.379 0 0 0-2.774 2.775l-.515 1.582-.515-1.585a4.367 4.367 0 0 0-.7-1.306Zm8.041 9.297a1.123 1.123 0 0 1-.41-.55l-.328-1.006a1.292 1.292 0 0 0-.821-.823l-.991-.323a1.148 1.148 0 0 1-.781-1.083 1.142 1.142 0 0 1 .771-1.08l1.006-.326a1.3 1.3 0 0 0 .8-.82l.324-.991a1.143 1.143 0 0 1 2.157-.021l.329 1.014a1.299 1.299 0 0 0 .82.816l.992.323a1.141 1.141 0 0 1 .039 2.165l-1.014.329a1.3 1.3 0 0 0-.818.822l-.322.989c-.078.23-.226.43-.425.57a1.14 1.14 0 0 1-1.328-.005Zm-1.03-3.783A2.791 2.791 0 0 1 17 18.708a2.793 2.793 0 0 1 1.7-1.7 2.813 2.813 0 0 1-1.718-1.708 2.808 2.808 0 0 1-1.682 1.699Z"/></svg>`,
    shield: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="M3 5.75A.75.75 0 0 1 3.75 5c2.663 0 5.258-.943 7.8-2.85a.75.75 0 0 1 .9 0C14.992 4.057 17.587 5 20.25 5a.75.75 0 0 1 .75.75V11c0 5.001-2.958 8.676-8.725 10.948a.75.75 0 0 1-.55 0C5.958 19.676 3 16 3 11V5.75Zm1.5.728V11c0 4.256 2.453 7.379 7.5 9.442 5.047-2.063 7.5-5.186 7.5-9.442V6.478c-2.577-.152-5.08-1.09-7.5-2.8-2.42 1.71-4.923 2.648-7.5 2.8Z"/></svg>`,
    codets: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#212121" d="M13 9.75A2.28 2.28 0 0 1 10.5 12 2.28 2.28 0 0 1 8 9.75a.5.5 0 0 1 1 0c0 .924.808 1.25 1.5 1.25s1.5-.326 1.5-1.25c0-.608-.633-.89-1.676-1.281C9.281 8.078 8 7.6 8 6.25A2.281 2.281 0 0 1 10.5 4 2.281 2.281 0 0 1 13 6.25a.5.5 0 0 1-1 0C12 5.328 11.192 5 10.5 5S9 5.328 9 6.25c0 .609.633.89 1.676 1.282C11.719 7.923 13 8.4 13 9.75ZM6.75 4h-4.5a.5.5 0 1 0 0 1H4v6.5a.5.5 0 1 0 1 0V5h1.75a.5.5 0 1 0 0-1Z"/></svg>`,
    code: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="m8.066 18.943 6.5-14.5a.75.75 0 0 1 1.404.518l-.036.096-6.5 14.5a.75.75 0 0 1-1.404-.518l.036-.096 6.5-14.5-6.5 14.5ZM2.22 11.47l4.25-4.25a.75.75 0 0 1 1.133.976l-.073.085L3.81 12l3.72 3.719a.75.75 0 0 1-.976 1.133l-.084-.073-4.25-4.25a.75.75 0 0 1-.073-.976l.073-.084 4.25-4.25-4.25 4.25Zm14.25-4.25a.75.75 0 0 1 .976-.073l.084.073 4.25 4.25a.75.75 0 0 1 .073.976l-.073.085-4.25 4.25a.75.75 0 0 1-1.133-.977l.073-.084L20.19 12l-3.72-3.72a.75.75 0 0 1 0-1.06Z"/></svg>`,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="#212121" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" viewBox="0 0 22 19.5"><path d="M12.75 2.25A3.25 3.25 0 0 1 16 5.5v.173l3.864-2.318A.75.75 0 0 1 21 3.998V15.5a.75.75 0 0 1-1.136.643L16 13.825V14a3.25 3.25 0 0 1-3.25 3.25h-8.5A3.25 3.25 0 0 1 1 14V5.5a3.25 3.25 0 0 1 3.25-3.25h8.5zm0 1.5h-8.5A1.75 1.75 0 0 0 2.5 5.5V14a1.75 1.75 0 0 0 1.75 1.75h8.5A1.75 1.75 0 0 0 14.5 14V5.5a1.75 1.75 0 0 0-1.75-1.75zm6.75 1.573L16 7.425v4.651l3.5 2.1V5.323zm-10.571.878a.223.223 0 0 0-.288.213v4.407a1.44 1.44 0 0 0-1.001-.403 1.445 1.445 0 1 0 1.446 1.446l-.002-.08.002-.031V8.494l2.604.801a.223.223 0 0 0 .288-.213V7.96a1.11 1.11 0 0 0-.785-1.063L8.929 6.2zm2.604 2.581-2.447-.753V6.714l1.976.608c.28.086.471.345.471.638v.821zm-4.894 3.082a1.001 1.001 0 1 1 2.002 0 1.001 1.001 0 1 1-2.002 0z"/></svg>`,
    locallanguage: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#212121" d="m9.34 6.372.05.105 5.56 14.5a.755.755 0 0 1-.418.971.73.73 0 0 1-.91-.333l-.043-.092-1.433-3.737H5.06l-.094-.006-1.546 3.76a.73.73 0 0 1-.963.401.754.754 0 0 1-.427-.885l.033-.096 5.964-14.5a.73.73 0 0 1 1.314-.088Zm9.406-4.37a.75.75 0 0 1 .743.65l.007.1V7.5h1.75a.75.75 0 0 1 .743.649l.007.102a.75.75 0 0 1-.648.743L21.245 9l-1.75-.001v7.25a.75.75 0 0 1-.648.744l-.102.007a.75.75 0 0 1-.743-.648l-.007-.102V2.753a.75.75 0 0 1 .75-.75ZM8.81 8.748 5.65 16.286h6.11L8.81 8.747Zm1.937-6.744h5.498a.75.75 0 0 1 .743.648l.006.102v3.004c0 2.344-1.9 4.245-4.245 4.245a.75.75 0 0 1 0-1.5c1.46 0 2.654-1.14 2.74-2.578l.005-.167V3.503h-4.747a.75.75 0 0 1-.102-1.493l.102-.007h5.498-5.498Z"/></svg>`
}
export type AvailableAssets = keyof typeof assetsMap;
const imageMap = new Map<HTMLImageElement, AvailableAssets>([]);
export function UpdateImageMap(image: HTMLImageElement, id: AvailableAssets) {
    imageMap.set(image, id);
}
export function RerenderImageMap() {
    for (const [image, id] of imageMap) if (image) {
        URL.revokeObjectURL(image.src);
        image.src = GetImage(id);
    }
}
export function GetImage(id: AvailableAssets, customColor?: string) {
    return URL.createObjectURL(new Blob([assetsMap[id].replaceAll("#212121", customColor || getComputedStyle(document.body).getPropertyValue("--select"))], { type: "image/svg+xml" }));
}