module.exports = (temp, data) => {
    let output = temp.replace(/{%PAGE_TITLE%}/g, data.pageTitle);
    //output = temp.replace(/{%SIDE_BAR%}/g, data.sideBar);
    //output = temp.replace(/{%TOP_BAR%}/g, data.topBar);
    output = temp.replace(/{%PAGE_NAME%}/g, data.pageName);
    //output = temp.replace(/{%PAGE_CONTENT%}/g, data.pageContent);
    //output = temp.replace(/{%FOOTER%}/g, data.footer);
    return output;
}