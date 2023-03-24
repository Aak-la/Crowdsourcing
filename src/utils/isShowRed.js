export function isShowRed(arr, radix) {
    if (Array.isArray(arr) && radix) {
        return arr.map(v => {
            return v > radix
                ? {
                      value: v,
                      itemStyle: {
                          color: '#a90000'
                      }
                  }
                : v
        })
    }
}
