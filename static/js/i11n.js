$("[data-locale]").each(function() {
    try {
        i11n = JSON.parse($(this).attr("data-locales"));
        var l = "";
        if (localStorage in window) l = window.localStorage.getItem("language");
        $(this).text(i11n[l || window.navigator.browserLanguage || window.navigator.language] || $(this).text())
    } catch(err) {
        console.error(err);
    }
});
