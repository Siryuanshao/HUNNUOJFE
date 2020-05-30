export default {
  // 把contestId中的数字problemId转化为[A, B, C, D.......]
  mappingToCharacter: function (value) {
    return String.fromCharCode(64 + value % 26)
  }
}
