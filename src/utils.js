function testLog(n) {
  let x = n.toUpperCase();
  if (x === "ROLL" || x === "UNDO" || x === "NEW") {
    return true;
  } else {
    const x = Number(n);
    return x >= 2 && x <= 13 ? true : false;
  }
}

function keyCode(x) {
  let n;
  switch (x) {
    case "1":
      n = "11";
      break;
    case "0":
      n = "10";
      break;
    case "-":
      n = "11";
      break;
    case "=":
      n = "12";
      break;
    case " ":
      n = "ROLL";
      break;
    case "z":
    case "Z":
      n = "UNDO";
      break;
    case "n":
    case "N":
      n = "NEW";
      break;
    default:
      n = x;
      break;
  }
  if (testLog(n) === true) {
    return n;
  } else {
    return false;
  }
}

export function logKey(event) {
  if (event) {
    if (event.key) {
      return keyCode(event.key);
    } else {
      return null; // Special Key
    }
  }
}

export function nextPlayer(activePlayer, option) {
  let x = null;
  switch (option) {
    case "next":
      x = activePlayer + 1;
      break;
    case "back":
      x = activePlayer - 1;
      break;
    default:
      x = activePlayer;
  }
  return x;
}

export function resetPlayers(oldTotal, newTotal, playerArr) {
  const diff = oldTotal - newTotal;
  if (newTotal < oldTotal) {
    playerArr.splice(newTotal, diff);
  }
  if (newTotal > oldTotal) {
    let x = playerArr.length;
    while (x < newTotal) {
      x++;
      playerArr.push("Player " + x);
    }
  }
  if (newTotal === oldTotal) {
    let x = 0;
    while (x < newTotal) {
      playerArr[x] = "Player " + (x + 1);
      x++;
    }
  }
  return playerArr;
}
