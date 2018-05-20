export default function(url, data) {
    if (url.indexOf('{{') < 0) return url

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key]
            const reg = new RegExp('{{\\s*' + key + '\\s*}}', 'g')
            url = url.replace(reg, element)
        }
    }
    return url
}
