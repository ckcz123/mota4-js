function maps() {

}

maps.prototype.init = function () {

    var map_txt = [
        [ // 0F
            [4, 4, 4, 4, 4, 1, 87, 1, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 1, 0, 1, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 1, 0, 1, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 1, 0, 1, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 1, 0, 1, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 1, 1, 0, 1, 1, 4, 4, 4, 4],
            [4, 4, 4, 4, 1, 32, 0, 51, 1, 4, 4, 4, 4],
            [4, 4, 4, 4, 1, 1, 0, 1, 1, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 1, 0, 1, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 1, 0, 1, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 1, 0, 1, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 1, 0, 1, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 1, 0, 1, 4, 4, 4, 4, 4],
        ],
        [ // 1F
            [1, 16, 1, 16, 15, 1, 88, 1, 0, 11, 12, 13, 1],
            [1, 0, 1, 15, 0, 102, 0, 1, 105, 0, 19, 101, 1],
            [1, 101, 1, 1, 1, 1, 0, 1, 81, 1, 1, 82, 1],
            [1, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 81, 1, 1, 1, 1, 1],
            [1, 101, 1, 19, 11, 0, 1, 18, 1, 0, 18, 13, 1],
            [1, 0, 1, 15, 0, 102, 1, 11, 103, 0, 15, 12, 1],
            [1, 0, 1, 1, 1, 81, 1, 102, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 105, 0, 0, 1],
            [1, 1, 1, 81, 1, 1, 81, 1, 1, 81, 1, 1, 1],
            [1, 11, 101, 109, 1, 0, 103, 0, 1, 114, 11, 19, 1],
            [1, 87, 18, 101, 82, 12, 13, 15, 1, 0, 12, 33, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        [ // 2F
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 15, 0, 15, 1, 16, 1, 87, 0, 1, 19, 13, 1],
            [1, 0, 22, 0, 1, 109, 1, 1, 0, 1, 0, 15, 1],
            [1, 0, 0, 113, 1, 0, 0, 0, 0, 81, 109, 0, 1],
            [1, 82, 1, 81, 1, 105, 1, 1, 1, 1, 1, 1, 1],
            [1, 11, 18, 15, 1, 0, 81, 102, 1, 0, 13, 19, 1],
            [1, 1, 103, 1, 1, 0, 1, 103, 113, 0, 11, 12, 1],
            [1, 1, 81, 1, 1, 102, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 101, 0, 15, 0, 0, 105, 0, 81, 114, 0, 1],
            [1, 0, 1, 1, 81, 1, 1, 81, 1, 1, 0, 15, 1],
            [1, 0, 1, 0, 113, 0, 1, 109, 13, 1, 16, 18, 1],
            [1, 88, 1, 15, 19, 12, 1, 15, 18, 1, 11, 12, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
        [ // 3F
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 15, 0, 1, 13, 0, 1, 88, 1, 85, 71, 86, 1],
            [1, 16, 113, 81, 18, 109, 81, 0, 1, 19, 0, 19, 1],
            [1, 15, 0, 1, 15, 0, 1, 103, 1, 1, 84, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 113, 0, 113, 1],
            [1, 19, 15, 15, 0, 103, 105, 0, 82, 0, 105, 52, 1],
            [1, 1, 1, 81, 1, 81, 1, 1, 1, 1, 1, 1, 1],
            [1, 18, 0, 109, 1, 109, 1, 13, 1, 19, 23, 19, 1],
            [1, 15, 11, 0, 1, 0, 1, 12, 1, 1, 84, 1, 1],
            [1, 1, 1, 81, 1, 0, 1, 11, 1, 114, 0, 114, 1],
            [1, 13, 19, 114, 1, 113, 1, 81, 1, 1, 82, 1, 1],
            [1, 12, 11, 0, 1, 0, 0, 0, 109, 0, 18, 87, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
        [ // 4F
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 12, 0, 18, 1, 0, 13, 16, 1],
            [1, 0, 17, 0, 1, 0, 105, 0, 81, 109, 0, 18, 1],
            [1, 0, 0, 0, 1, 1, 81, 1, 1, 1, 1, 1, 1],
            [1, 1, 121, 1, 1, 15, 0, 1, 0, 15, 11, 19, 1],
            [1, 0, 0, 0, 113, 0, 15, 1, 105, 0, 0, 0, 1],
            [1, 114, 1, 1, 1, 1, 1, 1, 81, 1, 1, 81, 1],
            [1, 0, 0, 113, 0, 0, 0, 0, 114, 1, 0, 109, 1],
            [1, 1, 81, 1, 1, 1, 1, 1, 0, 1, 18, 0, 1],
            [1, 0, 0, 114, 0, 11, 18, 1, 109, 1, 13, 15, 1],
            [1, 81, 1, 1, 1, 1, 1, 1, 82, 1, 1, 1, 1],
            [1, 114, 0, 12, 19, 1, 87, 0, 18, 0, 0, 88, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
        [ // 5F
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 11, 11, 11, 0, 1, 87, 1, 0, 12, 12, 12, 1],
            [1, 18, 18, 18, 0, 81, 0, 81, 0, 19, 19, 19, 1],
            [1, 1, 1, 1, 1, 1, 84, 1, 1, 1, 1, 1, 1],
            [1, 11, 18, 109, 1, 114, 115, 114, 1, 109, 19, 12, 1],
            [1, 1, 1, 81, 1, 18, 114, 19, 1, 81, 1, 1, 1],
            [1, 0, 105, 0, 1, 1, 82, 1, 1, 0, 105, 0, 1],
            [1, 0, 1, 15, 1, 113, 121, 113, 1, 15, 1, 0, 1],
            [1, 114, 1, 1, 1, 11, 113, 12, 1, 1, 1, 114, 1],
            [1, 0, 0, 113, 1, 1, 83, 1, 1, 113, 0, 0, 1],
            [1, 1, 1, 81, 1, 15, 0, 15, 1, 81, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 88, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        [ // 6F
            [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
            [6, 0, 25, 0, 6, 0, 88, 6, 13, 15, 6, 19, 6],
            [6, 120, 0, 117, 6, 15, 6, 6, 0, 18, 82, 18, 6],
            [6, 110, 6, 82, 6, 15, 0, 81, 121, 0, 6, 19, 6],
            [6, 0, 0, 106, 0, 16, 6, 6, 6, 6, 6, 6, 6],
            [6, 6, 6, 81, 6, 0, 18, 0, 6, 0, 19, 13, 6],
            [6, 18, 0, 110, 6, 6, 6, 106, 82, 0, 11, 12, 6],
            [6, 15, 11, 0, 6, 121, 0, 13, 6, 0, 106, 0, 6],
            [6, 6, 6, 6, 6, 0, 6, 53, 6, 6, 81, 6, 6],
            [6, 13, 18, 0, 115, 0, 6, 6, 6, 0, 0, 0, 6],
            [6, 12, 19, 0, 6, 106, 0, 19, 81, 121, 15, 15, 6],
            [6, 87, 0, 0, 81, 0, 11, 13, 6, 0, 15, 15, 6],
            [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        ],
        [ // 7F
            [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
            [6, 24, 20, 6, 0, 115, 0, 0, 117, 0, 13, 19, 6],
            [6, 6, 117, 82, 0, 6, 6, 6, 6, 6, 6, 11, 6],
            [6, 12, 13, 6, 121, 6, 0, 11, 87, 6, 115, 0, 6],
            [6, 11, 6, 6, 0, 6, 120, 6, 6, 6, 81, 6, 6],
            [6, 120, 81, 0, 0, 12, 0, 82, 0, 0, 0, 0, 6],
            [6, 0, 6, 6, 6, 6, 6, 6, 19, 6, 6, 82, 6],
            [6, 0, 110, 81, 0, 115, 0, 0, 18, 6, 13, 12, 6],
            [6, 18, 0, 6, 0, 6, 0, 6, 6, 6, 117, 6, 6],
            [6, 18, 0, 82, 0, 6, 15, 6, 119, 18, 20, 11, 6],
            [6, 6, 6, 6, 106, 6, 0, 6, 81, 6, 6, 6, 6],
            [6, 88, 0, 16, 0, 6, 0, 106, 0, 81, 110, 16, 6],
            [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        ],
        [ // 8F
            [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
            [6, 11, 20, 6, 0, 18, 0, 15, 6, 0, 115, 0, 6],
            [6, 12, 0, 6, 120, 6, 13, 6, 6, 0, 6, 15, 6],
            [6, 0, 122, 81, 0, 6, 0, 6, 88, 0, 6, 0, 6],
            [6, 6, 6, 6, 0, 6, 120, 6, 6, 6, 6, 106, 6],
            [6, 0, 122, 81, 0, 6, 11, 0, 119, 81, 0, 0, 6],
            [6, 12, 0, 6, 6, 6, 6, 106, 6, 6, 82, 6, 6],
            [6, 11, 20, 6, 87, 119, 0, 0, 6, 118, 0, 118, 6],
            [6, 6, 6, 6, 6, 6, 117, 6, 6, 6, 84, 6, 6],
            [6, 11, 0, 6, 15, 15, 0, 0, 6, 18, 19, 20, 6],
            [6, 16, 110, 81, 0, 6, 6, 81, 6, 11, 12, 13, 6],
            [6, 12, 0, 6, 18, 6, 18, 19, 6, 11, 12, 13, 6],
            [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        ],
        [ // 9F
            [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
            [6, 18, 6, 119, 6, 19, 18, 13, 12, 11, 6, 20, 6],
            [6, 19, 84, 0, 6, 6, 6, 6, 6, 82, 6, 81, 6],
            [6, 20, 6, 119, 81, 0, 0, 11, 15, 0, 110, 0, 6],
            [6, 6, 6, 6, 6, 82, 6, 6, 6, 6, 81, 6, 6],
            [6, 18, 18, 15, 106, 0, 0, 119, 0, 6, 0, 15, 6],
            [6, 6, 6, 6, 0, 6, 6, 6, 0, 6, 6, 0, 6],
            [6, 15, 117, 81, 88, 81, 0, 6, 120, 0, 18, 0, 6],
            [6, 15, 0, 6, 0, 6, 106, 6, 6, 6, 6, 19, 6],
            [6, 81, 6, 6, 122, 6, 0, 110, 0, 11, 12, 0, 6],
            [6, 118, 0, 6, 0, 6, 6, 6, 81, 6, 82, 6, 6],
            [6, 15, 21, 6, 12, 20, 87, 6, 122, 13, 120, 17, 6],
            [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        ],
        [ // 10F
            [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
            [6, 11, 11, 11, 6, 6, 87, 6, 6, 12, 12, 12, 6],
            [6, 18, 18, 18, 15, 0, 0, 0, 15, 19, 19, 19, 6],
            [6, 6, 6, 6, 6, 6, 84, 6, 6, 6, 6, 6, 6],
            [6, 4, 4, 6, 0, 0, 0, 0, 0, 6, 4, 4, 6],
            [6, 4, 4, 6, 0, 0, 0, 0, 0, 6, 4, 4, 6],
            [6, 4, 4, 6, 0, 0, 108, 0, 0, 6, 4, 4, 6],
            [6, 4, 4, 6, 0, 0, 0, 0, 0, 6, 4, 4, 6],
            [6, 4, 4, 6, 0, 0, 0, 0, 0, 6, 4, 4, 6],
            [6, 4, 4, 6, 6, 6, 83, 6, 6, 6, 4, 4, 6],
            [6, 4, 4, 4, 4, 6, 0, 6, 4, 4, 4, 4, 6],
            [6, 4, 4, 4, 4, 6, 88, 6, 4, 4, 4, 4, 6],
            [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        ],
        [ // 11F
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
            [3, 0, 12, 11, 0, 3, 88, 0, 122, 0, 16, 0, 3],
            [3, 124, 18, 19, 118, 3, 0, 3, 3, 3, 3, 81, 3],
            [3, 81, 3, 3, 82, 3, 15, 3, 11, 15, 0, 125, 3],
            [3, 19, 18, 0, 110, 0, 0, 3, 20, 12, 16, 0, 3],
            [3, 3, 3, 81, 3, 3, 54, 3, 3, 3, 3, 3, 3],
            [3, 18, 3, 0, 0, 3, 3, 3, 0, 0, 116, 0, 3],
            [3, 122, 81, 110, 110, 82, 118, 15, 13, 0, 3, 20, 3],
            [3, 13, 3, 0, 0, 3, 0, 3, 3, 3, 3, 13, 3],
            [3, 82, 3, 3, 81, 3, 11, 12, 19, 0, 3, 12, 3],
            [3, 0, 18, 0, 116, 3, 3, 3, 3, 81, 3, 11, 3],
            [3, 87, 3, 15, 0, 81, 0, 16, 0, 107, 0, 0, 3],
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        ],
        [ // 12F
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
            [3, 87, 3, 0, 11, 15, 15, 3, 3, 85, 72, 86, 3],
            [3, 0, 3, 116, 0, 18, 0, 82, 82, 11, 20, 12, 3],
            [3, 123, 3, 81, 3, 3, 3, 3, 3, 3, 84, 3, 3],
            [3, 0, 0, 0, 3, 0, 0, 118, 82, 116, 19, 116, 3],
            [3, 3, 81, 3, 3, 19, 3, 11, 3, 3, 84, 3, 3],
            [3, 18, 0, 19, 3, 0, 3, 12, 81, 107, 20, 107, 3],
            [3, 0, 13, 0, 81, 124, 3, 13, 3, 3, 84, 3, 3],
            [3, 11, 0, 118, 3, 3, 3, 3, 3, 122, 18, 122, 3],
            [3, 116, 3, 82, 3, 0, 0, 0, 81, 0, 16, 0, 3],
            [3, 0, 12, 0, 81, 124, 15, 13, 3, 81, 3, 3, 3],
            [3, 88, 0, 15, 3, 0, 15, 19, 3, 116, 11, 12, 3],
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        ],
        [ // 13F
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
            [3, 88, 0, 3, 3, 127, 81, 125, 3, 12, 18, 11, 3],
            [3, 3, 21, 55, 3, 0, 3, 0, 84, 21, 17, 19, 3],
            [3, 15, 15, 3, 3, 125, 82, 127, 3, 11, 20, 12, 3],
            [3, 107, 3, 3, 0, 82, 0, 3, 3, 3, 3, 3, 3],
            [3, 0, 0, 0, 104, 3, 3, 3, 0, 123, 0, 0, 3],
            [3, 81, 3, 3, 0, 11, 13, 19, 0, 3, 3, 12, 3],
            [3, 116, 20, 3, 3, 3, 3, 3, 3, 3, 3, 20, 3],
            [3, 0, 11, 3, 12, 11, 3, 15, 15, 15, 0, 0, 3],
            [3, 81, 3, 3, 16, 15, 3, 3, 3, 81, 3, 3, 3],
            [3, 124, 20, 3, 19, 0, 3, 18, 3, 104, 0, 15, 3],
            [3, 87, 12, 3, 0, 123, 82, 18, 81, 0, 13, 16, 3],
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        ],
        [ // 14F
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
            [3, 11, 0, 107, 0, 81, 87, 12, 3, 0, 13, 19, 3],
            [3, 0, 15, 3, 127, 3, 18, 0, 81, 104, 0, 15, 3],
            [3, 82, 3, 3, 124, 3, 3, 3, 3, 3, 3, 81, 3],
            [3, 15, 3, 3, 81, 3, 11, 18, 3, 127, 15, 124, 3],
            [3, 116, 81, 104, 18, 3, 12, 19, 84, 0, 12, 0, 3],
            [3, 116, 3, 15, 13, 3, 11, 18, 3, 127, 15, 123, 3],
            [3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 81, 3],
            [3, 19, 13, 0, 82, 0, 11, 12, 13, 19, 3, 0, 3],
            [3, 3, 3, 81, 3, 3, 81, 3, 3, 0, 125, 0, 3],
            [3, 0, 0, 116, 3, 0, 104, 0, 3, 3, 3, 81, 3],
            [3, 88, 15, 0, 3, 19, 15, 18, 3, 18, 13, 123, 3],
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        ],
        [ // 15F
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
            [3, 0, 0, 0, 0, 0, 88, 0, 0, 0, 0, 0, 3],
            [3, 3, 3, 3, 3, 3, 83, 3, 3, 3, 3, 3, 3],
            [3, 13, 15, 0, 104, 3, 127, 3, 104, 0, 15, 13, 3],
            [3, 3, 3, 3, 81, 3, 0, 3, 81, 3, 3, 3, 3],
            [3, 0, 0, 123, 0, 0, 0, 0, 0, 123, 0, 0, 3],
            [3, 15, 3, 3, 3, 3, 0, 3, 3, 3, 3, 15, 3],
            [3, 0, 3, 0, 11, 3, 126, 3, 12, 0, 3, 0, 3],
            [3, 0, 81, 104, 0, 3, 0, 3, 0, 104, 81, 0, 3],
            [3, 3, 3, 3, 3, 3, 84, 3, 3, 3, 3, 3, 3],
            [3, 18, 18, 18, 0, 81, 0, 81, 0, 19, 19, 19, 3],
            [3, 11, 11, 11, 0, 3, 87, 3, 0, 12, 12, 12, 3],
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        ],
        [ // 16F
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 87, 12, 4, 0, 19, 0, 4, 0, 20, 0, 4, 4],
            [4, 11, 0, 4, 15, 4, 12, 4, 13, 4, 16, 4, 4],
            [4, 0, 136, 81, 0, 4, 0, 111, 0, 4, 0, 133, 4],
            [4, 4, 4, 4, 82, 4, 4, 81, 4, 4, 4, 81, 4],
            [4, 0, 0, 11, 0, 13, 0, 15, 0, 19, 0, 0, 4],
            [4, 133, 0, 4, 4, 82, 4, 4, 4, 4, 4, 0, 4],
            [4, 81, 4, 4, 0, 124, 0, 0, 19, 0, 4, 130, 4],
            [4, 0, 136, 81, 16, 4, 4, 81, 4, 136, 4, 0, 4],
            [4, 15, 0, 4, 15, 56, 4, 133, 0, 11, 12, 13, 4],
            [4, 4, 111, 4, 15, 4, 4, 4, 4, 81, 4, 4, 4],
            [4, 11, 20, 4, 0, 0, 88, 4, 19, 133, 15, 13, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        ],
        [ // 17F
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 88, 0, 0, 4, 0, 0, 11, 4, 0, 21, 87, 4],
            [4, 0, 0, 133, 4, 136, 4, 0, 15, 111, 4, 0, 4],
            [4, 4, 4, 81, 4, 81, 4, 4, 4, 82, 4, 130, 4],
            [4, 0, 13, 0, 15, 0, 133, 57, 4, 0, 4, 0, 4],
            [4, 130, 4, 4, 4, 4, 82, 4, 4, 0, 4, 0, 4],
            [4, 0, 4, 0, 81, 0, 0, 0, 81, 136, 4, 19, 4],
            [4, 11, 12, 13, 4, 140, 0, 140, 4, 11, 12, 13, 4],
            [4, 4, 4, 4, 4, 4, 84, 4, 4, 4, 4, 4, 4],
            [4, 13, 0, 0, 4, 15, 0, 15, 4, 0, 0, 11, 4],
            [4, 0, 30, 0, 83, 0, 17, 0, 83, 0, 31, 0, 4],
            [4, 0, 0, 13, 4, 15, 0, 15, 4, 11, 0, 0, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        ],
        [ // 18F
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 0, 15, 17, 4, 15, 16, 4, 140, 0, 0, 88, 4],
            [4, 128, 0, 20, 4, 12, 0, 135, 81, 4, 4, 4, 4],
            [4, 81, 4, 4, 4, 136, 4, 4, 0, 19, 0, 20, 4],
            [4, 19, 12, 0, 112, 0, 0, 4, 4, 4, 112, 4, 4],
            [4, 4, 4, 4, 4, 4, 13, 140, 81, 11, 0, 12, 4],
            [4, 0, 134, 0, 135, 81, 0, 4, 4, 0, 21, 0, 4],
            [4, 11, 4, 81, 4, 4, 82, 4, 4, 15, 0, 15, 4],
            [4, 18, 4, 130, 0, 12, 0, 15, 4, 4, 4, 4, 4],
            [4, 82, 4, 4, 0, 4, 4, 81, 0, 135, 0, 0, 4],
            [4, 0, 0, 4, 135, 4, 18, 112, 4, 4, 4, 140, 4],
            [4, 87, 112, 81, 0, 4, 12, 13, 11, 0, 130, 0, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        ],
        [ // 19F
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 0, 112, 81, 15, 81, 18, 19, 20, 81, 0, 112, 4],
            [4, 11, 0, 4, 0, 4, 11, 12, 13, 4, 4, 81, 4],
            [4, 21, 12, 4, 128, 4, 11, 12, 13, 4, 13, 19, 4],
            [4, 4, 4, 4, 81, 4, 4, 4, 4, 4, 134, 4, 4],
            [4, 11, 13, 0, 0, 4, 15, 15, 0, 4, 0, 4, 4],
            [4, 18, 0, 112, 0, 4, 15, 0, 139, 81, 0, 4, 4],
            [4, 4, 4, 81, 4, 4, 4, 4, 81, 4, 4, 4, 4],
            [4, 0, 15, 15, 0, 111, 0, 0, 135, 0, 0, 18, 4],
            [4, 134, 4, 4, 81, 4, 83, 4, 81, 4, 4, 4, 4],
            [4, 0, 4, 0, 139, 4, 128, 4, 134, 0, 15, 19, 4],
            [4, 88, 4, 19, 20, 4, 89, 4, 0, 11, 12, 13, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        ],
        [ // 20F
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 1, 1, 1, 1, 1, 4, 4, 4, 4],
            [4, 4, 4, 4, 1, 0, 137, 0, 1, 4, 4, 4, 4],
            [4, 4, 4, 4, 1, 0, 0, 0, 1, 4, 4, 4, 4],
            [4, 4, 4, 4, 1, 0, 0, 0, 1, 4, 4, 4, 4],
            [4, 4, 4, 4, 1, 1, 1, 1, 1, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        ]
    ]

    this.maps = {};
    for (var f = 0; f < map_txt.length; f++) {
        var floorId = 'MT' + f;
        var map = map_txt[f];
        var content = {};
        content['floorId'] = floorId;
        content['name'] = f;
        content['title'] = '主塔 ' + f + ' 层';
        content['canFlyTo'] = true;
        if (f==20) content['canFlyTo'] = false;
        var blocks = [];
        for (var i = 0; i < 13; i++) {
            for (var j = 0; j < 13; j++) {
                var id = map[i][j];
                var block = this.getBlock(f, j, i, id);
                if (block!=null) blocks.push(block);
            }
        }
        content['blocks'] = blocks;
        this.maps[floorId] = content;
    }
}

maps.prototype.getBlock = function (f, x, y, id) {
    if (id==0) return null;

    var tmp = {'x': x, 'y': y, 'id': id};
    // 0-9 地形
    if (id == 1) tmp.event = {'cls': 'terrains', 'id': 'yellowWall'}; // 黄墙
    if (id == 2) tmp.event = {'cls': 'terrains', 'id': 'blueWall'}; // 蓝墙
    if (id == 3) tmp.event = {'cls': 'animates', 'id': 'lava', 'animate': 4, 'noPass': true}; // 岩浆
    if (id == 4) tmp.event = {'cls': 'animates', 'id': 'star', 'animate': 4, 'noPass': true}; // 星空
    // if (id==5) tmp.fg = {'cls': 'animates', 'id': 'star', 'animate': 4, 'noPass': true}; // 栅栏
    if (id == 6) tmp.event = {'cls': 'terrains', 'id': 'whiteWall'}; // 白墙

    // 11-50 物品
    if (id == 11) tmp.event = {'cls': 'items', 'id': 'redJewel', 'trigger': 'getItem'}; // 红宝石
    if (id == 12) tmp.event = {'cls': 'items', 'id': 'blueJewel', 'trigger': 'getItem'}; // 蓝宝石
    if (id == 13) tmp.event = {'cls': 'items', 'id': 'greenJewel', 'trigger': 'getItem'}; // 绿宝石
    if (id == 14) tmp.event = {'cls': 'items', 'id': 'yellowJewel', 'trigger': 'getItem'}; // 黄宝石
    if (id == 15) tmp.event = {'cls': 'items', 'id': 'yellowKey', 'trigger': 'getItem'}; // 黄钥匙
    if (id == 16) tmp.event = {'cls': 'items', 'id': 'blueKey', 'trigger': 'getItem'}; // 蓝钥匙
    if (id == 17) tmp.event = {'cls': 'items', 'id': 'redKey', 'trigger': 'getItem'}; // 红钥匙
    if (id == 18) tmp.event = {'cls': 'items', 'id': 'redPotion', 'trigger': 'getItem'}; // 红血瓶
    if (id == 19) tmp.event = {'cls': 'items', 'id': 'bluePotion', 'trigger': 'getItem'}; // 蓝血瓶
    if (id == 20) tmp.event = {'cls': 'items', 'id': 'yellowPotion', 'trigger': 'getItem'}; // 黄血瓶
    if (id == 21) tmp.event = {'cls': 'items', 'id': 'greenPotion', 'trigger': 'getItem'}; // 绿血瓶
    if (id == 22) tmp.event = {'cls': 'items', 'id': 'sword1', 'trigger': 'getItem'}; // 铁剑
    if (id == 23) tmp.event = {'cls': 'items', 'id': 'shield1', 'trigger': 'getItem'}; // 铁盾
    if (id == 24) tmp.event = {'cls': 'items', 'id': 'sword2', 'trigger': 'getItem'}; // 银剑
    if (id == 25) tmp.event = {'cls': 'items', 'id': 'shield2', 'trigger': 'getItem'}; // 银盾
    if (id == 26) tmp.event = {'cls': 'items', 'id': 'sword3', 'trigger': 'getItem'}; // 骑士剑
    if (id == 27) tmp.event = {'cls': 'items', 'id': 'shield3', 'trigger': 'getItem'}; // 骑士盾
    if (id == 28) tmp.event = {'cls': 'items', 'id': 'sword4', 'trigger': 'getItem'}; // 圣剑
    if (id == 29) tmp.event = {'cls': 'items', 'id': 'shield4', 'trigger': 'getItem'}; // 圣盾
    if (id == 30) tmp.event = {'cls': 'items', 'id': 'sword5', 'trigger': 'getItem'}; // 神圣剑
    if (id == 31) tmp.event = {'cls': 'items', 'id': 'shield5', 'trigger': 'getItem'}; // 神圣盾
    if (id == 32) tmp.event = {'cls': 'items', 'id': 'book', 'trigger': 'getItem'}; // 怪物手册
    if (id == 33) tmp.event = {'cls': 'items', 'id': 'fly', 'trigger': 'getItem'}; // 楼层传送器

    // 51-80 NPC
    if (id == 51) tmp.event = {'cls': 'npcs', 'id': 'wood', 'trigger': 'visitNpc', 'npcid': 'npc1'};
    if (id == 52) tmp.event = {'cls': 'npcs', 'id': 'wood', 'trigger': 'visitNpc', 'npcid': 'npc2'};
    if (id == 53) tmp.event = {'cls': 'npcs', 'id': 'wood', 'trigger': 'visitNpc', 'npcid': 'npc3'};
    if (id == 54) tmp.event = {'cls': 'npcs', 'id': 'wood', 'trigger': 'visitNpc', 'npcid': 'npc4'};
    if (id == 55) tmp.event = {'cls': 'npcs', 'id': 'wood', 'trigger': 'visitNpc', 'npcid': 'npc5'};
    if (id == 56) tmp.event = {'cls': 'npcs', 'id': 'wood', 'trigger': 'visitNpc', 'npcid': 'npc6'};
    if (id == 57) tmp.event = {'cls': 'npcs', 'id': 'wood', 'trigger': 'visitNpc', 'npcid': 'npc7'};

    // 商店
    if (id == 71) tmp.event = {'cls': 'npcs', 'id': 'blueShop', 'trigger': 'openShop', 'shopid': 'shop1'};
    if (id == 72) tmp.event = {'cls': 'npcs', 'id': 'blueShop', 'trigger': 'openShop', 'shopid': 'shop2'};

    // 81-100 门
    if (id == 81) tmp.event = {'cls': 'terrains', 'id': 'yellowDoor', 'trigger': 'openDoor'};
    if (id == 82) tmp.event = {'cls': 'terrains', 'id': 'blueDoor', 'trigger': 'openDoor'};
    if (id == 83) tmp.event = {'cls': 'terrains', 'id': 'redDoor', 'trigger': 'openDoor'};
    if (id == 84) tmp.event = {'cls': 'terrains', 'id': 'specialDoor', 'trigger': 'openDoor'};
    if (id == 85) tmp.event = {'cls': 'terrains', 'id': 'shop1-left'}; // 商店左
    if (id == 86) tmp.event = {'cls': 'terrains', 'id': 'shop1-right'}; // 商店左
    if (id == 87) tmp.event = {
        'cls': 'terrains', 'id': 'upFloor', 'trigger': 'changeFloor', 'noPass': false,
        'data': {'floorId': 'MT' + (f + 1), 'stair': 'downFloor'}, 'noTriggerCross': true
    };
    if (id == 88) tmp.event = {
        'cls': 'terrains', 'id': 'downFloor', 'trigger': 'changeFloor', 'noPass': false,
        'data': {'floorId': 'MT' + (f - 1), 'stair': 'upFloor'}, 'noTriggerCross': true
    };
    // 传送门
    if (id==89) tmp.event = {
        'cls': 'animates', 'id': 'portal', 'trigger': 'changeFloor', 'noPass': false, 'animate': 4,
        'data': {'floorId': 'MT20', 'heroLoc': {'direction': 'up', 'x': 6, 'y': 7}}
    }

    // 101-200 怪物
    if (id == 101) tmp.event = {'cls': 'enemys', 'id': 'greenSlime', 'trigger': 'battle'};
    if (id == 102) tmp.event = {'cls': 'enemys', 'id': 'redSlime', 'trigger': 'battle'};
    if (id == 103) tmp.event = {'cls': 'enemys', 'id': 'blackSlime', 'trigger': 'battle'};
    if (id == 104) tmp.event = {'cls': 'enemys', 'id': 'slimelord', 'trigger': 'battle'};
    if (id == 105) tmp.event = {'cls': 'enemys', 'id': 'bat', 'trigger': 'battle'};
    if (id == 106) tmp.event = {'cls': 'enemys', 'id': 'bigBat', 'trigger': 'battle'};
    if (id == 107) tmp.event = {'cls': 'enemys', 'id': 'redBat', 'trigger': 'battle'};
    if (id == 108) tmp.event = {'cls': 'enemys', 'id': 'vampire', 'trigger': 'battle'};
    if (id == 109) tmp.event = {'cls': 'enemys', 'id': 'bluePriest', 'trigger': 'battle'};
    if (id == 110) tmp.event = {'cls': 'enemys', 'id': 'redPriest', 'trigger': 'battle'};
    if (id == 111) tmp.event = {'cls': 'enemys', 'id': 'brownWizard', 'trigger': 'battle'};
    if (id == 112) tmp.event = {'cls': 'enemys', 'id': 'redWizard', 'trigger': 'battle'};
    if (id == 113) tmp.event = {'cls': 'enemys', 'id': 'skeleton', 'trigger': 'battle'};
    if (id == 114) tmp.event = {'cls': 'enemys', 'id': 'skeletonSoilder', 'trigger': 'battle'};
    if (id == 115) tmp.event = {'cls': 'enemys', 'id': 'skeletonCaptain', 'trigger': 'battle'};
    if (id == 116) tmp.event = {'cls': 'enemys', 'id': 'ghostSkeleton', 'trigger': 'battle'};
    if (id == 117) tmp.event = {'cls': 'enemys', 'id': 'zombie', 'trigger': 'battle'};
    if (id == 118) tmp.event = {'cls': 'enemys', 'id': 'zombieKnight', 'trigger': 'battle'};
    if (id == 119) tmp.event = {'cls': 'enemys', 'id': 'rock', 'trigger': 'battle'};
    if (id == 120) tmp.event = {'cls': 'enemys', 'id': 'slimeMan', 'trigger': 'battle'};
    if (id == 121) tmp.event = {'cls': 'enemys', 'id': 'yellowGuard', 'trigger': 'battle'};
    if (id == 122) tmp.event = {'cls': 'enemys', 'id': 'blueGuard', 'trigger': 'battle'};
    if (id == 123) tmp.event = {'cls': 'enemys', 'id': 'redGuard', 'trigger': 'battle'};
    if (id == 124) tmp.event = {'cls': 'enemys', 'id': 'swordsman', 'trigger': 'battle'};
    if (id == 125) tmp.event = {'cls': 'enemys', 'id': 'soldier', 'trigger': 'battle'};
    if (id == 126) tmp.event = {'cls': 'enemys', 'id': 'yellowKnight', 'trigger': 'battle'};
    if (id == 127) tmp.event = {'cls': 'enemys', 'id': 'redKnight', 'trigger': 'battle'};
    if (id == 128) tmp.event = {'cls': 'enemys', 'id': 'darkKnight', 'trigger': 'battle'};
    if (id == 129) tmp.event = {'cls': 'enemys', 'id': 'redKing', 'trigger': 'battle'};
    if (id == 130) tmp.event = {'cls': 'enemys', 'id': 'whiteKing', 'trigger': 'battle'};
    if (id == 131) tmp.event = {'cls': 'enemys', 'id': 'blackMagician', 'trigger': 'battle'};
    if (id == 132) tmp.event = {'cls': 'enemys', 'id': 'silverSlime', 'trigger': 'battle'};
    if (id == 133) tmp.event = {'cls': 'enemys', 'id': 'poisonSkeleton', 'trigger': 'battle'};
    if (id == 134) tmp.event = {'cls': 'enemys', 'id': 'poisonBat', 'trigger': 'battle'};
    if (id == 135) tmp.event = {'cls': 'enemys', 'id': 'steelRock', 'trigger': 'battle'};
    if (id == 136) tmp.event = {'cls': 'enemys', 'id': 'poisonZombie', 'trigger': 'battle'};
    if (id == 137) tmp.event = {'cls': 'enemys', 'id': 'blackKing', 'trigger': 'battle'};
    if (id == 138) tmp.event = {'cls': 'enemys', 'id': 'yellowKing', 'trigger': 'battle'};
    if (id == 139) tmp.event = {'cls': 'enemys', 'id': 'greenKing', 'trigger': 'battle'};
    if (id == 140) tmp.event = {'cls': 'enemys', 'id': 'blueKnight', 'trigger': 'battle'};

    // 200+ 特殊

    return tmp;
}

maps.prototype.getMaps = function (mapName) {
    if (mapName == undefined) {
        return this.updateNoPass(this.maps);
    }
    return this.maps[mapName];
}

maps.prototype.updateNoPass = function (maps) {
    if (maps.floorId == undefined) {
        for (var floorId in maps) {
            this.updateNoPass(maps[floorId]);
        }
        return maps;
    }
    var blocks = maps['blocks'];
    blocks.forEach(function (t) {
        if (t.event == undefined) return;
        if (t.event.noPass == undefined) {
            if (t.event.cls=='enemys' || t.event.cls=='terrains' || t.event.cls=='npcs') {
                t.event.noPass = true;
            }
        }
        if (t.event.animate == undefined) {
            if (t.event.cls=='enemys' || t.event.cls=='npcs') {
                t.event.animate = 2;
            }
        }
    });
    return maps;
}

maps.prototype.save = function(maps, floorId) {
    if (floorId==undefined || floorId==null) {
        var map = {};
        for (var id in maps) {
            map[id] = this.save(maps, id);
        }
        return map;
    }
    var thisFloor = maps[floorId];
    var floor = {};
    floor.floorId = thisFloor.floorId;
    floor.name = thisFloor.name;
    floor.title = thisFloor.title;
    floor.canFlyTo = thisFloor.canFlyTo;

    var blocks = [];
    for (var x=0;x<13;x++) {
        blocks[x]=[];
        for (var y=0;y<13;y++) {
            blocks[x].push(0);
        }
    }
    thisFloor.blocks.forEach(function (block) {
        blocks[block.x][block.y] = block.id;
    });
    floor.blocks = blocks;
    return floor;
}

maps.prototype.load = function (data) {
    if (data.floorId == undefined) {
        var map = {};
        for (var id in data) {
            map[id] = this.load(data[id]);
        }
        return map;
    }
    var content = {};
    content['floorId'] = data.floorId;
    content['name'] = data.name;
    content['title'] = data.title;
    content['canFlyTo'] = data.canFlyTo;
    var blocks = [];
    for (var i = 0; i < 13; i++) {
        for (var j = 0; j < 13; j++) {
            var id = data.blocks[i][j];
            var block = this.getBlock(data.name, i, j, id);
            if (block!=null) blocks.push(block);
        }
    }
    content['blocks'] = blocks;
    return this.updateNoPass(content);
}

main.instance.maps = new maps();