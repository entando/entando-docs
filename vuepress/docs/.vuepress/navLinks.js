module.exports = {
    links: function (section, path) {
        return [
            {
                text: section,
                items: [
                    { text: 'NEXT', link: '/next' + path },
                    { text: '6.3', link: '/v6.3' + path },
                    { text: '6.2', link: '/v6.2' + path },
                    { text: '6.1', link: '/v6.1' + path },
                    //  Open new window to avoid SSR issues when moving from Vue to straight html
                    { text: '5.3', link: '/old-version/old-version.html', target:'_blank'},
                ]
            }
        ]
    }
}