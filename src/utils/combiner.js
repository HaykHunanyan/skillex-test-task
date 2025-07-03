function generateCombinations(items, length) {
  const result = [];

  function dfs(path, startIndex, usedPrefixes) {
    if (path.length === length) {
      result.push([...path]);
      return;
    }

    for (let i = startIndex; i < items.length; i++) {
      const prefix = items[i][0];
      if (usedPrefixes.has(prefix)) continue;

      path.push(items[i]);
      usedPrefixes.add(prefix);
      dfs(path, i + 1, usedPrefixes);
      path.pop();
      usedPrefixes.delete(prefix);
    }
  }

  dfs([], 0, new Set());
  return result;
}


module.exports = {
  generateCombinations,
};
