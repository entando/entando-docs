
export default ({ router, isServer }) => {
    if (isServer) return

    window.Entando = window.Entando || {};

    window.Entando.versionedLink = async function(path) {
        console.debug("Nav to path: " + path);
        var pathname = window.location.pathname;
        if (!pathname.startsWith("/v") && !pathname.startsWith("/next/")) {
            console.error("Unversioned path: " + pathname)
            return;
        }
        //Reuse the first term in the path, either /vX.Y or /next
        var pos = pathname.indexOf("/", 1);
        var activeVersion = pathname.substring(0, pos);
        var target = activeVersion + path;
        console.debug("Target for router: " + target);
        try {
            await router.push(target);
        } catch (err) {
            //no-op
        }
    };
}