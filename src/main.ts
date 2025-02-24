const canvas = document.querySelector("canvas")!;
const ctx = canvas.getContext("2d")!;

const mouse = {
  x: 0,
  y: 0,
  type: 0,
  pressed: false,
  color: 1,
};

class Level {
  width: number;
  height: number;
  blockSize: number;
  grid = false;
  level: number[][];

  constructor(width: number, height: number, blockSize: number) {
    this.width = width;
    this.height = height;
    this.blockSize = blockSize;
    this.level = this.makeLevel();
  }

  clear() {
    for (let r = 0; r < this.height; r++) {
      for (let c = 0; c < this.width; c++) {
        this.level[r][c] = 0;
      }
    }
  }

  makeLevel(): number[][] {
    const level = [];
    for (let i = 0; i < this.height; i++) {
      const row = [];
      for (let j = 0; j < this.width; j++) {
        row.push(0);
      }
      level.push(row);
    }
    return level;
  }

  drawGrid() {
    if (this.grid) {
      ctx.strokeStyle = "black";
      for (let i = 0; i < this.width + 1; i++) {
        ctx.beginPath();
        ctx.moveTo(i * this.blockSize, 0);
        ctx.lineTo(i * this.blockSize, this.height * this.blockSize);
        ctx.stroke();
      }

      for (let i = 0; i < this.height + 1; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * this.blockSize);
        ctx.lineTo(this.width * this.blockSize, i * this.blockSize);
        ctx.stroke();
      }
    }
  }

  draw() {
    for (let r = 0; r < this.height; r++) {
      for (let c = 0; c < this.width; c++) {
        let color = "white";
        switch (this.level[r][c]) {
          case 1:
            color = "black";
            break;
          case 2:
            color = "green";
            break;
          case 3:
            color = "orange";
            break;
          case 4:
            color = "red";
            break;
          case 5:
            color = "blue";
            break;
          case 6:
            color = "grey";
            break;
          case 7:
            color = "purple";
            break;
          case 8:
            color = "yellow";
            break;
          case 9:
            color = "brown";
            break;
        }
        ctx.fillStyle = color;

        ctx.fillRect(
          c * this.blockSize,
          r * this.blockSize,
          this.blockSize,
          this.blockSize,
        );
      }
    }
  }

  updateBlock() {
    let xBlock = Math.floor(mouse.x / this.blockSize);
    let yBlock = Math.floor(mouse.y / this.blockSize);

    if (
      !mouse.pressed ||
      xBlock < 0 ||
      xBlock >= this.width ||
      yBlock < 0 ||
      yBlock >= this.height
    ) {
      return;
    }

    if (mouse.type === 0) {
      this.level[yBlock][xBlock] = mouse.color;
    } else {
      this.level[yBlock][xBlock] = 0;
    }
  }
}

const level = new Level(16, 16, 10);

canvas.width = 16 * 10;
canvas.height = 16 * 10;

const widthBlockEle = document.getElementById("width") as HTMLInputElement;
widthBlockEle.value = "" + level.width;
widthBlockEle.addEventListener("change", () => {
  level.width = +widthBlockEle.value;
  canvas.width = level.width * level.blockSize;
  canvas.height = level.height * level.blockSize;
  level.level = level.makeLevel();
});

const heightBlockEle = document.getElementById("height") as HTMLInputElement;
heightBlockEle.value = "" + level.height;
heightBlockEle.addEventListener("change", () => {
  level.height = +heightBlockEle.value;

  canvas.width = level.width * level.blockSize;
  canvas.height = level.height * level.blockSize;
  level.level = level.makeLevel();
});

const blockSizeEle = document.getElementById("size") as HTMLInputElement;
blockSizeEle.value = "" + level.blockSize;
blockSizeEle.addEventListener("change", () => {
  level.blockSize = +blockSizeEle.value;
  canvas.width = level.width * level.blockSize;
  canvas.height = level.height * level.blockSize;
});

document.getElementById("grid")!.onclick = function () {
  level.grid = !level.grid;
};

document.getElementById("clear")!.onclick = function () {
  level.clear();
};

document.getElementById("print")!.onclick = function () {
  console.log(level.level);
};

document.getElementById("download")!.onclick = function () {
  saveLevel("output.txt", level.level);
};

const fileInput = document.getElementById("file");
fileInput!.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      let content = event.target.result;
      content = content.substring(0, content.length - 1);

      const splitRows = content.split("\n");
      for (let i = 0; i < splitRows.length; i++) {
        const curr = splitRows[i];
        splitRows[i] = curr.substring(1, curr.length - 2).split(",");
        for (let j = 0; j < splitRows[i].length; j++) {
          splitRows[i][j] = +splitRows[i][j];
        }
      }

      console.log(splitRows);
      level.height = splitRows.length;
      level.width = splitRows[0].length;
      widthBlockEle.value = "" + level.width;
      heightBlockEle.value = "" + level.height;

      canvas.width = level.width * level.blockSize;
      canvas.height = level.height * level.blockSize;

      level.level = splitRows;
    };

    reader.readAsText(file);
  }
});

window.addEventListener("mousemove", function (event) {
  const rect = canvas.getBoundingClientRect();

  mouse.x =
    ((event.clientX - rect.left) / (rect.right - rect.left)) * canvas.width;
  mouse.y =
    ((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height;
});

window.addEventListener("mousedown", function (event) {
  mouse.type = event.button;
  mouse.pressed = true;
});

window.addEventListener("mouseup", function (event) {
  mouse.pressed = false;
});

const c0 = document.getElementById("c0")!;
const c1 = document.getElementById("c1")!;
const c2 = document.getElementById("c2")!;
const c3 = document.getElementById("c3")!;
const c4 = document.getElementById("c4")!;
const c5 = document.getElementById("c5")!;
const c6 = document.getElementById("c6")!;
const c7 = document.getElementById("c7")!;
const c8 = document.getElementById("c8")!;
const c9 = document.getElementById("c9")!;

const colorButtons = [];
colorButtons.push(c0);
colorButtons.push(c1);
colorButtons.push(c2);
colorButtons.push(c3);
colorButtons.push(c4);
colorButtons.push(c5);
colorButtons.push(c6);
colorButtons.push(c7);
colorButtons.push(c8);
colorButtons.push(c9);

for (let i = 0; i < colorButtons.length; i++) {
  colorButtons[i].addEventListener("click", function () {
    mouse.color = +this.value;
  });
}

function saveLevel(filePath: string, level: number[][]) {
  const element = document.createElement("a");

  let text = "";

  for (let i = 0; i < level.length; i++) {
    text += "[";
    text += level[i].toString();
    text += "],\n";
  }

  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text),
  );
  element.setAttribute("download", filePath);
  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function main() {
  requestAnimationFrame(main);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  level.updateBlock();
  level.draw();
  level.drawGrid();
}

main();
