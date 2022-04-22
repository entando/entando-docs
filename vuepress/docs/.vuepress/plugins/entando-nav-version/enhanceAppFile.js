
export default ({ router, isServer }) => {
    if (isServer) return

    window.Entando = window.Entando || {};

    window.Entando.versionedLink = async function(path) {
        var pathname = window.location.pathname;
        var versionPos = pathname.indexOf("/v");
        var nextPos = pathname.indexOf("/next/");
        var target = path;
        //Reuse the versioned part of the path, either (/prefix)/vX.Y or (/prefix)/next
        if ((versionPos >= 0) || (nextPos >= 0)) {
            var start = (versionPos >= 0) ? versionPos : nextPos;
            var pos = pathname.indexOf("/", start + 2);
            var activeVersion = pathname.substring(start, pos);
            target = activeVersion + path;
        }
        try {
            await router.push(target);
        } catch (err) {
            //no-op
        }
    };
}
