
export default ({ router, isServer }) => {
    if (isServer) return

    window.Entando = window.Entando || {};

    window.Entando.versionedLink = async function(path) {
        // console.debug("Nav to path: " + path);
        var pathname = window.location.pathname;
        var versionPos = pathname.indexOf("/v6");
        var nextPos = pathname.indexOf("/next/");
        if (!versionPos && !nextPos) {
            console.error("Unversioned path: " + pathname)
            return;
        }
        //Reuse the versioned part of the path, either (/prefix)/vX.Y or (/prefix)/next
        var start = (versionPos >= 0) ? versionPos : nextPos;
        var pos = pathname.indexOf("/", start + 1);
        var activeVersion = pathname.substring(start, pos);
        var target = activeVersion + path;
        // console.debug("Target for router: " + target);
        try {
            await router.push(target);
        } catch (err) {
            //no-op
        }
    };
}